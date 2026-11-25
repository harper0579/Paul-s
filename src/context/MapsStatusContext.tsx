import { createContext, useContext } from "react";

export interface MapsStatusContextValue {
  hasApiKey: boolean;
  quotaExceeded: boolean;
}

export const MapsStatusContext = createContext<MapsStatusContextValue>({
  hasApiKey: false,
  quotaExceeded: false,
});

export function useMapsStatus(): MapsStatusContextValue {
  return useContext(MapsStatusContext);
}
