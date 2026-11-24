import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { t } from '../i18n/core.js';
import { useOverlay } from '../hooks/useOverlay.js';
import { useIsoLayoutEffect } from '../hooks/useSlideIndicator.js';

const semAcento = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/* Paleta de comandos (busca global): abre com Ctrl K / ⌘K.

   const cmd = useCommandPalette();
   <HeaderSearch onClick={cmd.show} />
   <CommandPalette open={cmd.open} onClose={cmd.close} commands={[
     { group: 'Ir para', icon: 'receipt', label: 'Títulos', onSelect: () => navigate('/titulos') },
     { group: 'Ações', icon: 'moon', label: 'Alternar tema', keywords: 'escuro claro', onSelect: toggle }
   ]} />

   Teclado: ↑ ↓ navegam, Enter executa, Esc fecha. O foco fica preso na caixa
   enquanto aberta e volta para onde estava ao fechar. */
export function CommandPalette({
  open, onClose, commands = [],
  placeholder = 'Buscar tela ou ação…', emptyText = 'Nada encontrado.', label = 'Paleta de comandos'
}) {
  const [q, setQ] = useState('');
  const [hl, setHl] = useState(0);
  const boxRef = useOverlay(open, onClose);
  const ovRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => { if (open) { setQ(''); setHl(0); } }, [open]);
  /* inerte quando fechada (fora da ordem de Tab); em layout effect para já
     estar liberada quando o useOverlay for focar o campo */
  useIsoLayoutEffect(() => { if (ovRef.current) ovRef.current.inert = !open; }, [open]);

  const itens = useMemo(() => {
    const n = semAcento(q.trim());
    if (!n) return commands;
    /* procura no rótulo de origem e no traduzido: quem usa em inglês digita em inglês */
    return commands.filter(c => semAcento(`${c.label} ${t(c.label)} ${c.keywords || ''} ${c.group || ''} ${t(c.group || '')}`).includes(n));
  }, [commands, q]);
  const sel = Math.min(hl, Math.max(0, itens.length - 1));

  useEffect(() => {
    if (open) listRef.current?.querySelector('.hl')?.scrollIntoView({ block: 'nearest' });
  }, [open, sel, itens]);

  function executar(c) {
    if (!c) return;
    onClose?.();
    c.onSelect?.();
  }
  function onKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHl(itens.length ? (sel + 1) % itens.length : 0); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHl(itens.length ? (sel - 1 + itens.length) % itens.length : 0); }
    else if (e.key === 'Enter') { e.preventDefault(); executar(itens[sel]); }
  }

  if (typeof document === 'undefined') return null;
  let grupo = null;
  return createPortal(
    <div
      ref={ovRef}
      className={`cmd-ov ${open ? 'open' : ''}`.trim()}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div ref={boxRef} className="cmd-box" role="dialog" aria-modal="true" aria-label={label}>
        <div className="cmd-in">
          <i className="ti ti-search" />
          <input
            type="text" value={q} placeholder={placeholder} aria-label={placeholder}
            autoComplete="off" spellCheck={false}
            onChange={e => { setQ(e.target.value); setHl(0); }}
            onKeyDown={onKey}
          />
          <kbd className="cx-kbd">Esc</kbd>
        </div>
        <div className="cmd-list" ref={listRef} role="listbox">
          {itens.map((c, i) => {
            const cab = c.group && c.group !== grupo ? c.group : null;
            if (c.group) grupo = c.group;
            return (
              <div key={c.id ?? `${c.group || ''}:${c.label}`} style={{ display: 'contents' }}>
                {cab && <div className="cmd-grp">{cab}</div>}
                <button
                  type="button" role="option" aria-selected={i === sel} tabIndex={-1}
                  className={`cmd-it ${i === sel ? 'hl' : ''}`.trim()}
                  onMouseMove={() => { if (i !== sel) setHl(i); }}
                  onClick={() => executar(c)}
                >
                  {c.icon && <i className={`ti ti-${c.icon}`} />}
                  <span>{c.label}</span>
                  <kbd className="cx-kbd">Enter</kbd>
                </button>
              </div>
            );
          })}
          {!itens.length && <div className="cmd-vazio">{emptyText}</div>}
        </div>
        <div className="cmd-ft">
          <span><kbd className="cx-kbd">↑</kbd><kbd className="cx-kbd">↓</kbd> navegar</span>
          <span><kbd className="cx-kbd">Enter</kbd> abrir</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* Estado da paleta + atalho global Ctrl K / ⌘K.
   const { open, show, close, toggle } = useCommandPalette();
   Passe { shortcut: false } para não registrar o atalho. */
export function useCommandPalette({ shortcut = true } = {}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!shortcut) return;
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && typeof e.key === 'string' && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [shortcut]);
  const show = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen(o => !o), []);
  return { open, show, close, toggle };
}
