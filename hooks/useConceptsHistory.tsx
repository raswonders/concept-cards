import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { parseHistory, serializeHistory, ConceptsHistory } from "@/lib/history";
import { CardSchemaType } from "@/lib/cardSchema";

export function useConceptsHistory(
  data: CardSchemaType
): [ConceptsHistory, Dispatch<SetStateAction<ConceptsHistory>>] {
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

  useEffect(() => {
    if ((data as CardSchemaType).names.length > 0) {
      setConceptsHistory((prev) => {
        const next = new Map(prev);
        for (const concept of (data as CardSchemaType).names) {
          if (!next.has(concept.category)) {
            next.set(concept.category, new Set([concept.name]));
          } else {
            next.set(
              concept.category,
              new Set([
                ...(next.get(concept.category) as Set<string>),
                concept.name,
              ])
            );
          }
        }

        return next;
      });
    }
  }, [data, setConceptsHistory]);

  return [conceptsHistory, setConceptsHistory];
}
