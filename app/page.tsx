"use client";

import { experimental_useObject as useObject } from "ai/react";
import { CardSchema, CardSchemaType } from "@/lib/cardSchema";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createRequestBody } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "@/components/ui/select-category";
import { CardDeck } from "@/components/ui/card-deck";
import { useConceptsHistory } from "@/hooks/useConceptsHistory";

export default function Home() {
  const [categoryName, setCategoryName] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const { object, submit, isLoading, error } = useObject({
    api: "/card/api",
    schema: CardSchema,
    initialValue: {
      names: [],
    },
  });

  const [conceptsHistory, setConceptsHistory] = useConceptsHistory();
  const isInitialFetch = useRef(true);

  const fetchData = useCallback(() => {
    submit(createRequestBody(categoryName, conceptsHistory));
  }, [categoryName, conceptsHistory, submit]);

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

        return next;
      });
    }
  }, [object, setConceptsHistory]);

  useEffect(() => {
    if (isInitialFetch.current) {
      fetchData();
      isInitialFetch.current = false;
    }
  }, [fetchData]);

  return (
    <main className="min-w-0 w-full max-w-[46ch] p-6 flex flex-col items-center">
      <div className="flex flex-col items-center space-y-6 mb-6">
        <div className="flex items-center gap-2">
          <Switch
            id="testing-mode-switch"
            checked={isTesting}
            onCheckedChange={setIsTesting}
          />
          <Label htmlFor="testing-mode-switch">Testing Mode</Label>
        </div>

        <div
          className={`${isTesting ? "" : "hidden"} w-full flex flex-col gap-2`}
        >
          <SelectCategory
            isLoading={isLoading}
            value={categoryName}
            onValueChange={setCategoryName}
          />

          <p className="text-sm text-muted-foreground">
            To view queries for categories{" "}
            <a
              href="https://github.com/raswonders/concept-cards/blob/main/lib/categories.ts"
              target="_blank"
              className="underline text-primary"
            >
              checkout github
            </a>
          </p>
        </div>
      </div>

      {!error && (
        <CardDeck
          object={{ names: object?.names ?? [] } as CardSchemaType}
          isTesting={isTesting}
          isLoading={isLoading}
          fetchData={fetchData}
        />
      )}
    </main>
  );
}
