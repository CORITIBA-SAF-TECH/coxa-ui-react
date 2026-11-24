import { useEffect, useRef, useState } from 'react';
import { Button, IconButton } from './Button.jsx';
import { Loader } from './Loading.jsx';

/* Página de resultado: erro, acesso negado, sucesso, manutenção.
   <Result status="404" actions={<Button as="a" href="/">Início</Button>} />
   <Result status="success" title="Nota emitida">A NFS-e 1234 foi autorizada.</Result>
   status: 404 | 403 | 500 | offline | manutencao | success (ou passe icon/title próprios). */
const PRONTOS = {
  404: { icon: 'map-search', title: 'Página não encontrada', text: 'O endereço não existe ou foi movido.' },
  403: { icon: 'lock', title: 'Acesso negado', text: 'Você não tem permissão para ver esta página. Peça o acesso ao responsável pelo sistema.' },
  500: { icon: 'alert-triangle', title: 'Algo deu errado', text: 'Não foi possível concluir a operação. Tente de novo em instantes.' },
  offline: { icon: 'wifi-off', title: 'Sem conexão', text: 'Verifique a rede e tente de novo.' },
  manutencao: { icon: 'tool', title: 'Em manutenção', text: 'O sistema volta em breve.' },
  success: { icon: 'circle-check', title: 'Tudo certo', text: '' }
};
export function Result({ status, icon, title, children, actions, className = '' }) {
  const p = PRONTOS[status] || {};
  const texto = children ?? p.text;
  const ok = status === 'success';
  return (
    <div className={`err-page ${ok ? 'res-ok' : ''} ${className}`.replace(/\s+/g, ' ').trim()} role={ok ? 'status' : 'alert'}>
      <div className="err-ico"><i className={`ti ti-${icon || p.icon || 'info-circle'}`} aria-hidden="true" /></div>
      <h1>{title || p.title}</h1>
      {texto && <p>{texto}</p>}
      {actions && <div className="err-btns">{actions}</div>}
    </div>
  );
}

/* Tela cheia de carregamento (abertura do app, validação de sessão): fundo verde
   e o escudo do Coritiba pulsando dentro do anel.
   <LoadingScreen label="Validando sua sessão..." />
   logo troca a imagem (padrão: o escudo embutido na lib). variant troca o desenho:
   logo (padrão) | ring | dots | bars | pulse | orbit | linear.
   Para um carregamento por cima da tela já montada, use <LoadingOverlay> ou showLoading(). */
export function LoadingScreen({ logo, label = 'Carregando...', variant = 'logo', className = '' }) {
  return (
    <div className={`load-scr ${variant === 'linear' ? 'load-scr-wide' : ''} ${className}`.replace(/\s+/g, ' ').trim()}>
      <Loader light variant={variant} size={variant === 'logo' ? 112 : 64} logo={logo || undefined} label={label} />
    </div>
  );
}

/* Copia um texto e confirma no próprio botão.
   <CopyButton text={chave}>Copiar chave</CopyButton>
   <CopyButton text={codigo} />            → só o ícone
   Aceita as props do <Button> (padrão: variant="ghost" size="sm"). */
export function CopyButton({ text, children, copiedLabel = 'Copiado!', title = 'Copiar', onCopy, variant = 'ghost', size = 'sm', ...rest }) {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copiar() {
    const valor = typeof text === 'function' ? text() : String(text ?? '');
    try {
      await navigator.clipboard.writeText(valor);
    } catch {
      /* contexto sem Clipboard API (http): cai no método antigo */
      const ta = document.createElement('textarea');
      ta.value = valor;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } finally { ta.remove(); }
    }
    setCopiado(true);
    onCopy?.(valor);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiado(false), 1600);
  }

  const icone = copiado ? 'check' : 'copy';
  if (children === undefined || children === null) {
    return <IconButton icon={icone} title={copiado ? copiedLabel : title} aria-label={copiado ? copiedLabel : title} onClick={copiar} {...rest} />;
  }
  return (
    <Button variant={variant} size={size} icon={icone} onClick={copiar} {...rest}>
      {copiado ? copiedLabel : children}
    </Button>
  );
}

/* Tecla de atalho: <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> */
export function Kbd({ children, className = '' }) {
  return <kbd className={`cx-kbd ${className}`.trim()}>{children}</kbd>;
}
