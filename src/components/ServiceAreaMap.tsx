// Doc: https://developers.google.com/maps/documentation/javascript/place-search?utm_campaign=gmp_mcp_codeassist_v1_aistudio
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdvancedMarker,
  APILoadingStatus,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useApiLoadingStatus,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { ArrowRight, Compass, ExternalLink, Loader2, MapPin, Navigation, Search } from "lucide-react";
import { CONTACT, SERVICE_AREAS } from "../data/siteContent";
import { useMapsStatus } from "../context/MapsStatusContext";
import {
  dispatchQuotaExceeded,
  isQuotaError,
  usePlacesAutocomplete,
} from "../hooks/usePlacesAutocomplete";

export interface ResolvedLocation {
  key: string;
  label: string;
  note: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
  viewport?: google.maps.LatLngBoundsLiteral;
  isCustomAddress?: boolean;
}

const SESSION_CACHE_KEY = "pauls_roofing_town_places_v1";

function readSessionCache(): Record<string, ResolvedLocation> {
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeSessionCache(cache: Record<string, ResolvedLocation>): void {
  try {
    sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage quota errors
  }
}

function extractBoundsLiteral(
  viewport: google.maps.LatLngBounds | null | undefined
): google.maps.LatLngBoundsLiteral | undefined {
  if (!viewport) return undefined;
  const ne = viewport.getNorthEast();
  const sw = viewport.getSouthWest();
  return {
    north: ne.lat(),
    east: ne.lng(),
    south: sw.lat(),
    west: sw.lng(),
  };
}

interface TownMarkerProps {
  item: ResolvedLocation;
  isSelected: boolean;
  onSelect: (key: string, marker: google.maps.marker.AdvancedMarkerElement) => void;
}

function TownAdvancedMarker({ item, isSelected, onSelect }: TownMarkerProps) {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const setRef = useCallback((m: google.maps.marker.AdvancedMarkerElement | null) => {
    markerRef.current = m;
  }, []);

  return (
    <AdvancedMarker
      ref={setRef}
      position={item.location}
      title={item.label}
      zIndex={isSelected ? 1000 : item.isCustomAddress ? 900 : 10}
      onClick={() => {
        if (markerRef.current) {
          onSelect(item.key, markerRef.current);
        }
      }}
    >
      <Pin
        background={item.isCustomAddress ? "#059669" : isSelected ? "#0E8FE8" : "#081A33"}
        borderColor={item.isCustomAddress ? "#065F46" : "#FFFFFF"}
        glyphColor="#FFFFFF"
        scale={isSelected || item.isCustomAddress ? 1.2 : 1.0}
      />
    </AdvancedMarker>
  );
}

interface MapViewportControllerProps {
  selectedLocation: ResolvedLocation | null;
  fitAllTrigger: number;
  allLocations: ResolvedLocation[];
}

function MapViewportController({
  selectedLocation,
  fitAllTrigger,
  allLocations,
}: MapViewportControllerProps) {
  const map = useMap();
  const coreLib = useMapsLibrary("core");

  useEffect(() => {
    if (!map || !selectedLocation) return;
    if (selectedLocation.viewport) {
      map.fitBounds(selectedLocation.viewport, 48);
    } else {
      map.panTo(selectedLocation.location);
      map.setZoom(selectedLocation.isCustomAddress ? 14 : 11);
    }
  }, [map, selectedLocation]);

  useEffect(() => {
    if (!map || !coreLib || fitAllTrigger === 0 || allLocations.length === 0) return;
    const bounds = new coreLib.LatLngBounds();
    allLocations.forEach((loc) => bounds.extend(loc.location));
    map.fitBounds(bounds, 52);
  }, [map, coreLib, fitAllTrigger, allLocations]);

  return null;
}

interface ServiceAreaMapProps {
  selectedTown?: string | null;
  onTownChange?: (town: string) => void;
  compact?: boolean;
}

function InteractiveServiceAreaMap({
  selectedTown,
  onTownChange,
  compact = false,
}: ServiceAreaMapProps) {
  const navigate = useNavigate();
  const loadingStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary("places");

  const [locations, setLocations] = useState<Record<string, ResolvedLocation>>(() =>
    readSessionCache()
  );
  const locationsRef = useRef<Record<string, ResolvedLocation>>(locations);
  locationsRef.current = locations;

  const [activeKey, setActiveKey] = useState<string>("Quispamsis");
  const [infoMarker, setInfoMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const [infoOpen, setInfoOpen] = useState(false);
  const [resolvingTown, setResolvingTown] = useState<string | null>(null);
  const [resolvingAll, setResolvingAll] = useState(false);
  const [fitAllTrigger, setFitAllTrigger] = useState(0);
  const [lookupError, setLookupError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const {
    suggestions,
    isLoading: isSearchingPlaces,
    selectSuggestion,
  } = usePlacesAutocomplete(searchInput, Boolean(placesLib));

  const resolveTown = useCallback(
    async (town: string): Promise<ResolvedLocation | null> => {
      const existing = locationsRef.current[town] ?? readSessionCache()[town];
      if (existing) {
        return existing;
      }
      if (!placesLib) return null;

      const areaMeta = SERVICE_AREAS.find((a) => a.town === town);
      setResolvingTown(town);
      setLookupError("");

      try {
        const { Place } = placesLib;
        const response = await Place.searchByText({
          textQuery: `${town}, New Brunswick, Canada`,
          fields: ["displayName", "formattedAddress", "location", "viewport"],
          language: "en-CA",
          region: "ca",
          maxResultCount: 1,
        });

        const place = response?.places?.[0];
        if (!place?.location) {
          setLookupError(`Could not pinpoint ${town} right now.`);
          return null;
        }

        const resolved: ResolvedLocation = {
          key: town,
          label: town,
          note:
            areaMeta?.note ||
            "Free roof inspections, itemized estimates, and 24/7 emergency leak support.",
          formattedAddress: place.formattedAddress || `${town}, NB, Canada`,
          location: {
            lat: place.location.lat(),
            lng: place.location.lng(),
          },
          viewport: extractBoundsLiteral(place.viewport),
        };

        setLocations((prev) => {
          const next = { ...prev, [town]: resolved };
          writeSessionCache(next);
          return next;
        });
        return resolved;
      } catch (err) {
        if (isQuotaError(err)) {
          dispatchQuotaExceeded();
        } else {
          setLookupError(`Unable to look up ${town} on Google Maps right now.`);
        }
        return null;
      } finally {
        setResolvingTown((prev) => (prev === town ? null : prev));
      }
    },
    [placesLib]
  );

  // Resolve primary hub ("Quispamsis") on initial load so the map renders a live Places coordinate
  useEffect(() => {
    if (!placesLib) return;
    const initialTown = selectedTown || "Quispamsis";
    setActiveKey(initialTown);
    void resolveTown(initialTown);
  }, [placesLib, selectedTown, resolveTown]);

  async function handleSelectTownPill(town: string) {
    setActiveKey(town);
    setInfoOpen(false);
    setInfoMarker(null);
    onTownChange?.(town);
    await resolveTown(town);
  }

  async function handlePinAllTowns() {
    if (!placesLib || resolvingAll) return;
    setResolvingAll(true);
    setLookupError("");
    try {
      for (const area of SERVICE_AREAS) {
        await resolveTown(area.town);
      }
      setFitAllTrigger((prev) => prev + 1);
    } finally {
      setResolvingAll(false);
    }
  }

  async function handlePickAddress(suggestion: google.maps.places.AutocompleteSuggestion) {
    setSearchOpen(false);
    const place = await selectSuggestion(suggestion);
    if (!place?.location) return;

    const components = place.addressComponents ?? [];
    const locality =
      components.find((c) => c.types.includes("locality"))?.longText ||
      components.find((c) => c.types.includes("administrative_area_level_3"))?.longText ||
      place.displayName ||
      "Southern New Brunswick";

    const customLoc: ResolvedLocation = {
      key: "custom-address",
      label: place.displayName || place.formattedAddress || "Selected Property",
      note: `Detected community: ${locality}. Free roof inspection & itemized quote available.`,
      formattedAddress: place.formattedAddress || locality,
      location: {
        lat: place.location.lat(),
        lng: place.location.lng(),
      },
      viewport: extractBoundsLiteral(place.viewport),
      isCustomAddress: true,
    };

    setSearchInput(place.formattedAddress || place.displayName || "");
    setLocations((prev) => ({ ...prev, "custom-address": customLoc }));
    setActiveKey("custom-address");
    setInfoOpen(false);
    setInfoMarker(null);
  }

  const locationList = Object.values(locations);
  const activeLocation = locations[activeKey] ?? locations["Quispamsis"] ?? locationList[0] ?? null;

  if (
    loadingStatus === APILoadingStatus.AUTH_FAILURE ||
    loadingStatus === APILoadingStatus.FAILED
  ) {
    return (
      <FallbackAreaCard
        reason="The interactive map could not be loaded right now."
        compact={compact}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-[#C3D6EA] bg-white shadow-sm overflow-hidden">
      {/* Toolbar: town selector + address search */}
      <div className="p-4 sm:p-5 border-b border-[#C3D6EA] bg-[#F7FAFD] space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {SERVICE_AREAS.map((area) => {
              const active = activeKey === area.town;
              const pinned = Boolean(locations[area.town]);
              return (
                <button
                  key={area.town}
                  type="button"
                  onClick={() => void handleSelectTownPill(area.town)}
                  className={`px-3 py-1.5 min-h-9 rounded-lg text-xs font-bold border transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                    active
                      ? "bg-[#081A33] text-white border-[#081A33]"
                      : pinned
                      ? "bg-[#EFF5FB] text-[#0B6CB8] border-[#0E8FE8]"
                      : "bg-white text-[#2A3D57] border-[#C3D6EA] hover:border-[#0B6CB8] hover:text-[#081A33]"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{area.town}</span>
                  {resolvingTown === area.town && <Loader2 className="w-3 h-3 animate-spin" />}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => void handlePinAllTowns()}
            disabled={!placesLib || resolvingAll}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-9 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
          >
            {resolvingAll ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Pinning towns...</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span>Pin all 8 towns</span>
              </>
            )}
          </button>
        </div>

        <div className="relative max-w-xl">
          <label htmlFor="serviceMapSearch" className="sr-only">
            Check your New Brunswick street address or town
          </label>
          <Search
            className="w-4 h-4 text-[#47617F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="serviceMapSearch"
            type="text"
            value={searchInput}
            onFocus={() => setSearchOpen(true)}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSearchOpen(true);
            }}
            placeholder="Search your New Brunswick address or neighbourhood..."
            className="w-full pl-10 pr-10 py-2.5 min-h-10 rounded-xl border border-[#C3D6EA] bg-white text-sm text-[#081A33] placeholder-[#47617F] focus:outline-none focus:border-[#0B6CB8]"
          />
          {isSearchingPlaces && (
            <Loader2 className="w-4 h-4 text-[#0B6CB8] animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
          )}

          {searchOpen && suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="Address suggestions"
              className="absolute z-30 left-0 right-0 mt-1.5 rounded-xl border border-[#C3D6EA] bg-white shadow-lg overflow-hidden max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => {
                const text = suggestion.placePrediction?.text?.text;
                if (!text) return null;
                return (
                  <li key={`${text}-${index}`}>
                    <button
                      type="button"
                      onClick={() => void handlePickAddress(suggestion)}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#081A33] hover:bg-[#EFF5FB] border-b last:border-b-0 border-[#E2ECF5] flex items-center gap-2.5 cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-[#0B6CB8] shrink-0" />
                      <span className="truncate">{text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lookupError && (
          <p className="text-xs font-semibold text-[#B91C1C]" role="alert">
            {lookupError}
          </p>
        )}
      </div>

      {/* Explicit height map container (CF2) */}
      <div className={compact ? "h-[340px] sm:h-[390px] w-full relative" : "h-[380px] sm:h-[440px] w-full relative"}>
        {!activeLocation ? (
          <div className="w-full h-full bg-[#EFF5FB] flex flex-col items-center justify-center gap-2 text-[#47617F]">
            <Loader2 className="w-6 h-6 animate-spin text-[#0B6CB8]" />
            <p className="text-sm font-semibold">Loading Southern New Brunswick service map...</p>
          </div>
        ) : (
          <GoogleMap
            mapId="DEMO_MAP_ID"
            defaultCenter={activeLocation.location}
            defaultZoom={11}
            gestureHandling="cooperative"
            mapTypeControl={false}
            streetViewControl={false}
            internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
            style={{ width: "100%", height: "100%" }}
            onClick={() => setInfoOpen(false)}
          >
            <MapViewportController
              selectedLocation={activeLocation}
              fitAllTrigger={fitAllTrigger}
              allLocations={locationList}
            />

            {locationList.map((item) => (
              <TownAdvancedMarker
                key={item.key}
                item={item}
                isSelected={activeLocation.key === item.key}
                onSelect={(key, marker) => {
                  setActiveKey(key);
                  setInfoMarker(marker);
                  setInfoOpen(true);
                }}
              />
            ))}

            {infoOpen && infoMarker && activeLocation && (
              <InfoWindow
                anchor={infoMarker}
                maxWidth={280}
                onCloseClick={() => setInfoOpen(false)}
              >
                <div className="p-1 text-[#081A33] space-y-2">
                  <p className="font-bold text-sm">{activeLocation.label}</p>
                  <p className="text-xs text-[#47617F]">{activeLocation.formattedAddress}</p>
                  <p className="text-xs text-[#2A3D57] leading-relaxed">{activeLocation.note}</p>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/quote", {
                        state: {
                          town: activeLocation.isCustomAddress
                            ? activeLocation.formattedAddress
                            : activeLocation.label,
                          timestamp: Date.now(),
                        },
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B6CB8] hover:underline cursor-pointer"
                  >
                    <span>Request free quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>

      {/* Bottom Selected Area Bar */}
      {activeLocation && (
        <div className="px-4 sm:px-5 py-3.5 bg-white border-t border-[#C3D6EA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B6CB8]">
              <Navigation className="w-3.5 h-3.5 shrink-0" />
              <span>{activeLocation.formattedAddress}</span>
            </div>
            <p className="mt-0.5 text-sm text-[#2A3D57]">{activeLocation.note}</p>
          </div>
          <button
            type="button"
            onClick={() =>
              navigate("/quote", {
                state: {
                  town: activeLocation.isCustomAddress
                    ? activeLocation.formattedAddress
                    : activeLocation.label,
                  timestamp: Date.now(),
                },
              })
            }
            className="btn-quote-glow inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-10 font-display text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Quote in {activeLocation.isCustomAddress ? "this area" : activeLocation.label}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function FallbackAreaCard({ reason, compact }: { reason: string; compact?: boolean }) {
  const navigate = useNavigate();

  return (
    <div
      className={`rounded-2xl border border-[#C3D6EA] bg-white p-6 flex flex-col justify-between gap-4 ${
        compact ? "min-h-[220px]" : "min-h-[260px]"
      }`}
    >
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-[#0B6CB8]">
          Southern New Brunswick Coverage
        </p>
        <h3 className="font-display text-lg font-bold text-[#081A33]">
          Based in Quispamsis &mdash; Serving 8 Communities
        </h3>
        <p className="text-sm text-[#47617F]">{reason}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {SERVICE_AREAS.map((area) => (
          <button
            key={area.town}
            type="button"
            onClick={() =>
              navigate("/quote", { state: { town: area.town, timestamp: Date.now() } })
            }
            className="px-3 py-1.5 rounded-lg border border-[#C3D6EA] bg-[#EFF5FB] hover:border-[#0B6CB8] text-xs font-bold text-[#081A33] cursor-pointer"
          >
            {area.town}
          </button>
        ))}
      </div>
      <div>
        <a
          href={CONTACT.googleReviewsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B6CB8] hover:underline"
        >
          <span>Open Paul&apos;s Roofing on Google Maps</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export function ServiceAreaMap(props: ServiceAreaMapProps) {
  const { hasApiKey, quotaExceeded } = useMapsStatus();

  if (!hasApiKey || quotaExceeded) {
    return (
      <FallbackAreaCard
        reason={
          quotaExceeded
            ? "Google Maps daily quota has been reached. You can still select any community below to start a free quote."
            : "Select any Southern New Brunswick community below to start a free inspection or quote."
        }
        compact={props.compact}
      />
    );
  }

  return <InteractiveServiceAreaMap {...props} />;
}
