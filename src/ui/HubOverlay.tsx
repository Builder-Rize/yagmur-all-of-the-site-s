import { motion, AnimatePresence } from 'framer-motion';
import { HUB_TEXT, NAMES, WORLDS } from '../config/site';
import { useApp } from '../state/store';
import './hub.css';

interface Props {
  visible: boolean;
  isMobile: boolean;
  answersCount: number;
  totalQuestions: number;
}

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function HubOverlay({ visible, isMobile, answersCount, totalQuestions }: Props) {
  const focused = useApp((s) => s.focused);
  const world = focused ? WORLDS.find((w) => w.id === focused) : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hub-ui no-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
        >
          {/* Üst köşe — kimlik */}
          <motion.header
            className="hub-header"
            {...fade}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hub-mark">
              {NAMES.first}
              <span>{NAMES.separator}</span>
              {NAMES.second}
            </div>
            <div className="hub-mark-sub">{HUB_TEXT.title}</div>
          </motion.header>

          {/* Alt orta — odaklanan dünya bilgisi ya da ipucu */}
          <div className="hub-footer">
            <AnimatePresence mode="wait">
              {world ? (
                <motion.div
                  key={world.id}
                  className="hub-focus"
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="hub-focus-index" style={{ color: world.accent }}>
                    {world.index}
                  </span>
                  <h2 className="hub-focus-title">{world.title}</h2>
                  <p className="hub-focus-desc">{world.description}</p>
                  {world.kind === 'link' && <span className="hub-focus-tag">yeni sekmede açılır</span>}
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  className="hub-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {isMobile ? HUB_TEXT.mobileHint : HUB_TEXT.desktopHint}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Sağ kenar — soru ilerlemesi (varsa) */}
          <AnimatePresence>
            {answersCount > 0 && (
              <motion.div
                className="hub-progress"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <span className="hub-progress-label">yıldızlar</span>
                <span className="hub-progress-count">
                  {String(answersCount).padStart(2, '0')}
                  <em>/{String(totalQuestions).padStart(2, '0')}</em>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Köşe süsleri — çerçeve hissi */}
          <div className="hub-corners" aria-hidden>
            <span className="c tl" />
            <span className="c tr" />
            <span className="c bl" />
            <span className="c br" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
