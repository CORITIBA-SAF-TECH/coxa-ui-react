import { useMemo, useRef, useState } from 'react';

/* Árvore: hierarquia que abre e fecha (centros de custo, pastas, permissões, organograma).

   const itens = [
     { id: 'fin', label: 'Financeiro', icon: 'building-bank', children: [
       { id: 'cr', label: 'Contas a receber', badge: 12 },
       { id: 'cp', label: 'Contas a pagar' }
     ] },
     { id: 'ti', label: 'Tecnologia', icon: 'device-desktop' }
   ];

   // Seleção de um item
   <Tree items={itens} selected={sel} onSelect={(id, item) => setSel(id)} defaultExpanded={['fin']} />

   // Com caixas de marcação (permissões): checked guarda os ids das FOLHAS marcadas;
   // o pai aparece marcado, parcial ou vazio conforme os filhos, e marcar o pai marca todos.
   <Tree items={itens} checkable checked={marcados} onCheckedChange={setMarcados} defaultExpandAll />

   item: { id, label, icon?, badge?, disabled?, children? }
   Abertos: defaultExpanded={[ids]} / defaultExpandAll, ou controlado com expanded + onExpandedChange.
   actions={item => <IconButton .../>} põe ações no fim da linha.
   Teclado: ↑ ↓ movem, → abre ou entra, ← fecha ou sobe, Home/End, Enter/Espaço seleciona ou marca. */

const folhasDe = no => (no.children && no.children.length ? no.children.flatMap(folhasDe) : (no.disabled ? [] : [no.id]));
const todosOsPais = (lista, acc = []) => {
  lista.forEach(n => { if (n.children && n.children.length) { acc.push(n.id); todosOsPais(n.children, acc); } });
  return acc;
};

