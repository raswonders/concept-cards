import { z } from "zod";

const listOfConcepts = z
  .array(z.string())
  .length(9)
  .describe("9 strings representing unique concept");

export const CardSchema = z.object({
  concepts: listOfConcepts,
});

export type CardSchemaType = z.infer<typeof CardSchema>;
