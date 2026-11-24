/* Paginação. Controlada: page (1-based) + onChange.
   <Pagination page={p} total={240} perPage={20} onChange={setP} />
   Mostra no máximo `siblings` páginas de cada lado da atual, com reticências,
   setas de anterior/próxima e um resumo "X a Y de Z" (se showInfo). */
import { t, useI18n } from '../i18n/core.js';

export function Pagination({ page = 1, total = 0, perPage = 10, onChange, siblings = 1, showInfo = true }) {
  useI18n();   /* o resumo é montado com t(): redesenha quando o idioma muda */
  const pages = Math.max(1, Math.ceil(total / perPage));
  const go = p => { if (p >= 1 && p <= pages && p !== page) onChange?.(p); };

  const nums = [];
  const push = v => nums.push(v);
  const from = Math.max(2, page - siblings);
  const to = Math.min(pages - 1, page + siblings);
  push(1);
  if (from > 2) push('…');
  for (let i = from; i <= to; i++) push(i);
  if (to < pages - 1) push('…');
  if (pages > 1) push(pages);

  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(total, page * perPage);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
      {showInfo && <span className="pg-info">{t('{start} a {end} de {total}', { start, end, total })}</span>}
      <nav className="pagination" aria-label="Paginação">
        <button className="pg-btn" type="button" onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Anterior">
          <i className="ti ti-chevron-left" />
        </button>
        {nums.map((n, i) =>
          n === '…'
            ? <span key={`e${i}`} className="pg-ellipsis">…</span>
            : <button key={n} type="button" className={`pg-btn ${n === page ? 'active' : ''}`.trim()}
                onClick={() => go(n)} aria-current={n === page ? 'page' : undefined}>{n}</button>
        )}
        <button className="pg-btn" type="button" onClick={() => go(page + 1)} disabled={page >= pages} aria-label="Próxima">
          <i className="ti ti-chevron-right" />
        </button>
      </nav>
    </div>
  );
}
