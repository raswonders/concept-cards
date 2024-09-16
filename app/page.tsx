"use client";

import { experimental_useObject as useObject } from "ai/react";
import { CardSchema, CardSchemaType } from "../lib/cardSchema";
import { useEffect, useState } from "react";
import { History, parseHistory, serializeHistory } from "../lib/history";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NamesList } from "@/components/ui/names-list";

export default function Home() {
  const [conceptsHistory, setConceptsHistory] = useState<History>(new Map());

  const { object, submit, isLoading, error } = useObject({
    api: "/card/api",
    schema: CardSchema,
    initialValue: {
      names: [],
    },
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem("conceptsHistory");
    if (savedHistory) {
      setConceptsHistory(parseHistory(savedHistory));
      submit(savedHistory);
    } else {
      setConceptsHistory(new Map());
      submit("");
    }
  }, []);

  useEffect(() => {
    if ((object as CardSchemaType).names.length > 0) {
      setConceptsHistory((prev) => {
        const next = new Map(prev);
        for (const concept of (object as CardSchemaType).names) {
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
        const json = serializeHistory(next);
        if (json) localStorage.setItem("conceptsHistory", json);
        return next;
      });
    }
  }, [object]);

  return (
    <div className="min-h-screen flex justify-center">
      <main className="min-w-0 w-full max-w-[46ch] py-10 p-6 flex flex-col gap-6 items-center">
        <Card className="w-full pt-6">
          <CardContent>
            {!error && (
              <NamesList
                isLoading={isLoading}
                data={object as CardSchemaType}
              />
            )}
          </CardContent>
        </Card>
        <Button
          disabled={isLoading}
          onClick={() => submit(serializeHistory(conceptsHistory))}
        >
          Next Card
        </Button>
      </main>
    </div>
  );
}
