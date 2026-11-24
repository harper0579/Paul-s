import { useCallback, useEffect, useState } from "react";
import { type User } from "firebase/auth";
import {
  Archive,
  Check,
  Inbox,
  LogOut,
  MailOpen,
  PenSquare,
  RefreshCw,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";
import {
  clearAccessToken,
  getAccessToken,
  googleSignIn,
  initAuth,
  logout,
} from "../lib/gmailAuth";
import {
  createGmailDraft,
  listGmailMessages,
  modifyGmailMessageLabels,
  sendGmailMessage,
  trashGmailMessage,
  type ParsedGmailMessage,
} from "../lib/gmailApi";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { CONTACT } from "../data/siteContent";

type LabelFilter = "INBOX" | "SENT" | "STARRED" | "DRAFT" | "ALL";

type PendingMutation =
  | {
      type: "send";
      to: string;
      subject: string;
      body: string;
      threadId?: string;
    }
  | {
      type: "draft";
      to: string;
      subject: string;
      body: string;
      threadId?: string;
    }
  | {
      type: "trash";
      message: ParsedGmailMessage;
    }
  | {
      type: "archive";
      message: ParsedGmailMessage;
    }
  | {
      type: "markRead";
      message: ParsedGmailMessage;
    };

const LABEL_TABS: Array<{ id: LabelFilter; label: string }> = [
  { id: "INBOX", label: "Inbox" },
  { id: "SENT", label: "Sent" },
  { id: "STARRED", label: "Starred" },
  { id: "DRAFT", label: "Drafts" },
  { id: "ALL", label: "All Mail" },
];

export function GmailWorkspaceSection() {
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [labelFilter, setLabelFilter] = useState<LabelFilter>("INBOX");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<ParsedGmailMessage[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<ParsedGmailMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [statusNotice, setStatusNotice] = useState("");

  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [composeThreadId, setComposeThreadId] = useState<string | undefined>(undefined);

  const [pendingMutation, setPendingMutation] = useState<PendingMutation | null>(null);
  const [mutating, setMutating] = useState(false);

  const loadMessages = useCallback(
    async (tokenOverride?: string, labelOverride?: LabelFilter, queryOverride?: string) => {
      const token = tokenOverride ?? getAccessToken();
      if (!token) {
        setNeedsAuth(true);
        return;
      }

      setLoading(true);
      setErrorMsg("");
      try {
        const list = await listGmailMessages(token, {
          labelId: labelOverride ?? labelFilter,
          q: queryOverride ?? searchQuery,
          maxResults: 12,
        });
        setMessages(list);
        setSelectedMsg((prev) =>
          prev ? list.find((m) => m.id === prev.id) ?? list[0] ?? null : list[0] ?? null
        );
      } catch (err) {
        const status = (err as Error & { status?: number }).status;
        if (status === 401) {
          clearAccessToken();
          setNeedsAuth(true);
        }
        setErrorMsg(
          err instanceof Error ? err.message : "Could not load Gmail messages right now."
        );
      } finally {
        setLoading(false);
      }
    },
    [labelFilter, searchQuery]
  );

  useEffect(() => {
    const unsub = initAuth(
      (signedInUser, token) => {
        setUser(signedInUser);
        setNeedsAuth(false);
        loadMessages(token);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
        setMessages([]);
        setSelectedMsg(null);
      }
    );
    return () => unsub();
  }, [loadMessages]);

  async function handleLogin() {
    setIsLoggingIn(true);
    setErrorMsg("");
    try {
      const result = await googleSignIn();
      setUser(result.user);
      setNeedsAuth(false);
      await loadMessages(result.accessToken);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Google sign-in was cancelled or failed."
      );
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleSignOut() {
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setMessages([]);
    setSelectedMsg(null);
    setStatusNotice("");
    setErrorMsg("");
  }

  function openNewCompose() {
    setComposeTo(CONTACT.email);
    setComposeSubject("Roofing inquiry — Paul's Roofing");
    setComposeBody("");
    setComposeThreadId(undefined);
    setComposeOpen(true);
  }

  function openReplyCompose(msg: ParsedGmailMessage) {
    const emailMatch = msg.from.match(/<([^>]+)>/);
    const replyAddr = emailMatch ? emailMatch[1] : msg.from;
    setComposeTo(replyAddr);
    setComposeSubject(
      msg.subject.toLowerCase().startsWith("re:") ? msg.subject : `Re: ${msg.subject}`
    );
    setComposeBody(`\n\n--- Original message from ${msg.from} ---\n${msg.snippet}`);
    setComposeThreadId(msg.threadId);
    setComposeOpen(true);
  }

  async function executePendingMutation() {
    if (!pendingMutation) return;
    const token = getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      setPendingMutation(null);
      return;
    }

    setMutating(true);
    setErrorMsg("");
    setStatusNotice("");
    try {
      if (pendingMutation.type === "send") {
        await sendGmailMessage(token, {
          to: pendingMutation.to,
          subject: pendingMutation.subject,
          body: pendingMutation.body,
          threadId: pendingMutation.threadId,
        });
        setStatusNotice(`Email sent to ${pendingMutation.to}.`);
        setComposeOpen(false);
        await loadMessages(token);
      } else if (pendingMutation.type === "draft") {
        await createGmailDraft(token, {
          to: pendingMutation.to,
          subject: pendingMutation.subject,
          body: pendingMutation.body,
          threadId: pendingMutation.threadId,
        });
        setStatusNotice(`Draft saved in Gmail for ${pendingMutation.to}.`);
        setComposeOpen(false);
        await loadMessages(token);
      } else if (pendingMutation.type === "trash") {
        await trashGmailMessage(token, pendingMutation.message.id);
        setStatusNotice(`Moved "${pendingMutation.message.subject}" to Trash.`);
        setSelectedMsg(null);
        await loadMessages(token);
      } else if (pendingMutation.type === "archive") {
        await modifyGmailMessageLabels(token, pendingMutation.message.id, [], ["INBOX"]);
        setStatusNotice(`Archived "${pendingMutation.message.subject}".`);
        setSelectedMsg(null);
        await loadMessages(token);
      } else if (pendingMutation.type === "markRead") {
        const isUnread = pendingMutation.message.isUnread;
        await modifyGmailMessageLabels(
          token,
          pendingMutation.message.id,
          isUnread ? [] : ["UNREAD"],
          isUnread ? ["UNREAD"] : []
        );
        setStatusNotice(
          isUnread ? "Message marked as read." : "Message marked as unread."
        );
        await loadMessages(token);
      }
    } catch (err) {
      const status = (err as Error & { status?: number }).status;
      if (status === 401) {
        clearAccessToken();
        setNeedsAuth(true);
      }
      setErrorMsg(err instanceof Error ? err.message : "Gmail operation failed.");
    } finally {
      setMutating(false);
      setPendingMutation(null);
    }
  }

  return (
    <section
      id="gmail"
      className="scroll-mt-20 py-14 lg:py-16 bg-[#EFF5FB] border-t border-[#C3D6EA]"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
              Gmail Workspace
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
              Quote &amp; Customer Email Desk
            </h2>
            <p className="mt-2 text-base text-[#47617F] max-w-2xl">
              Connect your Google account to read incoming quote inquiries, send direct replies or
              follow-ups, save drafts, and manage your Gmail inbox from one place.
            </p>
          </div>

          {!needsAuth && user && (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="text-xs sm:text-sm font-semibold text-[#2A3D57]">
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-10 rounded-lg border border-[#C3D6EA] bg-white hover:border-[#0B6CB8] text-xs font-semibold text-[#081A33] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-[#C3D6EA] bg-white overflow-hidden">
          {needsAuth ? (
            <div className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="font-display text-xl font-bold text-[#081A33]">
                  Sign in to connect Gmail
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#47617F] leading-relaxed">
                  With your permission, you can search your Gmail messages, read homeowner quote
                  threads, draft replies, and send emails directly. Sending, archiving, or trashing
                  messages always asks for your confirmation first.
                </p>
                {errorMsg && (
                  <p className="mt-3 text-sm font-semibold text-[#B91C1C]" role="alert">
                    {errorMsg}
                  </p>
                )}
              </div>
              <GoogleSignInButton onClick={handleLogin} disabled={isLoggingIn} />
            </div>
          ) : (
            <div>
              <div className="p-4 sm:p-5 border-b border-[#C3D6EA] bg-[#EFF5FB]/60 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Gmail folders">
                  {LABEL_TABS.map((tab) => {
                    const active = labelFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setLabelFilter(tab.id);
                          loadMessages(undefined, tab.id, searchQuery);
                        }}
                        className={`px-3 py-2 min-h-10 rounded-lg text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                          active
                            ? "bg-[#081A33] text-white border-[#081A33]"
                            : "bg-white text-[#2A3D57] border-[#C3D6EA] hover:border-[#0B6CB8]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      loadMessages(undefined, labelFilter, searchQuery);
                    }}
                    className="relative flex-1 sm:w-64"
                  >
                    <label htmlFor="gmailSearch" className="sr-only">
                      Search Gmail
                    </label>
                    <Search
                      className="w-4 h-4 text-[#47617F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="gmailSearch"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Gmail (e.g. quote, roof)..."
                      className="w-full pl-9 pr-3 py-2 min-h-10 rounded-lg border border-[#C3D6EA] bg-white text-sm text-[#081A33] focus:outline-none focus:border-[#0B6CB8]"
                    />
                  </form>

                  <button
                    type="button"
                    onClick={() => loadMessages()}
                    disabled={loading}
                    aria-label="Refresh Gmail messages"
                    className="inline-flex items-center gap-1.5 px-3 py-2 min-h-10 rounded-lg border border-[#C3D6EA] bg-white hover:bg-[#EFF5FB] text-sm font-semibold text-[#081A33] cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                  </button>

                  <button
                    type="button"
                    onClick={openNewCompose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-10 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold cursor-pointer"
                  >
                    <PenSquare className="w-4 h-4" />
                    Compose
                  </button>
                </div>
              </div>

              {(errorMsg || statusNotice) && (
                <div className="px-5 py-3 border-b border-[#C3D6EA] bg-white">
                  {errorMsg && (
                    <p className="text-sm font-semibold text-[#B91C1C]" role="alert">
                      {errorMsg}
                    </p>
                  )}
                  {statusNotice && (
                    <p
                      className="text-sm font-semibold text-[#15803D] flex items-center gap-1.5"
                      role="status"
                    >
                      <Check className="w-4 h-4 shrink-0" />
                      {statusNotice}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#C3D6EA] divide-y divide-[#EFF5FB] max-h-[480px] overflow-y-auto">
                  {loading && messages.length === 0 ? (
                    <div className="p-6 text-sm text-[#47617F]">Loading Gmail messages...</div>
                  ) : messages.length === 0 ? (
                    <div className="p-6 text-sm text-[#47617F] flex items-center gap-2">
                      <Inbox className="w-4 h-4 shrink-0" />
                      No messages found for this filter.
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const active = selectedMsg?.id === msg.id;
                      return (
                        <button
                          key={msg.id}
                          type="button"
                          onClick={() => setSelectedMsg(msg)}
                          className={`w-full text-left p-4 transition-colors cursor-pointer ${
                            active ? "bg-[#E1EFFC]" : "hover:bg-[#EFF5FB]/60"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-sm truncate ${
                                msg.isUnread
                                  ? "font-bold text-[#081A33]"
                                  : "font-medium text-[#2A3D57]"
                              }`}
                            >
                              {msg.from}
                            </span>
                            {msg.isUnread && (
                              <span className="text-[11px] font-bold text-[#0B6CB8] shrink-0">
                                Unread
                              </span>
                            )}
                          </div>
                          <div className="mt-1 font-display text-sm font-bold text-[#081A33] truncate">
                            {msg.subject}
                          </div>
                          <p className="mt-1 text-xs text-[#47617F] line-clamp-2">{msg.snippet}</p>
                        </button>
                      );
                    })
                  )}
                </div>

                <div className="lg:col-span-7 p-6 flex flex-col justify-between">
                  {selectedMsg ? (
                    <div className="space-y-4">
                      <div className="border-b border-[#EFF5FB] pb-4">
                        <h3 className="font-display text-xl font-bold text-[#081A33]">
                          {selectedMsg.subject}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#47617F]">
                          <strong className="text-[#081A33]">From:</strong> {selectedMsg.from}
                        </p>
                        {selectedMsg.to && (
                          <p className="mt-0.5 text-xs sm:text-sm text-[#47617F]">
                            <strong className="text-[#081A33]">To:</strong> {selectedMsg.to}
                          </p>
                        )}
                        {selectedMsg.date && (
                          <p className="mt-0.5 text-xs text-[#47617F]">{selectedMsg.date}</p>
                        )}
                      </div>

                      <div className="text-sm sm:text-base text-[#2A3D57] whitespace-pre-wrap leading-relaxed max-h-[280px] overflow-y-auto">
                        {selectedMsg.bodyText}
                      </div>

                      <div className="pt-4 border-t border-[#EFF5FB] flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openReplyCompose(selectedMsg)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 min-h-10 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-xs sm:text-sm font-bold cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Reply
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPendingMutation({ type: "markRead", message: selectedMsg })
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-10 rounded-lg border border-[#C3D6EA] hover:border-[#0B6CB8] text-xs sm:text-sm font-semibold text-[#081A33] cursor-pointer"
                        >
                          <MailOpen className="w-3.5 h-3.5" />
                          {selectedMsg.isUnread ? "Mark read" : "Mark unread"}
                        </button>
                        {selectedMsg.labelIds.includes("INBOX") && (
                          <button
                            type="button"
                            onClick={() =>
                              setPendingMutation({ type: "archive", message: selectedMsg })
                            }
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-10 rounded-lg border border-[#C3D6EA] hover:border-[#0B6CB8] text-xs sm:text-sm font-semibold text-[#081A33] cursor-pointer"
                          >
                            <Archive className="w-3.5 h-3.5" />
                            Archive
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setPendingMutation({ type: "trash", message: selectedMsg })
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-10 rounded-lg border border-[#C3D6EA] hover:border-[#B91C1C] text-xs sm:text-sm font-semibold text-[#B91C1C] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Move to Trash
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-[#47617F] my-auto text-center py-12">
                      Select an email from the list to read or reply, or click Compose to write a
                      new message.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {composeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="composeModalTitle"
          onClick={() => setComposeOpen(false)}
          className="fixed inset-0 z-50 bg-[#050D20]/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-xl rounded-2xl border border-[#C3D6EA] overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-[#C3D6EA] bg-[#EFF5FB] flex items-center justify-between">
              <h3 id="composeModalTitle" className="font-display text-lg font-bold text-[#081A33]">
                {composeThreadId ? "Reply via Gmail" : "Compose Gmail message"}
              </h3>
              <button
                type="button"
                onClick={() => setComposeOpen(false)}
                aria-label="Close composer"
                className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#C3D6EA] bg-white text-[#081A33] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label htmlFor="gmailTo" className="block text-xs font-bold text-[#081A33] mb-1">
                  To *
                </label>
                <input
                  id="gmailTo"
                  type="email"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full min-h-11 rounded-lg border border-[#C3D6EA] px-3.5 py-2 text-sm text-[#081A33] focus:outline-none focus:border-[#0B6CB8]"
                />
              </div>
              <div>
                <label
                  htmlFor="gmailSubject"
                  className="block text-xs font-bold text-[#081A33] mb-1"
                >
                  Subject *
                </label>
                <input
                  id="gmailSubject"
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full min-h-11 rounded-lg border border-[#C3D6EA] px-3.5 py-2 text-sm text-[#081A33] focus:outline-none focus:border-[#0B6CB8]"
                />
              </div>
              <div>
                <label htmlFor="gmailBody" className="block text-xs font-bold text-[#081A33] mb-1">
                  Message *
                </label>
                <textarea
                  id="gmailBody"
                  rows={6}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Write your reply or roofing estimate notes..."
                  className="w-full rounded-lg border border-[#C3D6EA] px-3.5 py-2.5 text-sm text-[#081A33] focus:outline-none focus:border-[#0B6CB8]"
                />
              </div>

              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setComposeOpen(false)}
                  className="px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!composeTo.trim() || !composeSubject.trim()}
                  onClick={() =>
                    setPendingMutation({
                      type: "draft",
                      to: composeTo.trim(),
                      subject: composeSubject.trim(),
                      body: composeBody,
                      threadId: composeThreadId,
                    })
                  }
                  className="px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] bg-[#EFF5FB] text-sm font-semibold text-[#081A33] hover:border-[#0B6CB8] disabled:opacity-50 cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  disabled={!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()}
                  onClick={() =>
                    setPendingMutation({
                      type: "send",
                      to: composeTo.trim(),
                      subject: composeSubject.trim(),
                      body: composeBody,
                      threadId: composeThreadId,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-5 py-2 min-h-10 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Review &amp; Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {pendingMutation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmGmailActionTitle"
          className="fixed inset-0 z-[60] bg-[#050D20]/80 flex items-center justify-center p-4"
        >
          <div className="bg-white w-full max-w-md rounded-2xl border border-[#C3D6EA] p-6 space-y-4">
            <h3
              id="confirmGmailActionTitle"
              className="font-display text-lg font-bold text-[#081A33]"
            >
              {pendingMutation.type === "send" && "Confirm sending email via Gmail?"}
              {pendingMutation.type === "draft" && "Save email draft to Gmail?"}
              {pendingMutation.type === "trash" && "Move message to Gmail Trash?"}
              {pendingMutation.type === "archive" && "Archive message in Gmail?"}
              {pendingMutation.type === "markRead" &&
                (pendingMutation.message.isUnread
                  ? "Mark message as read?"
                  : "Mark message as unread?")}
            </h3>

            <div className="text-sm text-[#2A3D57] space-y-1.5">
              {(pendingMutation.type === "send" || pendingMutation.type === "draft") && (
                <>
                  <p>
                    <strong className="text-[#081A33]">To:</strong> {pendingMutation.to}
                  </p>
                  <p>
                    <strong className="text-[#081A33]">Subject:</strong> {pendingMutation.subject}
                  </p>
                </>
              )}
              {(pendingMutation.type === "trash" ||
                pendingMutation.type === "archive" ||
                pendingMutation.type === "markRead") && (
                <>
                  <p>
                    <strong className="text-[#081A33]">Subject:</strong>{" "}
                    {pendingMutation.message.subject}
                  </p>
                  <p>
                    <strong className="text-[#081A33]">From:</strong>{" "}
                    {pendingMutation.message.from}
                  </p>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={mutating}
                onClick={() => setPendingMutation(null)}
                className="px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={mutating}
                onClick={executePendingMutation}
                className={`px-5 py-2 min-h-10 rounded-lg text-white font-display text-sm font-bold cursor-pointer disabled:opacity-60 ${
                  pendingMutation.type === "trash"
                    ? "bg-[#B91C1C] hover:bg-[#991B1B]"
                    : "bg-[#0E8FE8] hover:bg-[#0B6CB8]"
                }`}
              >
                {mutating ? "Working..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
