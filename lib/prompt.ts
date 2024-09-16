import { categories, Category, wildcardCategory } from "./categories";
import { shuffleArray } from "./utils";
import { History } from "@/lib/history";

const difficultyMatrix = {
  easy: 0,
  medium: 3,
  hard: 6,
};
const difficulties = ["easy", "medium", "hard"];

export function createPrompt(history: History) {
  let prompt = "";

  for (const difficulty of difficulties) {
    const pool = shuffleArray(categories);
    for (let i = 0; i < 3; i++) {
      while (true) {
        const category = pool.pop() || wildcardCategory;
        const slotPrompt = category[difficulty as "easy" | "medium" | "hard"]();
        if (slotPrompt) {
          const usedPreviously = history.get(category.name)
            ? [...(history.get(category.name) as Set<string>)].join(",")
            : "";
          const exclude = usedPreviously
            ? `, but exclude ${usedPreviously}`
            : "";
          prompt += `For item ${
            difficultyMatrix[difficulty as keyof typeof difficultyMatrix] + i
          } ${slotPrompt}${exclude}.`;
        }

        if (pool.length === 0) break;
      }
    }
  }

  return prompt;
}

export function createSingleCatPrompt(
  category: Category,
  history: History = new Map()
) {
  let prompt = "";

  for (const difficulty of difficulties) {
    for (let i = 0; i < 3; i++) {
      let slotPrompt = category[difficulty as "easy" | "medium" | "hard"]();
      if (slotPrompt) {
        const usedPreviously = history.get(category.name)
          ? [...(history.get(category.name) as Set<string>)].join(",")
          : "";
        const exclude = usedPreviously ? `, but exclude ${usedPreviously}` : "";
        prompt += `For item ${
          difficultyMatrix[difficulty as keyof typeof difficultyMatrix] + i
        } ${slotPrompt}${exclude}.`;
      } else {
        slotPrompt = "generate empty string";
        prompt += `For item ${
          difficultyMatrix[difficulty as keyof typeof difficultyMatrix] + i
        } ${slotPrompt}.`;
      }
    }
  }

  return prompt;
}
