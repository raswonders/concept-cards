import { useState } from "react";
import { DraggableCard } from "./draggable-card";

let id = 0;
const generateId = () => ++id;

interface Card {
  id: number;
}

export function CardDeck() {
  const [deck, setDeck] = useState<Card[]>([]);

  function addCard() {
    const newCard = { id: generateId() };
    setDeck([...deck, newCard]);
  }

  return (
    <div className="w-full flex justify-center">
      {deck.map((card) => (
        <DraggableCard key={card.id} />
      ))}
      <button
        onClick={() => {
          addCard();
        }}
        className="w-56 h-56 flex justify-center items-center border-8 border-dashed rounded-lg"
      >
        New Card
      </button>
    </div>
  );
}
