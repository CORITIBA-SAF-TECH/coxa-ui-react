import { t } from '../i18n/core.js';

const ICONES = {
  pdf: 'file-type-pdf', doc: 'file-type-doc', docx: 'file-type-docx', xls: 'file-type-xls', xlsx: 'file-type-xls',
  csv: 'file-type-csv', ppt: 'file-type-ppt', pptx: 'file-type-ppt', txt: 'file-text', xml: 'file-code', json: 'file-code',
  zip: 'file-zip', rar: 'file-zip', '7z': 'file-zip',
  png: 'photo', jpg: 'photo', jpeg: 'photo', gif: 'photo', webp: 'photo', svg: 'photo', bmp: 'photo',
  mp4: 'movie', mov: 'movie', mp3: 'music', wav: 'music', eml: 'mail', msg: 'mail'
};

const extDe = nome => {
  const m = /\.([a-z0-9]+)$/i.exec(String(nome || ''));
  return m ? m[1].toLowerCase() : '';
};

/* formatBytes(1536) → '1,5 KB' */
export function formatBytes(bytes) {
  const n = Number(bytes);
  if (bytes === null || bytes === undefined || bytes === '' || Number.isNaN(n) || n < 0) return '';
  const un = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0, v = n;
  while (v >= 1024 && i < un.length - 1) { v /= 1024; i++; }
  const txt = i === 0 ? String(Math.round(v)) : v.toFixed(v < 10 ? 1 : 0).replace('.', ',');
  return `${txt} ${un[i]}`;
}

/* Lista de anexos: ícone pelo tipo, nome, tamanho, abrir/baixar e remover.
   <AttachmentList items={anexos} onRemove={a => excluir(a.id)} />
   item: { name, size? (bytes), url?, meta? (texto extra), icon?, id? }
   - com url, o nome é um link (abre em nova guia); onOpen(item, evento) intercepta o clique
     (ex.: abrir imagem num visualizador) — chame evento.preventDefault() para não seguir o link;
   - onRemove mostra o botão de remover; removable={item => bool} limita quais podem sair;
   - compact deixa uma linha por anexo (para colunas estreitas). */
export function AttachmentList({ items = [], onRemove, onOpen, removable, compact, empty = null, className = '' }) {
  if (!items.length) return empty;
  return (
    <ul className={`att-list ${compact ? 'att-compact' : ''} ${className}`.replace(/\s+/g, ' ').trim()}>
      {items.map((a, i) => {
        const icone = a.icon || ICONES[extDe(a.name)] || 'file';
        const extra = [formatBytes(a.size), a.meta].filter(Boolean).join(' · ');
        const corpo = (
          <>
            <i className={`ti ti-${icone}`} aria-hidden="true" />
            <span className="att-txt">
              <span className="att-name" translate="no">{a.name}</span>
              {extra && <span className="att-meta">{extra}</span>}
            </span>
          </>
        );
        const podeTirar = onRemove && (removable ? removable(a) : true);
        return (
          <li key={a.id ?? a.url ?? `${a.name}-${i}`} className="att-item">
            {a.url
              ? <a className="att-main" href={a.url} target="_blank" rel="noopener noreferrer" onClick={onOpen ? e => onOpen(a, e) : undefined}>{corpo}</a>
              : onOpen
                ? <button type="button" className="att-main" onClick={e => onOpen(a, e)}>{corpo}</button>
                : <span className="att-main">{corpo}</span>}
            {podeTirar && (
              <button type="button" className="att-rm" onClick={() => onRemove(a)} aria-label={t('Remover {nome}', { nome: a.name })} title="Remover">
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
