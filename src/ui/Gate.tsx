import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GATE_TEXT, NAMES, PASSWORD } from '../config/site';
import { blip } from '../audio/ambient';
import './gate.css';

interface Props {
  onUnlock: () => void;
}

/** Şifre karşılaştırması — Unicode normalizasyonu ile (ğ, ı vb.) */
function matches(input: string): boolean {
  const norm = (s: string) => s.normalize('NFC').trim();
  return norm(input) === norm(PASSWORD);
}

export function Gate({ onUnlock }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sahne oturduktan sonra odaklan
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 2200);
    return () => clearTimeout(t);
  }, []);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (leaving || !value.trim()) return;

    if (matches(value)) {
      setError(false);
      setLeaving(true);
      blip(880, 0.5, 0.07);
      setTimeout(() => blip(1320, 0.7, 0.05), 140);
      // Çıkış animasyonunun oynamasına izin ver
      setTimeout(onUnlock, 720);
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      blip(180, 0.3, 0.04);
      setTimeout(() => setError(false), 620);
    }
  };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(14px)', scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gate-inner">
            {/* Başlık */}
            <motion.div
              className="gate-title"
              initial={{ opacity: 0, y: 24, letterSpacing: '0.9em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.34em' }}
              transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{NAMES.first}</span>
              <motion.span
                className="gate-sep"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {NAMES.separator}
              </motion.span>
              <span>{NAMES.second}</span>
            </motion.div>

            {/* Alt başlık */}
            <motion.p
              className="gate-subtitle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {GATE_TEXT.subtitle}
            </motion.p>

            {/* İnce ayırıcı */}
            <motion.div
              className="gate-rule"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Şifre formu */}
            <motion.form
              className="gate-form"
              onSubmit={submit}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="gate-field-wrap">
                <input
                  ref={inputRef}
                  type="password"
                  className={`field gate-field ${error ? 'shake' : ''}`}
                  placeholder={GATE_TEXT.placeholder}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Şifre"
                />
                <span className="gate-field-glow" aria-hidden />
              </div>

              <button type="submit" className="btn gate-btn" disabled={!value.trim()}>
                {GATE_TEXT.button}
              </button>

              {/* Hata mesajı */}
              <div className="gate-msg-slot" aria-live="polite">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.span
                      key="err"
                      className="gate-msg"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {GATE_TEXT.error}
                    </motion.span>
                  )}
                  {!error && attempts >= 3 && (
                    <motion.span
                      key="hint"
                      className="gate-msg gate-msg-hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9 }}
                    >
                      {GATE_TEXT.hint}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
