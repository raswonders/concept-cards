import { CardSchemaType } from "../cardSchema";

interface Props {
  data: CardSchemaType;
}

export function Card({ data }: Props) {
  return (
    data.names.length > 0 && (
      <ol className="border-2 border-slate-400 p-4 rounded-lg">
        {data.names.map((concept) => (
          <li>{concept.name}</li>
        ))}
      </ol>
    )
  );
}
