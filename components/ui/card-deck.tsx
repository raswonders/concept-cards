import { Card, CardContent } from "@/components/ui/card";
import { NamesList } from "@/components/ui/names-list";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";

export function CardDeck({ object, error, isLoading, isTesting, getNewCard }) {
  const [cardOffset, setCardOffset] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [cardId, setCardId] = useState(1);

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = vx > 0.2;
      console.log({ active, mx, xDir, vx, cardOffset });

      setIsMoving(active);

      if (active) {
        setCardOffset(mx);
      } else {
        if (trigger) {
          setCardOffset(xDir > 0 ? window.innerWidth : -window.innerWidth);
          setTimeout(() => {
            getNewCard();
            setCardId((prev) => prev + 1);
          }, 2000);
        }
      }
    }
  );

  return (
    <Card
      className="w-full pt-6"
      {...bind()}
      style={{
        transform: `translateX(${cardOffset}px)`,
        transition: isMoving ? "" : "transform 0.5s ease-out",
        cursor: isMoving ? "grab" : "auto",
      }}
      key={cardId}
    >
      <CardContent>
        {!error && (
          <div className="space-y-6">
            <NamesList
              difficulty="easy"
              isLoading={isLoading}
              isTesting={isTesting}
              data={object as CardSchemaType}
            />
            <NamesList
              difficulty="medium"
              isLoading={isLoading}
              isTesting={isTesting}
              data={object as CardSchemaType}
            />
            <NamesList
              difficulty="hard"
              isLoading={isLoading}
              isTesting={isTesting}
              data={object as CardSchemaType}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
