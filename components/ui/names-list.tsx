import { CardSchemaType } from "../../lib/cardSchema";
import { Skeleton } from "./skeleton";

interface Props {
  data: CardSchemaType;
  isLoading: boolean;
}

function ListSkeleton() {
  const ITEMS_COUNT = 9;
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

export function NamesList({ data, isLoading }: Props) {
  return isLoading ? (
    <ListSkeleton />
  ) : (
    data.names.length > 0 && (
      <dl className="text-center space-y-2">
        {data.names.map((concept) => (
          <div key={concept.name}>
            <dt >{concept.name}</dt>
            <dd className="text-sm text-slate-400">{concept.category}</dd>
          </div>
        ))}
      </dl>
    )
  );
}
