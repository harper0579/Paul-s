const GMAIL_BASE = "https://gmail.googleapis.com/gmail/v1/users/me";

export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailPayloadPart {
  mimeType?: string;
  body?: { data?: string; size?: number };
  headers?: GmailHeader[];
  parts?: GmailPayloadPart[];
}

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds?: string[];
  snippet?: string;
  internalDate?: string;
  payload?: GmailPayloadPart;
}

export interface GmailLabel {
  id: string;
  name: string;
  type?: string;
}

export interface ParsedGmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  subject: string;
  from: string;
  to: string;
  date: string;
  snippet: string;
  bodyText: string;
  isUnread: boolean;
}

function decodeBase64Url(data: string): string {
  const normalized = data.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  try {
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return "";
  }
}

function encodeBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function extractPlainText(part?: GmailPayloadPart): string {
  if (!part) return "";
  if (part.mimeType === "text/plain" && part.body?.data) {
    return decodeBase64Url(part.body.data);
  }
  if (part.parts && part.parts.length > 0) {
    for (const sub of part.parts) {
      const found = extractPlainText(sub);
      if (found) return found;
    }
  }
  if (part.mimeType === "text/html" && part.body?.data) {
    const html = decodeBase64Url(part.body.data);
    return html
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  if (part.body?.data) {
    return decodeBase64Url(part.body.data);
  }
  return "";
}

function getHeader(headers: GmailHeader[] | undefined, name: string): string {
  if (!headers) return "";
  const match = headers.find((h) => h.name.toLowerCase() === name.toLowerCase());
  return match?.value || "";
}

export function parseGmailMessage(msg: GmailMessage): ParsedGmailMessage {
  const headers = msg.payload?.headers;
  const labelIds = msg.labelIds || [];
  return {
    id: msg.id,
    threadId: msg.threadId,
    labelIds,
    subject: getHeader(headers, "Subject") || "(No subject)",
    from: getHeader(headers, "From") || "Unknown sender",
    to: getHeader(headers, "To") || "",
    date: getHeader(headers, "Date") || "",
    snippet: msg.snippet || "",
    bodyText: extractPlainText(msg.payload) || msg.snippet || "",
    isUnread: labelIds.includes("UNREAD"),
  };
}

async function gmailFetch<T>(
  accessToken: string,
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${GMAIL_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (res.status === 401) {
    const err = new Error("Your Google session expired. Please sign in again.");
    (err as Error & { status?: number }).status = 401;
    throw err;
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const msg = errBody?.error?.message || `Gmail API error (${res.status})`;
    throw new Error(msg);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

export async function listGmailLabels(accessToken: string): Promise<GmailLabel[]> {
  const data = await gmailFetch<{ labels?: GmailLabel[] }>(accessToken, "/labels");
  return data.labels || [];
}

export async function listGmailMessages(
  accessToken: string,
  opts: { q?: string; labelId?: string; maxResults?: number } = {}
): Promise<ParsedGmailMessage[]> {
  const params = new URLSearchParams();
  params.set("maxResults", String(opts.maxResults ?? 12));
  if (opts.q?.trim()) params.set("q", opts.q.trim());
  if (opts.labelId && opts.labelId !== "ALL") params.append("labelIds", opts.labelId);

  const list = await gmailFetch<{ messages?: Array<{ id: string }> }>(
    accessToken,
    `/messages?${params.toString()}`
  );
  const items = list.messages || [];
  if (items.length === 0) return [];

  const details = await Promise.all(
    items.map((item) =>
      gmailFetch<GmailMessage>(accessToken, `/messages/${encodeURIComponent(item.id)}?format=full`)
    )
  );
  return details.map(parseGmailMessage);
}

function buildRawRfc2822(params: { to: string; subject: string; body: string }): string {
  const cleanTo = params.to.replace(/[\r\n]/g, "").trim();
  const cleanSubject = params.subject.replace(/[\r\n]/g, "").trim();
  const raw = [
    `To: ${cleanTo}`,
    `Subject: ${cleanSubject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    params.body,
  ].join("\r\n");
  return encodeBase64Url(raw);
}

export async function sendGmailMessage(
  accessToken: string,
  params: { to: string; subject: string; body: string; threadId?: string }
): Promise<{ id: string }> {
  const raw = buildRawRfc2822(params);
  return gmailFetch<{ id: string }>(accessToken, "/messages/send", {
    method: "POST",
    body: JSON.stringify({
      raw,
      ...(params.threadId ? { threadId: params.threadId } : {}),
    }),
  });
}

export async function createGmailDraft(
  accessToken: string,
  params: { to: string; subject: string; body: string; threadId?: string }
): Promise<{ id: string }> {
  const raw = buildRawRfc2822(params);
  return gmailFetch<{ id: string }>(accessToken, "/drafts", {
    method: "POST",
    body: JSON.stringify({
      message: {
        raw,
        ...(params.threadId ? { threadId: params.threadId } : {}),
      },
    }),
  });
}

export async function modifyGmailMessageLabels(
  accessToken: string,
  messageId: string,
  addLabelIds: string[],
  removeLabelIds: string[]
): Promise<void> {
  await gmailFetch(accessToken, `/messages/${encodeURIComponent(messageId)}/modify`, {
    method: "POST",
    body: JSON.stringify({ addLabelIds, removeLabelIds }),
  });
}

export async function trashGmailMessage(accessToken: string, messageId: string): Promise<void> {
  await gmailFetch(accessToken, `/messages/${encodeURIComponent(messageId)}/trash`, {
    method: "POST",
  });
}
