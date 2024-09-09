import { CardSchemaType } from "@/app/cardSchema";

interface Props {
  data: CardSchemaType;
}

export function Card({ data }: Props) {
  console.log(data);
  return (
    <div className="borderi border-black">
      <ol className="">
        {data.names.map((concept) => (
          <li>{concept}</li>
        ))}
      </ol>
    </div>
  );
}
