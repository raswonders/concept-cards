import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { CardSchema } from "@/app/cardSchema";
import { parseHistory } from "@/app/helpers/history";

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

  if (!process.env.OPENAI_API_KEY) {
    console.error("key is missing!!!!")
    console.log(process.env)
  }
  const body = await req.json();
  const conceptsHistory = parseHistory(body);

  let prompt = "";
  for (let i = 0; i < 9; i++) {
    const usedPreviously = conceptsHistory.get(categories[i]);
    const exclude = usedPreviously ? `but exclude following names ${[...usedPreviously].join(",")}` : "";
    prompt += `For item no ${i} generate a name from category ${categories[i]} ${exclude}.`
  }

  console.log("querying model...")
  console.log({ prompt })
  const { object } = await generateObject({
    model: openai(modelName),
    prompt,
    schema: CardSchema,
    temperature: 1,
  })

  return NextResponse.json(object);
}
