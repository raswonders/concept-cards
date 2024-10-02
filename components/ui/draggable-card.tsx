import { motion, PanInfo } from "framer-motion";
import { useState } from "react";

const variants = {
  flyOff: { x: "100vw" },
};

export function DraggableCard({ children }: { children: React.ReactNode }) {
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
      {children}
    </motion.div>
  );
}
