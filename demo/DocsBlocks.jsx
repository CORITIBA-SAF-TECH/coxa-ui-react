import { useState } from 'react';

/* Seção da documentação com âncora, título e descrição */
export function DocsSection({ id, icon, title, desc, children }) {
  return (
    <div className="docs-section" id={id}>
      <div className="docs-section-title">
        {icon && <i className={`ti ti-${icon}`} />} {title}
      </div>
      {desc && <p className="docs-section-desc">{desc}</p>}
      {children}
    </div>
  );
}

export function SubSection({ title, children }) {
  return (
    <div className="docs-subsection">
      {title && <div className="docs-subsection-title">{title}</div>}
      {children}
    </div>
  );
}

/* Demo ao vivo + barra "Ver código / Copiar".
   <Demo code={`<Button>Salvar</Button>`}> <Button>Salvar</Button> </Demo> */
export function Demo({ code, exampleClass = '', exampleStyle, children }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <>
      <div className={`docs-example ${exampleClass}`.trim()} style={exampleStyle}>{children}</div>
      {code && (
        <>
          <div className="code-bar">
            <button className="code-toggle-btn" onClick={() => setOpen(o => !o)} type="button">
              <i className="ti ti-code" /> {open ? 'Ocultar código' : 'Ver código'}
            </button>
            <button className="code-copy-btn" onClick={copy} type="button">
              <i className={`ti ${copied ? 'ti-check' : 'ti-copy'}`} /> {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className={`code-block-wrap ${open ? 'open' : ''}`.trim()}>
            <pre className="code-block">{code}</pre>
          </div>
        </>
      )}
    </>
  );
}

/* Bloco de código sempre visível (instalação etc.) */
export function CodeBlock({ children }) {
  return <pre className="code-block" style={{ borderRadius: 'var(--radius)', border: 'none' }}>{children}</pre>;
}

export function Swatch({ color, name, varName }) {
  return (
    <div className="color-swatch">
      <div className="color-swatch-sample" style={{ background: color }} />
      <div className="color-swatch-info">
        <div className="color-swatch-name">{name}</div>
        <div className="color-swatch-var">{varName}</div>
        <div className="color-swatch-var">{color}</div>
      </div>
    </div>
  );
}
