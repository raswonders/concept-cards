import { CardSchemaType } from "../../lib/cardSchema";
import { Skeleton } from "./skeleton";
import Image from "next/image";

interface NamesListProps {
  data: CardSchemaType;
  isLoading: boolean;
  isTesting: boolean;
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

export function NamesList({
  data,
  isLoading,
  isTesting,
  difficulty,
}: NamesListProps) {
  const sliced = data.names.slice(
    difficultyMatrix[difficulty],
    difficultyMatrix[difficulty] + 3
  );

  return isLoading ? (
    <Skeleton className="w-full h-[12.5rem] rounded-2xl bg-primary/10" />
  ) : (
    sliced.length > 0 && (
      <div
        className={`relative border-2 p-4 rounded-2xl ${difficultyBorderColor[difficulty]}`}
      >
        <Image
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
          src={`/images/${difficulty}-icon.svg`}
          width={40}
          height={40}
          alt={`${difficulty} difficulty icon`}
        />
        <dl className="text-center">
          {sliced.map((concept, index) => (
            <div className="flex flex-col items-center" key={concept.name}>
              <dt className="font-medium leading-tight">{concept.name}</dt>
              {isTesting && (
                <dd className="text-sm text-slate-400">{concept.category}</dd>
              )}
              {index < 2 && (
                <div
                  className={`w-8 border-b-8 border-dotted my-4 ${difficultyBorderColor[difficulty]}`}
                ></div>
              )}
            </div>
          ))}
        </dl>
      </div>
    )
  );
}
