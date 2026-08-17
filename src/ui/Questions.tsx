import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, QUESTIONS_TEXT } from '../config/site';
import { store, useApp } from '../state/store';
import { blip } from '../audio/ambient';
import './questions.css';

interface Props {
  onComplete: () => void;
  onExit: () => void;
}

type Phase = 'intro' | 'asking';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Questions({ onComplete, onExit }: Props) {
  const answers = useApp((s) => s.answers);
  // Kaldığı yerden devam et
  const [index, setIndex] = useState(() => Math.min(answers.length, QUESTIONS.length - 1));
  const [phase, setPhase] = useState<Phase>(answers.length > 0 ? 'asking' : 'intro');
  const [value, setValue] = useState('');
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const total = QUESTIONS.length;
  const question = QUESTIONS[index];
  const progress = (index / total) * 100;

  useEffect(() => {
    if (phase !== 'asking') return;
    const t = setTimeout(() => inputRef.current?.focus(), 900);
    return () => clearTimeout(t);
  }, [phase, index]);

  // Metin alanını içeriğe göre büyüt
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 190)}px`;
  }, [value]);

  const advance = (answer: string) => {
    if (sending) return;
    setSending(true);
    blip(700 + index * 28, 0.26, 0.045);

    store.addAnswer(question, answer);

    // Cevabın yıldıza dönüşmesi için kısa bekleme
    setTimeout(() => {
      setValue('');
      setSending(false);
      if (index + 1 >= total) {
        onComplete();
      } else {
        setIndex((i) => i + 1);
      }
    }, 720);
  };

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    advance(trimmed);
  };

  const skip = () => advance('');

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter gönderir, Shift+Enter satır atlar
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="q-root">
      <AnimatePresence mode="wait">
        {/* ---------------- GİRİŞ ---------------- */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="q-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.p
              className="q-intro-text"
              initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
            >
              {QUESTIONS_TEXT.intro}
            </motion.p>

            <motion.button
              className="btn q-intro-btn"
              onClick={() => {
                blip(820, 0.3, 0.05);
                setPhase('asking');
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.9, ease: EASE }}
            >
              {QUESTIONS_TEXT.introButton}
            </motion.button>

            <motion.button
              className="btn-ghost q-exit"
              onClick={onExit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
            >
              {QUESTIONS_TEXT.back}
            </motion.button>
          </motion.div>
        )}

        {/* ---------------- SORULAR ---------------- */}
        {phase === 'asking' && (
          <motion.div
            key="asking"
            className="q-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* İlerleme */}
            <div className="q-progress">
              <div className="q-counter">
                <span className="q-counter-now">{String(index + 1).padStart(2, '0')}</span>
                <span className="q-counter-sep">/</span>
                <span className="q-counter-total">{String(total).padStart(2, '0')}</span>
              </div>
              <div className="q-bar">
                <motion.span
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              </div>
            </div>

            {/* Soru + cevap */}
            <div className="q-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  className="q-card"
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -26, filter: 'blur(10px)' }}
                  transition={{ duration: 0.75, ease: EASE }}
                >
                  <h2 className="q-question">{question}</h2>

                  <form className="q-form" onSubmit={submit}>
                    <div className="q-field-wrap">
                      <textarea
                        ref={inputRef}
                        className="field q-field"
                        placeholder={QUESTIONS_TEXT.placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                        maxLength={600}
                        disabled={sending}
                        aria-label={question}
                      />
                      <span className="q-field-line" aria-hidden />
                    </div>

                    <div className="q-actions">
                      <button
                        type="submit"
                        className="btn q-submit"
                        disabled={!value.trim() || sending}
                      >
                        {QUESTIONS_TEXT.submit}
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={skip}
                        disabled={sending}
                      >
                        {QUESTIONS_TEXT.skip}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Gönderim anında yükselen ışık */}
            <AnimatePresence>
              {sending && (
                <motion.div
                  className="q-spark no-pointer"
                  initial={{ opacity: 0, scale: 0.2, y: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.2, 1.1, 0.4], y: -220 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: EASE }}
                />
              )}
            </AnimatePresence>

            <button className="btn-ghost q-exit q-exit-fixed" onClick={onExit}>
              {QUESTIONS_TEXT.back}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
