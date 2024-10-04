import { useState } from "react";
import { DraggableCard } from "./draggable-card";
import { CardSchemaType } from "@/lib/cardSchema";

let id = 0;
const generateId = () => ++id;

interface Card {
  id: number;
}

interface CardDeckProps {
  object: CardSchemaType;
  isTesting: boolean;
  isLoading: boolean;
  fetchData: () => void;
}

export function CardDeck({
  object,
  isTesting,
  isLoading,
  fetchData,
}: CardDeckProps) {
  const [deck, setDeck] = useState<Card[]>([]);

  function handleDelete(cardId: number) {
    setDeck((prevDeck) => prevDeck.filter((card) => card.id !== cardId));
    fetchData();
  }

  function addCard() {
    const newCard = { id: generateId() };
    setDeck([...deck, newCard]);
  }

  return (
    <div className="relative w-full flex justify-center">
      {deck.map((card) => (
        <DraggableCard
          key={card.id}
          id={card.id}
          object={object}
          isLoading={isLoading}
          isTesting={isTesting}
          handleDelete={handleDelete}
        />
      ))}
      <button
        onClick={() => {
          addCard();
        }}
        className="w-56 h-56 flex justify-center items-center border-8 border-dashed rounded-lg"
      >
        Draw Card
      </button>
    </div>
  );
}
