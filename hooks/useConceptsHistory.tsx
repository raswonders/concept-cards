import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { parseHistory, serializeHistory, ConceptsHistory } from "@/lib/history";

export function useConceptsHistory(): [
  ConceptsHistory,
  Dispatch<SetStateAction<ConceptsHistory>>
] {
  const [storedHistory, setStoredHistory] = useLocalStorage(
    "conceptsHistory",
    "[]"
  );

  const [conceptsHistory, setConceptsHistory] = useState<ConceptsHistory>(
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
