import { useRef, useState } from 'react';
import { t } from '../i18n/core.js';

/* Área de upload com clique e arrastar-e-soltar.
   <FileUpload accept=".pdf,.png" hint="PDF, PNG até 50MB" onChange={files => ...} />
   Controlado ou não: passa File[] em onChange. multiple opcional. */
export function FileUpload({ accept, multiple = false, hint, label = 'Clique ou arraste um arquivo aqui', onChange }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([]);

  function handle(list) {
    const arr = Array.from(list || []);
    if (!arr.length) return;
    setFiles(arr);
    onChange?.(multiple ? arr : arr.slice(0, 1));
  }
  function clear(e) {
    e.stopPropagation();
    setFiles([]);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.([]);
  }

  return (
    <div>
      <div
        className={`file-input ${drag ? 'dragging' : ''}`.trim()}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files); }}
      >
        <i className="ti ti-upload" style={{ fontSize: '1.4rem', marginBottom: 6, display: 'block' }} />
        {label}
        {hint && <><br /><span style={{ fontSize: '.75rem', color: 'var(--text3)' }}>{hint}</span></>}
      </div>
      {files.length > 0 && (
        <div className="file-input-file">
          <i className="ti ti-file" />
          <span translate={files.length === 1 ? 'no' : undefined}>{files.length === 1 ? files[0].name : t('{n} arquivos', { n: files.length })}</span>
          <button type="button" onClick={clear} aria-label="Remover"><i className="ti ti-x" /></button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={e => handle(e.target.files)}
      />
    </div>
  );
}
