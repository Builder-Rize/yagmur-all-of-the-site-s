import emailjs from '@emailjs/browser';
import { EMAIL } from '../config/site';
import type { Answer } from '../state/store';

/**
 * Cevapları tek bir e-posta olarak gönderir.
 *
 * Tasarım kararı: gönderim başarısız olursa kullanıcıya hiçbir
 * hata gösterilmez. Deneyimin son anını bozmamak için sessizce
 * geçilir; cevaplar zaten localStorage'da durur.
 */

const SENT_KEY = 'ey-universe-mail-sent';

/** Aynı cevap setinin iki kez gönderilmesini engeller. */
function alreadySent(signature: string): boolean {
  try {
    return localStorage.getItem(SENT_KEY) === signature;
  } catch {
    return false;
  }
}

function markSent(signature: string): void {
  try {
    localStorage.setItem(SENT_KEY, signature);
  } catch {
    /* depolama kapalı olabilir — yoksay */
  }
}

/** Cevap setini tanımlayan basit bir imza üretir. */
function signatureOf(answers: Answer[]): string {
  return `${answers.length}:${answers[answers.length - 1]?.at ?? 0}`;
}

/** Cevapları okunabilir düz metne çevirir. */
function formatAnswers(answers: Answer[]): string {
  return answers
    .map((a, i) => {
      const n = String(i + 1).padStart(2, '0');
      const text = a.answer.trim() || '(boş bırakıldı)';
      return `${n}. ${a.question}\n    → ${text}`;
    })
    .join('\n\n');
}

function formatDate(ts: number): string {
  try {
    return new Intl.DateTimeFormat('tr-TR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toISOString();
  }
}

/**
 * Cevapları gönderir.
 * @returns gönderim denendi ve başarılı olduysa true
 */
export async function sendAnswers(answers: Answer[]): Promise<boolean> {
  if (!EMAIL.enabled) return false;
  if (answers.length === 0) return false;

  const signature = signatureOf(answers);
  if (alreadySent(signature)) return false;

  const written = answers.filter((a) => a.answer.trim().length > 0).length;

  const params: Record<string, string> = {
    [EMAIL.fields.answers]: formatAnswers(answers),
    [EMAIL.fields.answeredAt]: formatDate(answers[answers.length - 1]?.at ?? Date.now()),
    [EMAIL.fields.count]: `${written}/${answers.length}`,
  };

  try {
    await emailjs.send(EMAIL.serviceId, EMAIL.templateId, params, {
      publicKey: EMAIL.publicKey,
    });
    markSent(signature);
    return true;
  } catch (err) {
    // Sessiz başarısızlık — kullanıcı deneyimi kesintiye uğramasın.
    // Sorun ayıklamak istersen konsolu aç.
    console.warn('[mail] gönderilemedi:', err);
    return false;
  }
}
