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

function ListSkeleton() {
  const ITEMS_COUNT = 3;
  const array = new Array(ITEMS_COUNT).fill(undefined);

  return (
    <div className="text-center leading-6 space-y-2">
      {array.map((_, index) => (
        <Skeleton
          key={index}
          className="inline-block w-2/3 h-[43px] rounded-full bg-primary/10"
        />
      ))}
    </div>
  );
}

export function NamesList({ data, isLoading, difficulty }: NamesListProps) {
  const sliced = data.names.slice(
    difficultyMatrix[difficulty],
    difficultyMatrix[difficulty] + 3
  );

  return (
    <div
      className={`border-2 p-2 rounded-lg ${difficultyBorderColor[difficulty]}`}
    >
      {isLoading ? (
        <ListSkeleton />
      ) : (
        sliced.length > 0 && (
          <dl className="text-center space-y-2">
            {sliced.map((concept) => (
              <div key={concept.name}>
                <dt>{concept.name}</dt>
                <dd className="text-sm text-slate-400">{concept.category}</dd>
              </div>
            ))}
          </dl>
        )
      )}
    </div>
  );
}
