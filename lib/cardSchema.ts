import { z } from "zod";

const Name = z.object({
  name: z.string(),
  category: z.string(),
});

export const CardSchema = z.object({
  names: z.array(Name).length(9),
});

export type CardSchemaType = z.infer<typeof CardSchema>;
