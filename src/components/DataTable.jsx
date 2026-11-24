import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { TableWrap, Table, SortableTh } from './Table.jsx';
import { Pagination } from './Pagination.jsx';
import { Popover } from './Popover.jsx';
import { t, useI18n } from '../i18n/core.js';

/* ── Filtro por coluna, no cabeçalho ── */

/* "Não informada" e "nao informada" são a mesma coisa para quem filtra */
const normalizar = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const filtroVazio = v => v === '' || v === null || v === undefined || (typeof v === 'object' && !v.from && !v.to);
const dataCurta = iso => { const [a, m, d] = String(iso).slice(0, 10).split('-'); return `${d}/${m}/${a.slice(2)}`; };

/* O filtro de uma coluna, já com os padrões preenchidos (ou null, se ela não filtra).
   `todas`: a tabela pediu filtro em todas as colunas (columnFilters). */
function specDoFiltro(col, todas) {
  const f = col.filter;
  if (f === false) return null;
  if ((f === undefined || f === null) && !todas) return null;
  if (col.label === '' || col.label === null || col.label === undefined) return null;   /* coluna de ações */
  const base = f && typeof f === 'object' ? f : { type: typeof f === 'string' ? f : 'text' };
  return {
    type: base.type || 'text',
    value: base.value || (row => (col.exportValue ? col.exportValue(row) : row[col.key])),
    label: base.label || (v => String(v)),
    options: base.options || null,
    placeholder: base.placeholder
  };
}

function passaNoFiltro(spec, row, valor) {
  const bruto = spec.value(row);
  if (spec.type === 'date') {
    const datas = [].concat(bruto).filter(Boolean).map(d => String(d).slice(0, 10));
    return datas.some(d => (!valor.from || d >= valor.from) && (!valor.to || d <= valor.to));
  }
  if (spec.type === 'select') return [].concat(bruto).some(v => String(v ?? '') === String(valor));
  const alvo = normalizar(valor);
  return normalizar(bruto).includes(alvo) || (typeof bruto === 'string' && normalizar(t(bruto)).includes(alvo));
}

function ColFilter({ col, spec, value, onChange, options }) {
  const nome = typeof col.label === 'string' ? t(col.label) : col.key;
  if (spec.type === 'select') {
    return (
      <select className={`dt-flt ${value ? 'active' : ''}`.trim()} value={value ?? ''} aria-label={t('Filtrar {nome}', { nome })}
        onChange={e => onChange(e.target.value)}>
        <option value="">{spec.placeholder || 'Todos'}</option>
        {options.map(o => <option key={String(o.value)} value={String(o.value)}>{o.label}</option>)}
      </select>
    );
  }
  if (spec.type === 'date') {
    const v = value && typeof value === 'object' ? value : { from: '', to: '' };
    const ativo = !!(v.from || v.to);
    const texto = !ativo ? (spec.placeholder || 'Período...')
      : v.from && v.to ? t('{de} a {ate}', { de: dataCurta(v.from), ate: dataCurta(v.to) })
        : v.from ? t('desde {data}', { data: dataCurta(v.from) }) : t('até {data}', { data: dataCurta(v.to) });
    return (
      <Popover title={t('Período de {nome}', { nome })} icon="calendar" width={230}
        trigger={(
          <button type="button" className={`dt-flt dt-flt-btn ${ativo ? 'active' : ''}`.trim()} aria-label={t('Filtrar {nome} por período', { nome })}>
            <i className="ti ti-calendar" aria-hidden="true" /> <span>{texto}</span>
          </button>
        )}>
        <div className="dt-flt-pop">
          <label>De<input type="date" value={v.from || ''} max={v.to || undefined} onChange={e => onChange({ ...v, from: e.target.value })} /></label>
          <label>Até<input type="date" value={v.to || ''} min={v.from || undefined} onChange={e => onChange({ ...v, to: e.target.value })} /></label>
          {ativo && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange('')}>
              <i className="ti ti-x" aria-hidden="true" /> Limpar período
            </button>
          )}
        </div>
      </Popover>
    );
  }
  return (
    <input type="text" className={`dt-flt ${value ? 'active' : ''}`.trim()} value={value ?? ''} aria-label={t('Filtrar {nome}', { nome })}
      placeholder={spec.placeholder || 'Filtrar...'} onChange={e => onChange(e.target.value)} />
  );
}

