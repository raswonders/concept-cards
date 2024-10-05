import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "./card";
import { NamesList } from "./names-list";
import { CardSchemaType } from "@/lib/cardSchema";
import { Trash2 } from "lucide-react";

const PANEL_W = 80;
const TRIGGER_W = 100;

const variants = {
  delete: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.2 },
  },
  create: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hold: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};

interface DraggableCardProps {
  id: number;
  object: CardSchemaType;
  isLoading: boolean;
  isTesting: boolean;
  handleDelete: (cardId: number) => void;
}

export function DraggableCard({
  id,
  object,
  isLoading,
  isTesting,
  handleDelete,
}: DraggableCardProps) {
  const [variant, setVariant] = useState("create");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    event: PointerEvent | TouchEvent | MouseEvent,
    info: PanInfo
  ) => {
    const triggerVelocity = Math.abs(info.velocity.x) >= 500;
    const triggerOffset = Math.abs(info.offset.x) >= TRIGGER_W;

    if (triggerVelocity || triggerOffset) {
      setVariant("delete");
      setTimeout(() => {
        setVariant("create");
        handleDelete(id);
      }, 200);
    }
  };

  const cardX = useMotionValue(0);
  const actionPanelRightX = useTransform(cardX, [-TRIGGER_W, 0], [-PANEL_W, 0]);
  const actionPanelLeftX = useTransform(cardX, [0, TRIGGER_W], [0, PANEL_W]);
  const bgColor = useTransform(
    cardX,
    [-TRIGGER_W, -TRIGGER_W + 0.01, TRIGGER_W - 0.01, TRIGGER_W],
    [
      "hsl(var(--destructive))",
      "hsl(var(--muted))",
      "hsl(var(--muted))",
      "hsl(var(--destructive))",
    ]
  );

  const foregroundColor = useTransform(
    cardX,
    [-TRIGGER_W, -TRIGGER_W + 0.01, TRIGGER_W - 0.01, TRIGGER_W],
    [
      "hsl(var(--destructive-foreground))",
      "hsl(var(--muted-foreground))",
      "hsl(var(--muted-foreground))",
      "hsl(var(--destructive-foreground))",
    ]
  );

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      className="absolute w-full touch-pan-y-all opacity-0"
      drag="x"
      animate={variant}
      initial="delete"
      whileTap="hold"
      onDragEnd={handleDragEnd}
      dragSnapToOrigin={true}
      dragMomentum={true}
      dragConstraints={{ left: -TRIGGER_W, right: TRIGGER_W }}
      dragElastic={0.2}
      style={{ x: cardX }}
    >
      <div className="relative w-full rounded-xl overflow-x-hidden">
        <Card className="w-full">
          <motion.div
            className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
            style={{
              x: actionPanelLeftX,
              width: PANEL_W,
              left: -PANEL_W,
              backgroundColor: bgColor,
              color: foregroundColor,
            }}
          >
            <Trash2 />
          </motion.div>
          <motion.div
            className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
            style={{
              x: actionPanelRightX,
              width: PANEL_W,
              right: -PANEL_W,
              backgroundColor: bgColor,
              color: foregroundColor,
            }}
          >
            <Trash2 />
          </motion.div>

          <CardContent className="relative pt-6 z-0">
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
      </div>
    </motion.div>
  );
}
