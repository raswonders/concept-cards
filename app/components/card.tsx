import { CardSchemaType } from "../cardSchema";

interface Props {
  data: CardSchemaType;
}

export function Card({ data }: Props) {
  return (
    data.concepts.length > 0 && (
      <ol className="border-2 border-slate-400 p-4 rounded-lg">
        {data.concepts.map((concept) => (
          <li>{concept}</li>
        ))}
      </ol>
    )
  );
}
