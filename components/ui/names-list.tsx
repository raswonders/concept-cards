import { CardSchemaType } from "../../lib/cardSchema";
import { Skeleton } from "./skeleton";
import Image from "next/image";

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
        className={`relative border-2 p-4 rounded-lg ${difficultyBorderColor[difficulty]}`}
      >
        <Image
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
          src={`/images/${difficulty}-icon.svg`}
          width={40}
          height={40}
          alt={`${difficulty} difficulty icon`}
        />
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
