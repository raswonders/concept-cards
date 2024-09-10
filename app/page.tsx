"use client";

import { Card } from "@/app/components/card";
import { experimental_useObject as useObject } from "ai/react";
import { CardSchema, CardSchemaType } from "./cardSchema";
import { useEffect, useState } from "react";
import { History, parseHistory, serializeHistory } from "./helpers/history";

export default function Home() {
  const [conceptsHistory, setConceptsHistory] = useState<History>(new Map());

  const { object, submit, isLoading } = useObject({
    api: "/card/api",
    schema: CardSchema,
    initialValue: {
      names: [],
    },
  });

  useEffect(() => {
    let savedHistory = localStorage.getItem("conceptsHistory");
    setConceptsHistory(savedHistory ? parseHistory(savedHistory) : new Map());
  }, []);

  useEffect(() => {
    if ((object as CardSchemaType).names.length > 0) {
      setConceptsHistory((prev) => {
        const next = new Map(prev);
        for (let concept of (object as CardSchemaType).names) {
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
        let json = serializeHistory(next);
        if (json) localStorage.setItem("conceptsHistory", json);
        return next;
      });
    }
  }, [object]);

  return (
    <div className="min-h-screen grid place-content-center">
      <Card data={object as CardSchemaType} />
      <button className="" onClick={() => submit("")}>
        New Card
      </button>
    </div>
  );
}
