import { CardSchemaType } from "../../app/cardSchema";
import { Skeleton } from "./skeleton";

interface Props {
  data: CardSchemaType;
  isLoading: boolean;
}

function ListSkeleton() {
  const ITEMS_COUNT = 9;
  let array = new Array(ITEMS_COUNT).fill(undefined);

  return (
    <div className="text-center leading-6">
      {array.map((item) => (
        <Skeleton className="inline-block w-2/3 h-4 rounded-full bg-primary/10" />
      ))}
    </div>
  );
}

export function NamesList({ data, isLoading }: Props) {
  return isLoading ? (
    <ListSkeleton />
  ) : (
    data.names.length > 0 && (
      <ol className="text-center">
        {data.names.map((concept) => (
          <li>{concept.name}</li>
        ))}
      </ol>
    )
  );
}
