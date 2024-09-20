"use client";

import { experimental_useObject as useObject } from "ai/react";
import { CardSchema, CardSchemaType } from "../lib/cardSchema";
import { useEffect, useState } from "react";
import {
  History,
  parseHistory,
  serializeHistory,
  toSerializableHistory,
} from "../lib/history";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NamesList } from "@/components/ui/names-list";
import { SelectCategory } from "@/components/ui/select-category";

function createRequestBody(categoryName: string, history: History) {
  const requestBody = {
    categoryName,
    history: toSerializableHistory(history),
  };

  return requestBody;
}

export default function Home() {
  const [conceptsHistory, setConceptsHistory] = useState<History>(new Map());
  const [categoryName, setCategoryName] = useState("");
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
    } else {
      setConceptsHistory(new Map());
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
    <main className="min-w-0 w-full max-w-[46ch] py-10 p-6 flex flex-col gap-4 items-center">
      <Card className="w-full pt-6 rounded-xl2">
        <CardContent>
          {!error && (
            <div className="space-y-6">
              <NamesList
                difficulty="easy"
                isLoading={isLoading}
                data={object as CardSchemaType}
              />
              <NamesList
                difficulty="medium"
                isLoading={isLoading}
                data={object as CardSchemaType}
              />
              <NamesList
                difficulty="hard"
                isLoading={isLoading}
                data={object as CardSchemaType}
              />
            </div>
          )}
        </CardContent>
      </Card>
      <div className="w-full space-y-4">
        <SelectCategory
          isLoading={isLoading}
          value={categoryName}
          onValueChange={setCategoryName}
        />
        <Button
          className="w-full bg-blue-500 hover:bg-blue-400"
          disabled={isLoading}
          onClick={() => {
            submit(createRequestBody(categoryName, conceptsHistory));
          }}
        >
          New Card
        </Button>
      </div>
      <p className="text-sm text-slate-400">
        To view categories{" "}
        <a
          href="https://github.com/raswonders/concept-cards/blob/main/lib/categories.ts"
          target="_blank"
          className="text-blue-500 underline"
        >
          checkout github
        </a>
      </p>
    </main>
  );
}
