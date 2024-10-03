import { motion, PanInfo } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "./card";
import { NamesList } from "./names-list";
import { CardSchemaType } from "@/lib/cardSchema";

const variants = {
  flyOffRight: {
    x: "100vw",
    opacity: 0,
    transition: { type: "spring" },
  },
  flyOffLeft: {
    x: "-100vw",
    opacity: 0,
    transition: { type: "spring" },
  },
};

interface DraggableCardProps {
  object: CardSchemaType;
  isLoading: boolean;
  isTesting: boolean;
  fetchData: () => void;
}

export function DraggableCard({
  object,
  isLoading,
  isTesting,
  fetchData,
}: DraggableCardProps) {
  const [variant, setVariant] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    event: PointerEvent | TouchEvent | MouseEvent,
    info: PanInfo
  ) => {
    const minDistance = cardRef.current
      ? cardRef.current.offsetWidth / 2
      : 381 / 2;
    const triggerVelocity = Math.abs(info.velocity.x) > 500;
    const triggerOffset = Math.abs(info.offset.x) > minDistance;

    if (triggerVelocity || triggerOffset) {
      if (info.offset.x > 0) {
        setVariant("flyOffRight");
      } else {
        setVariant("flyOffLeft");
      }

      setTimeout(() => fetchData(), 400);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      className="absolute w-full"
      drag="x"
      animate={variant}
      initial={false}
      onDragEnd={handleDragEnd}
      dragSnapToOrigin={true}
      dragMomentum={true}
    >
      <Card className="w-full pt-6">
        <CardContent>
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
        </CardContent>
      </Card>
    </motion.div>
  );
}