export function Tree({
  items = [], selected, onSelect,
  expanded: controlado, defaultExpanded, defaultExpandAll = false, onExpandedChange,
  checkable = false, checked = [], onCheckedChange,
  actions, className = '', ...rest
}) {
  const [interno, setInterno] = useState(() => new Set(defaultExpandAll ? todosOsPais(items) : (defaultExpanded || [])));
  const abertos = useMemo(() => (controlado ? new Set(controlado) : interno), [controlado, interno]);
  const marcados = useMemo(() => new Set(checked), [checked]);
  const [foco, setFoco] = useState(null);
  const raiz = useRef(null);

  function alternar(id) {
    const n = new Set(abertos);
    n.has(id) ? n.delete(id) : n.add(id);
    if (!controlado) setInterno(n);
    onExpandedChange?.(Array.from(n));
  }

  /* Lista plana do que está visível, na ordem da tela: base da navegação por teclado */
  const visiveis = useMemo(() => {
    const out = [];
    (function andar(lista, nivel, pai) {
      lista.forEach(n => {
        const temFilhos = !!(n.children && n.children.length);
        out.push({ no: n, nivel, pai, temFilhos });
        if (temFilhos && abertos.has(n.id)) andar(n.children, nivel + 1, n.id);
      });
    })(items, 1, null);
    return out;
  }, [items, abertos]);

  const idFoco = visiveis.some(v => v.no.id === foco) ? foco : (visiveis.find(v => v.no.id === selected) || visiveis[0])?.no.id;

  function estadoDe(no) {
    const fs = folhasDe(no);
    if (!fs.length) return 'vazio';
    const n = fs.filter(id => marcados.has(id)).length;
    return n === 0 ? 'vazio' : n === fs.length ? 'todos' : 'parcial';
  }
  function marcar(no) {
    if (no.disabled) return;
    const fs = folhasDe(no);
    const n = new Set(marcados);
    if (estadoDe(no) === 'todos') fs.forEach(id => n.delete(id));
    else fs.forEach(id => n.add(id));
    onCheckedChange?.(Array.from(n));
  }
  function ativar(v) {
    if (v.no.disabled) return;
    if (checkable) marcar(v.no);
    else if (onSelect) onSelect(v.no.id, v.no);
    else if (v.temFilhos) alternar(v.no.id);
  }

  function focar(id) {
    setFoco(id);
    const el = raiz.current?.querySelector(`[data-tree-id="${CSS.escape(String(id))}"]`);
    el?.focus();
  }
  function tecla(e, v) {
    const i = visiveis.findIndex(x => x.no.id === v.no.id);
    const ir = j => { const alvo = visiveis[j]; if (alvo) { e.preventDefault(); focar(alvo.no.id); } };
    switch (e.key) {
      case 'ArrowDown': ir(i + 1); break;
      case 'ArrowUp': ir(i - 1); break;
      case 'Home': ir(0); break;
      case 'End': ir(visiveis.length - 1); break;
      case 'ArrowRight':
        if (v.temFilhos) { e.preventDefault(); if (!abertos.has(v.no.id)) alternar(v.no.id); else ir(i + 1); }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (v.temFilhos && abertos.has(v.no.id)) alternar(v.no.id);
        else if (v.pai !== null) focar(v.pai);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        ativar(v);
        break;
      default:
    }
  }

  function linha(n, nivel, pai) {
    const temFilhos = !!(n.children && n.children.length);
    const aberto = temFilhos && abertos.has(n.id);
    const v = { no: n, nivel, pai, temFilhos };
    const est = checkable ? estadoDe(n) : null;
    const sel = !checkable && selected === n.id;
    return (
      <li key={n.id} role="none">
        <div
          role="treeitem"
          data-tree-id={n.id}
          aria-level={nivel}
          aria-expanded={temFilhos ? aberto : undefined}
          aria-selected={checkable ? undefined : sel}
          aria-checked={checkable ? (est === 'parcial' ? 'mixed' : est === 'todos') : undefined}
          aria-disabled={n.disabled || undefined}
          tabIndex={n.id === idFoco ? 0 : -1}
          className={`tree-row ${sel ? 'selected' : ''} ${n.disabled ? 'disabled' : ''}`.replace(/\s+/g, ' ').trim()}
          style={{ '--lvl': nivel - 1 }}
          onClick={() => { setFoco(n.id); ativar(v); }}
          onFocus={() => setFoco(n.id)}
          onKeyDown={e => { if (e.target === e.currentTarget) tecla(e, v); }}
        >
          {temFilhos
            ? (
              <span className={`tree-tg ${aberto ? 'open' : ''}`.trim()} aria-hidden="true"
                onClick={e => { e.stopPropagation(); setFoco(n.id); alternar(n.id); }}>
                <i className="ti ti-chevron-right" />
              </span>
            )
            : <span className="tree-tg tree-tg-none" aria-hidden="true" />}
          {checkable && (
            <span className={`tree-chk ${est === 'todos' ? 'on' : est === 'parcial' ? 'mid' : ''}`.trim()} aria-hidden="true">
              {est === 'todos' && <i className="ti ti-check" />}
              {est === 'parcial' && <i className="ti ti-minus" />}
            </span>
          )}
          {n.icon && <i className={`ti ti-${n.icon} tree-ico`} aria-hidden="true" />}
          <span className="tree-lbl">{n.label}</span>
          {n.badge !== undefined && n.badge !== null && <span className="tree-badge">{n.badge}</span>}
          {actions && <span className="tree-acts" onClick={e => e.stopPropagation()}>{actions(n)}</span>}
        </div>
        {aberto && <ul role="group" className="tree-grp" style={{ '--lvl': nivel - 1 }}>{n.children.map(c => linha(c, nivel + 1, n.id))}</ul>}
      </li>
    );
  }

  return (
    <ul ref={raiz} role="tree" aria-multiselectable={checkable || undefined} className={`tree ${className}`.trim()} {...rest}>
      {items.map(n => linha(n, 1, null))}
    </ul>
  );
}
