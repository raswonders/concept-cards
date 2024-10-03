"use client";

import { experimental_useObject as useObject } from "ai/react";
import { CardSchema, CardSchemaType } from "../lib/cardSchema";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DraggableCard } from "@/components/ui/draggable-card";
import { CardDeck } from "@/components/ui/card-deck";

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
  const [isTesting, setIsTesting] = useState(false);
  const { object, submit, isLoading, error } = useObject({
    api: "/card/api",
    schema: CardSchema,
    initialValue: {
      names: [],
    },
  });
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const isInitialFetch = useRef(true);

  const fetchData = useCallback(() => {
    submit(createRequestBody(categoryName, conceptsHistory));
  }, [categoryName, conceptsHistory, submit]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("conceptsHistory");
    if (savedHistory) {
      setConceptsHistory(parseHistory(savedHistory));
    } else {
      setConceptsHistory(new Map());
    }

    setIsHistoryLoaded(true);
  }, []);

  useEffect(() => {
    if (isInitialFetch.current && isHistoryLoaded) {
      fetchData();
      isInitialFetch.current = false;
    }
  }, [fetchData, isHistoryLoaded]);

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
      {/* <CardDeck /> */}
      <DraggableCard>
        <Card className="w-full pt-6 ">
          <CardContent>
            {!error && (
              <div className="space-y-6">
                <NamesList
                  difficulty="easy"
                  isLoading={isLoading}
                  isTesting={isTesting}
                  data={object as CardSchemaType}
                />
                <NamesList
                  difficulty="medium"
                  isLoading={isLoading}
                  isTesting={isTesting}
                  data={object as CardSchemaType}
                />
                <NamesList
                  difficulty="hard"
                  isLoading={isLoading}
                  isTesting={isTesting}
                  data={object as CardSchemaType}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </DraggableCard>
      <div className="w-full space-y-4">
        {isTesting && (
          <SelectCategory
            isLoading={isLoading}
            value={categoryName}
            onValueChange={setCategoryName}
          />
        )}
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={() => fetchData()}
        >
          New Card
        </Button>
      </div>

      {isTesting && (
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
      )}
      <div className="flex items-center gap-2">
        <Switch
          id="testing-mode-switch"
          checked={isTesting}
          onCheckedChange={setIsTesting}
        />
        <Label htmlFor="testing-mode-switch">Testing Mode</Label>
      </div>
    </main>
  );
}
