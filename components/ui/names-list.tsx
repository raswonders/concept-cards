import { CardSchemaType } from "../../lib/cardSchema";
import { Skeleton } from "./skeleton";
interface NamesListProps {
  data: CardSchemaType;
  isLoading: boolean;
  difficulty: "easy" | "medium" | "hard";
}

const difficultyMatrix = {
  easy: 0,
  medium: 3,
  hard: 6,
};

const difficultyBorderColor = {
  easy: "border-blue-200",
  medium: "border-red-200",
  hard: "border-neutral-400",
};

export function NamesList({ data, isLoading, difficulty }: NamesListProps) {
  const sliced = data.names.slice(
    difficultyMatrix[difficulty],
    difficultyMatrix[difficulty] + 3
  );

  return isLoading ? (
    <Skeleton className="w-full h-[10rem] rounded-lg bg-primary/10" />
  ) : (
    sliced.length > 0 && (
      <div
        className={`border-2 p-2 rounded-lg ${difficultyBorderColor[difficulty]}`}
      >
        <dl className="text-center space-y-2">
          {sliced.map((concept) => (
            <div key={concept.name}>
              <dt className="font-medium leading-tight">{concept.name}</dt>
              <dd className="text-sm text-slate-400">{concept.category}</dd>
            </div>
          ))}
        </dl>
      </div>
    )
  );
}
