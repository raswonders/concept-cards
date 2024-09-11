import { CardSchemaType } from "../cardSchema";

interface Props {
  data: CardSchemaType;
}

export function ListOfNames({ data }: Props) {
  return (
    data.names.length > 0 && (
      <ol className="text-center">
        {data.names.map((concept) => (
          <li>{concept.name}</li>
        ))}
      </ol>
    )
  );
}
