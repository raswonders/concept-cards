import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { CardSchema } from "@/app/cardSchema";

const modelName = "gpt-4o-2024-08-06";

const categories = [
  "Actors and directors",
  "Movies",
  "Writers",
  "Superheroes and Villains",
  "Musicians",
  "Songs",
  "Video games from 90s",
  "Fantasy Characters",
  "Historical Figures",
]

export async function POST(req: Request) {
  let prompt = "";
  for (let i = 0; i < 9; i++) {
    prompt += `For item no ${i} generate a name from category ${categories[i]}.`
  }

  console.log("querying model...")
  const { object } = await generateObject({
    model: openai(modelName),
    prompt,
    schema: CardSchema,
    temperature: 0.6,
  })
  
  return NextResponse.json(object);
}