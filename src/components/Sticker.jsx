import { motion } from 'framer-motion';
import '../styles/shared.css';

export default function Sticker({
  children,
  label,
  emoji,
  top,
  left,
  right,
  bottom,
  rotate = -8,
  bob = true,
  drag = false,
  className = '',
  style = {},
}) {
  const pos = { top, left, right, bottom, rotate, ...style };

  const inner = label ? (
    <span className="sticker-label">{label}</span>
  ) : (
    <span className="sticker-face" aria-hidden="true">
      {emoji}
    </span>
  );

  const motionProps = bob
    ? {
        animate: { y: [0, -8, 0], rotate: [rotate, rotate + 3, rotate] },
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }
    : {};

  if (drag) {
    return (
      <motion.div
        className={`sticker ${className}`}
        style={pos}
        drag
        dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
        dragElastic={0.2}
        whileDrag={{ scale: 1.12, zIndex: 20, cursor: 'grabbing' }}
        role="img"
        aria-label={label || 'sticker'}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`sticker ${className}`}
      style={pos}
      {...motionProps}
      aria-hidden="true"
    >
      {inner}
    </motion.div>
  );
}
