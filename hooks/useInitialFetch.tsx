import { useEffect, useRef } from "react";

export function useInitialFetch(fetchFn: () => void) {
  const isInitialFetch = useRef(true);

  useEffect(() => {
    if (isInitialFetch.current) {
      fetchFn();
      isInitialFetch.current = false;
    }
  }, [fetchFn]);
}
