import { motion, AnimatePresence } from 'framer-motion';
import type { WorldConfig } from '../config/site';
import './travel.css';

interface Props {
  world: WorldConfig | null;
}

/**
 * Bir dünyaya geçerken görünen sinematik ara ekran.
 * Kamera portala doğru ilerlerken ekran yavaşça maviye boğulur.
 */
export function TravelOverlay({ world }: Props) {
  return (
    <AnimatePresence>
      {world && (
        <motion.div
          className="travel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Merkezden yayılan ışık */}
          <motion.div
            className="travel-flash"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${world.accent}55 0%, ${world.color}22 35%, transparent 68%)`,
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 2.4 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Hız çizgileri */}
          <div className="travel-streaks" aria-hidden>
            {Array.from({ length: 14 }, (_, i) => (
              <motion.span
                key={i}
                style={{
                  left: `${(i / 14) * 100 + (i % 2 ? 2 : -2)}%`,
                  background: `linear-gradient(180deg, transparent, ${world.accent}, transparent)`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0, 0.55, 0] }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + (i % 5) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>

          {/* Başlık */}
          <motion.div
            className="travel-caption"
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="travel-index" style={{ color: world.accent }}>
              {world.index}
            </span>
            <h2 className="travel-title">{world.title}</h2>
            <motion.div
              className="travel-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.25, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ background: `linear-gradient(90deg, transparent, ${world.accent}, transparent)` }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
