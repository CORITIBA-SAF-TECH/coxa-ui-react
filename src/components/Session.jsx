import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { t } from '../i18n/core.js';
import { useOverlay } from '../hooks/useOverlay.js';
import { useIsoLayoutEffect } from '../hooks/useSlideIndicator.js';

/* Contagem regressiva de sessão, em segundos.
   const sessao = useCountdown(15 * 60, { warnAt: 60, onWarn: abrirAviso, onExpire: bloquear });
   sessao.left     → segundos restantes
   sessao.warning  → true quando left <= warnAt
   sessao.reset()  → volta ao total (ou reset(n) para um valor)
   sessao.set(n)   → acerta o relógio com o que o servidor informar
   A validade real da sessão é do backend: o hook só espelha o tempo na tela. */
export function useCountdown(total, { warnAt = 60, onWarn, onExpire, paused = false } = {}) {
  const [left, setLeft] = useState(total);
  const cb = useRef({ onWarn, onExpire });
  cb.current = { onWarn, onExpire };
  const avisou = useRef(false);
  const expirou = useRef(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setLeft(l => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    if (left > warnAt) { avisou.current = false; expirou.current = false; return; }
    if (left > 0 && !avisou.current) { avisou.current = true; cb.current.onWarn?.(); }
    if (left === 0 && !expirou.current) { expirou.current = true; cb.current.onExpire?.(); }
  }, [left, warnAt]);

  const reset = useCallback(v => setLeft(typeof v === 'number' ? v : total), [total]);
  return { left, warning: left <= warnAt, reset, set: setLeft };
}

const mmss = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/* Chip de sessão para o cabeçalho (anel + mm:ss). Fica laranja quando left <= warnAt.
   <SessionChip left={sessao.left} total={900} onClick={renovar} /> */
export function SessionChip({ left = 0, total = 0, warnAt = 60, onClick, title = 'Tempo de sessão', className = '' }) {
  const p = total > 0 ? Math.max(0, Math.min(100, (left / total) * 100)) : 0;
  const cls = `sess-chip ${left <= warnAt ? 'warn' : ''} ${className}`.replace(/\s+/g, ' ').trim();
  const corpo = (
    <>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle className="trk" cx="12" cy="12" r="9" />
        <circle className="arc" cx="12" cy="12" r="9" pathLength="100" />
      </svg>
      <span>{mmss(left)}</span>
    </>
  );
  const comum = { className: cls, style: { '--p': p.toFixed(2) }, title, 'aria-label': t('Sessão expira em {tempo}', { tempo: mmss(left) }) };
  return onClick
    ? <button type="button" onClick={onClick} {...comum}>{corpo}</button>
    : <span {...comum}>{corpo}</span>;
}

/* Tela de bloqueio (sessão encerrada). Cobre e desfoca a aplicação, torna o
   resto da página inerte (sem foco nem clique) e prende o foco na ação.
   <LockScreen open={bloqueado} action={<Button variant="accent" icon="lock" onClick={entrar}>Entrar novamente</Button>}>
     O conteúdo foi ocultado. Entre de novo para continuar.
   </LockScreen> */
export function LockScreen({ open, icon = 'shield-lock', title = 'Sessão encerrada', children, action }) {
  const ref = useOverlay(open);
  const raiz = useRef(null);

  /* layout effect: a tela precisa deixar de ser inerte antes de o useOverlay focar a ação */
  useIsoLayoutEffect(() => {
    const no = raiz.current;
    if (!no) return;
    no.inert = !open;
    if (!open) return;
    const outros = Array.from(document.body.children).filter(n => n !== no && !n.inert);
    outros.forEach(n => { n.inert = true; });
    return () => outros.forEach(n => { n.inert = false; });
  }, [open]);

  if (typeof document === 'undefined') return null;
  return createPortal(
    <div ref={raiz} className={`lock-scr ${open ? 'open' : ''}`.trim()}>
      <div ref={ref} className="lock-box" role="alertdialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined} tabIndex={-1}>
        {icon && <i className={`ti ti-${icon}`} />}
        {title && <h2>{title}</h2>}
        {children && <p>{children}</p>}
        {action}
      </div>
    </div>,
    document.body
  );
}
