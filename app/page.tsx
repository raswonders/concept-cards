"use client";

import { Card } from "@/app/components/card";
import { experimental_useObject as useObject } from "ai/react";
import { CardSchema, CardSchemaType } from "./cardSchema";

export default function Home() {
  const { object, submit, isLoading } = useObject({
    api: "/card/api",
    schema: CardSchema,
    initialValue: {
      concepts: [],
    },
  });

  return (
    <div className="min-h-screen grid place-content-center">
      <Card data={object as CardSchemaType} />
      <button className="" onClick={() => submit("")}>
        New Card
      </button>
    </div>
  );
}