/* Popover leve (não fecha ao clicar dentro: para os checkboxes). */
function DtMenu({ label, icon, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return (
    <span className="dt-menu-wrap" ref={ref}>
      <button type="button" className="btn btn-s btn-sm" onClick={() => setOpen(o => !o)} aria-haspopup="true" aria-expanded={open}>
        {icon && <i className={`ti ti-${icon}`} />} {label}
      </button>
      {open && <div className="dt-menu" onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>{children}</div>}
    </span>
  );
}

function cellValue(col, row) {
  if (col.exportValue) return col.exportValue(row);
  return row[col.key];
}
function sortValue(col, row) {
  if (col.sortValue) return col.sortValue(row);
  return row[col.key];
}

function toCSV(rows, cols) {
  const esc = v => {
    const s = v == null ? '' : String(v);
    return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const head = cols.map(c => esc(c.label)).join(';');
  const body = rows.map(r => cols.map(c => esc(cellValue(c, r))).join(';'));
  return '﻿' + [head, ...body].join('\r\n'); /* BOM para acentos no Excel */
}

function download(name, text) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

/* Tabela padrão do CoxaUI: ordenação, paginação, seleção de colunas visíveis
   e exportação CSV (com escolha de colunas) já embutidas.

   const columns = [
     { key: 'nome', label: 'Nome', render: r => <strong>{r.nome}</strong> },
     { key: 'loc', label: 'Localidade' },
     { key: 'visitas', label: 'Visitas' },
   ];
   <DataTable columns={columns} data={rows} perPage={10} searchable exportName="visitantes.csv" />

   Por coluna: sortable (padrão true), render(row), sortValue(row), exportValue(row),
   exportable (entra no CSV; padrão true), className/thClassName.
   Recursos ligados por padrão; desligue com sortable={false}, columns-toggle={false}, exportable={false}.

   Linha expansível: detail={row => <Detalhe row={row} />} cria uma coluna com a seta e abre
   o detalhe embaixo da linha. render e detail recebem um segundo argumento { open, toggle },
   para abrir pelo próprio conteúdo (ex.: clicar no nome). detailToggle={false} tira a coluna
   da seta. rowClassName={row => 'row-pend'} dá classe à linha.

   Filtro no cabeçalho: uma segunda linha do cabeçalho, com um campo por coluna.
     <DataTable columnFilters ... />            → todas as colunas ganham filtro de texto
     { key: 'situacao', label: 'Situação', filter: 'select' }   → lista com os valores que a tabela tem
     { key: 'venc', label: 'Vencimento', filter: 'date' }       → período De/Até (valores AAAA-MM-DD)
     { key: 'acoes', label: 'Ações', filter: false }            → sem filtro
     filter: { type: 'text' | 'select' | 'date', value: row => texto, label: v => rótulo,
               options: [...], placeholder }    → quando o que a célula mostra não é o valor bruto
   Sem columnFilters, só filtram as colunas que declararem filter. Texto é "contém", sem
   acento nem caixa. Os filtros valem junto com a busca, a ordenação, a paginação e o CSV.
   initialFilters={{ situacao: 'Aberto' }} já abre filtrado; onFiltersChange avisa o app. */
export function DataTable({
  columns = [], data = [], rowKey,
  perPage, searchable = false, searchPlaceholder = 'Filtrar...',
  exportable = true, exportName = 'tabela.csv', columnsToggle = true,
  initialSort = null, empty = 'Nada encontrado.', toolbar,
  detail, detailToggle = true, rowClassName,
  columnFilters = false, initialFilters, onFiltersChange
}) {
  useI18n();   /* há textos montados com t(): redesenha quando o idioma muda */
  const [abertas, setAbertas] = useState(() => new Set());
  function alternarDetalhe(k) {
    setAbertas(s => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });
  }
  const comSeta = !!detail && detailToggle;
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [hidden, setHidden] = useState(() => new Set());
  const [exportCols, setExportCols] = useState(() => new Set(columns.filter(c => c.exportable !== false).map(c => c.key)));

  const keyOf = (row, i) => (rowKey ? rowKey(row) : (row.id != null ? row.id : i));
  const isSortable = c => c.sortable !== false;

  /* Filtros por coluna */
  const [filters, setFilters] = useState(() => initialFilters || {});
  const especs = useMemo(
    () => Object.fromEntries(columns.map(c => [c.key, specDoFiltro(c, columnFilters)])),
    [columns, columnFilters]
  );
  const ativos = useMemo(
    () => Object.entries(filters).filter(([k, v]) => especs[k] && !filtroVazio(v)),
    [filters, especs]
  );
  /* opções dos filtros de lista: as declaradas ou os valores distintos que a tabela tem */
  const opcoes = useMemo(() => {
    const out = {};
    columns.forEach(c => {
      const e = especs[c.key];
      if (!e || e.type !== 'select') return;
      if (e.options) {
        out[c.key] = e.options.map(o => (o && typeof o === 'object' ? o : { value: o, label: e.label(o) }));
        return;
      }
      const vistos = new Set();
      data.forEach(r => [].concat(e.value(r)).forEach(v => { if (v !== null && v !== undefined && v !== '') vistos.add(String(v)); }));
      out[c.key] = Array.from(vistos)
        .sort((a, b) => a.localeCompare(b, 'pt', { numeric: true, sensitivity: 'base' }))
        .map(v => ({ value: v, label: e.label(v) }));
    });
    return out;
  }, [columns, especs, data]);

  function mudarFiltro(key, valor) {
    const prox = { ...filters, [key]: valor };
    setFilters(prox);
    setPage(1);
    onFiltersChange?.(prox);
  }
  function limparFiltros() {
    setFilters({});
    setQ('');
    setPage(1);
    onFiltersChange?.({});
  }

  const filtered = useMemo(() => {
    let out = data;
    if (searchable && q) {
      const nq = q.toLowerCase();
      out = out.filter(r => columns.some(c => {
        const v = String(cellValue(c, r) ?? '');
        return v.toLowerCase().includes(nq) || t(v).toLowerCase().includes(nq);
      }));
    }
    if (ativos.length) out = out.filter(r => ativos.every(([k, v]) => passaNoFiltro(especs[k], r, v)));
    return out;
  }, [data, q, searchable, columns, ativos, especs]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find(c => c.key === sort.field);
    if (!col) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const x = sortValue(col, a), y = sortValue(col, b);
      if (x == null) return 1;
      if (y == null) return -1;
      let r;
      if (typeof x === 'number' && typeof y === 'number') r = x - y;
      else r = String(x).localeCompare(String(y), 'pt', { numeric: true, sensitivity: 'base' });
      return sort.dir === 'asc' ? r : -r;
    });
    return arr;
  }, [filtered, sort, columns]);

  const totalPages = perPage ? Math.max(1, Math.ceil(sorted.length / perPage)) : 1;
  const curPage = Math.min(page, totalPages);
  const rows = perPage ? sorted.slice((curPage - 1) * perPage, curPage * perPage) : sorted;

  const visibleCols = columns.filter(c => !hidden.has(c.key));

  function toggleSort(field) {
    setSort(s => (s && s.field === field ? { field, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { field, dir: 'asc' }));
  }
  function toggleHidden(key) {
    setHidden(h => { const n = new Set(h); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }
  function toggleExport(key) {
    setExportCols(s => { const n = new Set(s); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }
  function doExport() {
    const cols = columns.filter(c => exportCols.has(c.key));
    if (!cols.length) return;
    download(exportName, toCSV(sorted, cols)); /* exporta tudo (filtrado/ordenado), não só a página */
  }

  const temFiltro = visibleCols.some(c => especs[c.key]);
  const filtrando = ativos.length > 0 || (searchable && !!q);
  const showToolbar = searchable || columnsToggle || exportable || toolbar || ativos.length > 0;

  return (
    <div>
      {showToolbar && (
        <div className="dt-toolbar">
          {searchable && (
            <input type="text" value={q} placeholder={searchPlaceholder}
              onChange={e => { setQ(e.target.value); setPage(1); }} style={{ maxWidth: 240 }} />
          )}
          {toolbar}
          {ativos.length > 0 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={limparFiltros}>
              <i className="ti ti-filter-off" aria-hidden="true" /> {t('Limpar filtros ({n})', { n: ativos.length })}
            </button>
          )}
          <span className="dt-toolbar-spacer" />
          {columnsToggle && (
            <DtMenu label="Colunas" icon="columns">
              <div className="dt-menu-lbl">Colunas visíveis</div>
              {columns.map(c => (
                <label key={c.key}>
                  <input type="checkbox" checked={!hidden.has(c.key)} onChange={() => toggleHidden(c.key)} />
                  {c.label}
                </label>
              ))}
            </DtMenu>
          )}
          {exportable && (
            <DtMenu label="Exportar CSV" icon="download">
              <div className="dt-menu-lbl">Colunas no CSV</div>
              {columns.map(c => (
                <label key={c.key}>
                  <input type="checkbox" checked={exportCols.has(c.key)} onChange={() => toggleExport(c.key)} />
                  {c.label}
                </label>
              ))}
              <div className="dt-menu-sep" />
              <div className="dt-menu-act">
                <button type="button" className="btn btn-p btn-sm" style={{ width: '100%' }} onClick={doExport}>
                  <i className="ti ti-file-download" /> Baixar CSV
                </button>
              </div>
            </DtMenu>
          )}
        </div>
      )}

      <TableWrap>
        <Table>
          <thead>
            <tr>
              {comSeta && <th className="dt-exp-cell"><span className="sr-only">Detalhes</span></th>}
              {visibleCols.map(c => (
                isSortable(c)
                  ? <SortableTh key={c.key} field={c.key} sort={sort} onSort={toggleSort} className={c.thClassName}>{c.label}</SortableTh>
                  : <th key={c.key} className={c.thClassName}>{c.label}</th>
              ))}
            </tr>
            {temFiltro && (
              <tr className="dt-filters">
                {comSeta && <th className="dt-exp-cell" />}
                {visibleCols.map(c => (
                  <th key={c.key} className={c.thClassName}>
                    {especs[c.key] && (
                      <ColFilter col={c} spec={especs[c.key]} value={filters[c.key]} options={opcoes[c.key] || []}
                        onChange={v => mudarFiltro(c.key, v)} />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={visibleCols.length + (comSeta ? 1 : 0)} style={{ textAlign: 'center', color: 'var(--text3)', padding: '18px' }}>{empty}</td></tr>
            )}
            {rows.map((r, i) => {
              const k = keyOf(r, i);
              const open = !!detail && abertas.has(k);
              const ajuda = { open, toggle: () => alternarDetalhe(k) };
              const cls = [rowClassName?.(r) || '', open ? 'dt-open' : ''].filter(Boolean).join(' ') || undefined;
              return (
                <Fragment key={k}>
                  <tr className={cls}>
                    {comSeta && (
                      <td className="dt-exp-cell">
                        <button type="button" className="dt-exp-btn" onClick={ajuda.toggle}
                          aria-expanded={open} aria-label={open ? 'Fechar detalhes' : 'Ver detalhes'}>
                          <i className="ti ti-chevron-right" aria-hidden="true" />
                        </button>
                      </td>
                    )}
                    {visibleCols.map(c => (
                      <td key={c.key} className={c.className}>{c.render ? c.render(r, ajuda) : r[c.key]}</td>
                    ))}
                  </tr>
                  {open && (
                    <tr className="dt-detail">
                      <td colSpan={visibleCols.length + (comSeta ? 1 : 0)}>{detail(r, ajuda)}</td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </TableWrap>

      {filtrando && (
        <p className="dt-count" role="status">
          {data.length === 1 ? t('{n} de {total} linha', { n: sorted.length, total: data.length }) : t('{n} de {total} linhas', { n: sorted.length, total: data.length })}
        </p>
      )}

      {perPage && sorted.length > perPage && (
        <div style={{ marginTop: 12 }}>
          <Pagination page={curPage} total={sorted.length} perPage={perPage} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
