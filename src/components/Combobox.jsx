import { useEffect, useMemo, useRef, useState } from 'react';

function norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* Select com busca: o usuário digita e as opções são filtradas
   (ignora acentos). Teclado: ↑/↓ navegam, Enter seleciona, Esc fecha.

   options: array de strings ou de { label, value }
   <Combobox options={deptos} value={valor} onChange={setValor} name="depto" />
   Se `name` for passado, um input hidden recebe o value (para forms). */
export function Combobox({
  options = [], value, onChange, name,
  placeholder = 'Selecione ou digite...',
  emptyText = 'Nenhuma opção encontrada'
}) {
  const opts = useMemo(
    () => options.map(o => (typeof o === 'object' ? o : { label: String(o), value: o })),
    [options]
  );
  const selected = opts.find(o => o.value === value);
  const [text, setText] = useState(selected ? selected.label : '');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hl, setHl] = useState(-1);
  const rootRef = useRef(null);

  /* sincroniza o texto quando o value muda por fora */
  useEffect(() => {
    const sel = opts.find(o => o.value === value);
    if (sel) setText(sel.label);
    else if (value == null || value === '') setText('');
  }, [value, opts]);

  /* fecha ao clicar fora */
  useEffect(() => {
    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const visible = opts.filter(o => !query || norm(o.label).includes(norm(query)));

  function pick(opt) {
    setText(opt.label);
    setQuery('');
    setOpen(false);
    setHl(-1);
    onChange?.(opt.value, opt);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'Enter') {
      if (open && (hl >= 0 || visible.length === 1)) {
        e.preventDefault();
        pick(visible[hl >= 0 ? hl : 0]);
      }
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    setOpen(true);
    if (!visible.length) return;
    setHl(i => e.key === 'ArrowDown' ? Math.min(i + 1, visible.length - 1) : Math.max(i - 1, 0));
  }

  return (
    <div className={`combo ${open ? 'open' : ''}`.trim()} ref={rootRef}>
      <input
        type="text"
        className="combo-input"
        placeholder={placeholder}
        autoComplete="off"
        value={text}
        onFocus={e => { setOpen(true); setQuery(''); e.target.select(); }}
        onChange={e => { setText(e.target.value); setQuery(e.target.value.trim()); setOpen(true); setHl(-1); }}
        onKeyDown={onKeyDown}
      />
      {name && <input type="hidden" name={name} value={value ?? ''} />}
      <i className="ti ti-chevron-down combo-arrow" />
      <div className="combo-list">
        {visible.map((o, i) => (
          <button
            type="button"
            key={o.value ?? o.label}
            className={`combo-opt ${i === hl ? 'hl' : ''}`.trim()}
            onClick={() => pick(o)}
            onMouseEnter={() => setHl(i)}
          >
            {o.label}
          </button>
        ))}
        {!visible.length && <div className="combo-empty" style={{ display: 'block' }}>{emptyText}</div>}
      </div>
    </div>
  );
}

/* Combobox de seleção múltipla: as escolhas viram chips removíveis.
   value é um array; onChange recebe o novo array de valores.

   <MultiCombobox options={tags} value={sel} onChange={setSel} name="tags" />
   Com `name`, gera um <input type="hidden"> por valor selecionado (para forms). */
export function MultiCombobox({
  options = [], value = [], onChange, name,
  placeholder = 'Selecione...',
  emptyText = 'Nenhuma opção encontrada'
}) {
  const opts = useMemo(
    () => options.map(o => (typeof o === 'object' ? o : { label: String(o), value: o })),
    [options]
  );
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hl, setHl] = useState(-1);
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) { setOpen(false); setQuery(''); }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const isSel = v => value.some(x => x === v);
  const selectedOpts = opts.filter(o => isSel(o.value));
  const visible = opts.filter(o => !query || norm(o.label).includes(norm(query)));

  function toggle(opt) {
    const next = isSel(opt.value) ? value.filter(v => v !== opt.value) : [...value, opt.value];
    onChange?.(next);
    setQuery('');
    inputRef.current?.focus();
  }
  function removeAt(v) { onChange?.(value.filter(x => x !== v)); }

  function onKeyDown(e) {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'Backspace' && !query && value.length) { removeAt(value[value.length - 1]); return; }
    if (e.key === 'Enter') {
      if (open && (hl >= 0 || visible.length === 1)) { e.preventDefault(); toggle(visible[hl >= 0 ? hl : 0]); }
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    setOpen(true);
    if (!visible.length) return;
    setHl(i => e.key === 'ArrowDown' ? Math.min(i + 1, visible.length - 1) : Math.max(i - 1, 0));
  }

  return (
    <div className={`combo combo-multi ${open ? 'open' : ''}`.trim()} ref={rootRef}>
      <div className="combo-control" onClick={() => { setOpen(true); inputRef.current?.focus(); }}>
        {selectedOpts.map(o => (
          <span className="combo-chip" key={o.value ?? o.label}>
            {o.label}
            <button type="button" onClick={e => { e.stopPropagation(); removeAt(o.value); }} aria-label={`Remover ${o.label}`}>
              <i className="ti ti-x" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="combo-input"
          placeholder={selectedOpts.length ? '' : placeholder}
          autoComplete="off"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={e => { setQuery(e.target.value); setOpen(true); setHl(-1); }}
          onKeyDown={onKeyDown}
        />
      </div>
      {name && value.map(v => <input key={v} type="hidden" name={name} value={v} />)}
      <i className="ti ti-chevron-down combo-arrow" />
      <div className="combo-list">
        {visible.map((o, i) => (
          <button
            type="button"
            key={o.value ?? o.label}
            className={`combo-opt ${i === hl ? 'hl' : ''} ${isSel(o.value) ? 'selected' : ''}`.trim()}
            onClick={() => toggle(o)}
            onMouseEnter={() => setHl(i)}
          >
            {o.label}
          </button>
        ))}
        {!visible.length && <div className="combo-empty" style={{ display: 'block' }}>{emptyText}</div>}
      </div>
    </div>
  );
}
