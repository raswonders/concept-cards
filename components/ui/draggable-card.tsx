import { motion, PanInfo } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "./card";
import { NamesList } from "./names-list";
import { CardSchemaType } from "@/lib/cardSchema";

const variants = {
  flyOff: { x: "100vw" },
};

interface DraggableCardProps {
  object: CardSchemaType;
  isLoading: boolean;
  isTesting: boolean;
}

export function DraggableCard({
  object,
  isLoading,
  isTesting,
}: DraggableCardProps) {
  const [variant, setVariant] = useState("");

  const handleDragEnd = (
    event: PointerEvent | TouchEvent | MouseEvent,
    info: PanInfo
  ) => {
    const trigger = info.velocity.x > 1500;
    if (trigger) {
      console.log(info);
      setVariant("flyOff");
    }
  };

  return (
    <motion.div
      variants={variants}
      className="w-full"
      drag="x"
      animate={variant}
      initial={false}
      onDragEnd={handleDragEnd}
      dragSnapToOrigin={true}
      dragMomentum={true}
    >
      <Card className="w-full pt-6 ">
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
