import { motion, AnimatePresence } from 'framer-motion';
import { NAMES } from '../config/site';

interface Props {
  visible: boolean;
  progress: number;
}

export function Loader({ visible, progress }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="loader-mark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6 }}
          >
            {NAMES.first} {NAMES.separator} {NAMES.second}
          </motion.div>

          <div className="loader-bar">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="loader-pct">{String(Math.round(progress)).padStart(3, '0')}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
