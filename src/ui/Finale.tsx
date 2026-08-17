import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINALE_TEXT, NAMES } from '../config/site';
import { useApp } from '../state/store';
import './finale.css';

interface Props {
  onExit: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Finale({ onExit }: Props) {
  const answers = useApp((s) => s.answers);
  const [showAnswers, setShowAnswers] = useState(false);

  const written = answers.filter((a) => a.answer.trim().length > 0);

  return (
    <div className="fin-root">
      <AnimatePresence mode="wait">
        {!showAnswers ? (
          <motion.div
            key="finale"
            className="fin-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {/* Ana cümle */}
            <motion.p
              className="fin-headline"
              initial={{ opacity: 0, y: 26, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2, delay: 0.9, ease: EASE }}
            >
              {FINALE_TEXT.headline}
            </motion.p>

            {/* Ayırıcı */}
            <motion.div
              className="fin-rule"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 2.6, ease: EASE }}
            />

            {/* İsimler */}
            <motion.div
              className="fin-names"
              initial={{ opacity: 0, letterSpacing: '0.9em' }}
              animate={{ opacity: 1, letterSpacing: '0.42em' }}
              transition={{ duration: 2.4, delay: 3.1, ease: EASE }}
            >
              <span>{NAMES.first}</span>
              <span className="fin-sep">{NAMES.separator}</span>
              <span>{NAMES.second}</span>
            </motion.div>

            {/* Kapanış sözü */}
            <motion.p
              className="fin-quote"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.2, delay: 4.4, ease: EASE }}
            >
              {FINALE_TEXT.quote}
            </motion.p>

            {/* Eylemler */}
            <motion.div
              className="fin-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 6.2 }}
            >
              {written.length > 0 && (
                <button className="btn-ghost" onClick={() => setShowAnswers(true)}>
                  {FINALE_TEXT.review}
                </button>
              )}
              <button className="btn-ghost" onClick={onExit}>
                {FINALE_TEXT.again}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* ---------------- Cevap arşivi ---------------- */
          <motion.div
            key="answers"
            className="fin-answers"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="fin-answers-title">Söylediklerin</h2>

            <div className="fin-answers-list">
              {written.map((a, i) => (
                <motion.article
                  key={a.at}
                  className="fin-answer"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: EASE }}
                >
                  <span className="fin-answer-index">{String(i + 1).padStart(2, '0')}</span>
                  <div className="fin-answer-body">
                    <p className="fin-answer-q">{a.question}</p>
                    <p className="fin-answer-a">{a.answer}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <button className="btn-ghost fin-back" onClick={() => setShowAnswers(false)}>
              geri
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
