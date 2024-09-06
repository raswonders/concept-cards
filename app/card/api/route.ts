import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const modelName = "gpt-4o-2024-08-24";
const CardSchema = z.array(z.string().min(2).describe("a word or phrase")).length(9);

export async function GET(req: Request) {
  const { object } = await generateObject({
    model: openai(modelName),
    prompt: "Generate nine different words or short phrases",
    schema: CardSchema,
  })

  return NextResponse.json(object);
}