import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { parseHistory, serializeHistory, History } from "@/lib/history";

export function useConceptsHistory(): [
  History,
  Dispatch<SetStateAction<History>>
] {
  const [storedHistory, setStoredHistory] = useLocalStorage(
    "conceptsHistory",
    "[]"
  );

  const [conceptsHistory, setConceptsHistory] = useState<History>(
    parseHistory(storedHistory)
  );

  useEffect(() => {
    const conceptsHistoryStr = serializeHistory(conceptsHistory);
    if (conceptsHistoryStr) {
      setStoredHistory(conceptsHistoryStr);
    }
  }, [conceptsHistory, setStoredHistory]);

  return [conceptsHistory, setConceptsHistory];
}
