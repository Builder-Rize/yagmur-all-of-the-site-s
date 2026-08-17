import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setMuted, startAmbient } from '../audio/ambient';
import { store, useApp } from '../state/store';
import './audio.css';

interface Props {
  visible: boolean;
}

/** Köşedeki minimal ses kontrolü — 4 çubuklu ekolayzır. */
export function AudioControl({ visible }: Props) {
  const muted = useApp((s) => s.muted);
  const [ready, setReady] = useState(false);

  // Ses motoru yalnızca kullanıcı etkileşiminden sonra başlar
  useEffect(() => {
    if (!visible) return;
    let done = false;
    const init = () => {
      if (done) return;
      done = true;
      void startAmbient().then(() => {
        setReady(true);
        setMuted(store.get().muted);
      });
    };
    window.addEventListener('pointerdown', init, { once: true });
    window.addEventListener('keydown', init, { once: true });
    return () => {
      window.removeEventListener('pointerdown', init);
      window.removeEventListener('keydown', init);
    };
  }, [visible]);

  const toggle = () => {
    const next = !muted;
    store.setMuted(next);
    if (!ready) {
      void startAmbient().then(() => {
        setReady(true);
        setMuted(next);
      });
    } else {
      setMuted(next);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={`audio-btn ${muted ? 'is-muted' : ''}`}
          onClick={toggle}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
          title={muted ? 'Sesi aç' : 'Sesi kapat'}
        >
          <span className="audio-bars" aria-hidden>
            <i style={{ animationDelay: '0ms' }} />
            <i style={{ animationDelay: '180ms' }} />
            <i style={{ animationDelay: '90ms' }} />
            <i style={{ animationDelay: '260ms' }} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
