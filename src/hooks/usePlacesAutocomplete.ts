import { useCallback, useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export function isQuotaError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const record = err as Record<string, unknown>;
  const msg = String(record.message ?? record.name ?? err).toLowerCase();
  const status = String(record.status ?? record.code ?? "").toUpperCase();
  return (
    status === "RESOURCE_EXHAUSTED" ||
    status === "OVER_QUERY_LIMIT" ||
    status === "429" ||
    msg.includes("resource_exhausted") ||
    msg.includes("over_query_limit") ||
    msg.includes("quota") ||
    msg.includes("429")
  );
}

export function dispatchQuotaExceeded(): void {
  window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
}

export interface UsePlacesAutocompleteReturn {
  suggestions: google.maps.places.AutocompleteSuggestion[];
  isLoading: boolean;
  selectSuggestion: (
    suggestion: google.maps.places.AutocompleteSuggestion
  ) => Promise<google.maps.places.Place | null>;
  resetSession: () => void;
}

/**
 * Modern Places API (New) autocomplete hook using AutocompleteSuggestion + AutocompleteSessionToken.
 * Doc: https://developers.google.com/maps/documentation/javascript/place-autocomplete-data?utm_campaign=gmp_mcp_codeassist_v1_aistudio
 */
export function usePlacesAutocomplete(
  inputString: string,
  enabled: boolean = true
): UsePlacesAutocompleteReturn {
  const placesLib = useMapsLibrary("places");
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const resetSession = useCallback(() => {
    sessionTokenRef.current = null;
    setSuggestions([]);
  }, []);

  useEffect(() => {
    const trimmed = inputString.trim();
    if (!enabled || !placesLib || trimmed.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;
      if (!sessionTokenRef.current) {
        sessionTokenRef.current = new AutocompleteSessionToken();
      }

      setIsLoading(true);
      try {
        const res = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: trimmed,
          sessionToken: sessionTokenRef.current,
          includedRegionCodes: ["ca"],
          language: "en-CA",
          region: "ca",
        });
        if (!cancelled) {
          setSuggestions(res?.suggestions ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setSuggestions([]);
          if (isQuotaError(err)) {
            dispatchQuotaExceeded();
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [enabled, inputString, placesLib]);

  const selectSuggestion = useCallback(
    async (
      suggestion: google.maps.places.AutocompleteSuggestion
    ): Promise<google.maps.places.Place | null> => {
      if (!suggestion.placePrediction) return null;
      const place = suggestion.placePrediction.toPlace();
      try {
        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location", "viewport", "addressComponents"],
        });
        resetSession();
        return place;
      } catch (err) {
        if (isQuotaError(err)) {
          dispatchQuotaExceeded();
        }
        return null;
      }
    },
    [resetSession]
  );

  return {
    suggestions,
    isLoading,
    selectSuggestion,
    resetSession,
  };
}
