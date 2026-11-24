import { useCallback, useEffect, useState } from 'react';

const PRIV_ATTR = 'data-coxa-priv';
const EVENTO = 'coxa:priv';
const oculto = () => typeof document !== 'undefined' && document.documentElement.hasAttribute(PRIV_ATTR);

/* Modo privado: borra tudo que estiver em <Sensitive> (valores, documentos…).
   const { hidden, toggle, setHidden } = usePrivacy();
   O estado vive num atributo em <html>, então vale para a página toda e todas
   as instâncias do hook ficam sincronizadas. Não é persistido: cada carga
   começa com os valores visíveis (chame setHidden(true) no início para inverter). */
export function usePrivacy() {
  const [hidden, setState] = useState(oculto);
  useEffect(() => {
    const sync = () => setState(oculto());
    sync();
    window.addEventListener(EVENTO, sync);
    return () => window.removeEventListener(EVENTO, sync);
  }, []);
  const setHidden = useCallback(v => {
    document.documentElement.toggleAttribute(PRIV_ATTR, !!v);
    window.dispatchEvent(new Event(EVENTO));
  }, []);
  const toggle = useCallback(() => setHidden(!oculto()), [setHidden]);
  return { hidden, toggle, setHidden };
}

/* Botão de olho para o cabeçalho: liga e desliga o modo privado. */
export function PrivacyButton({ titleHide = 'Ocultar valores', titleShow = 'Mostrar valores', onChange }) {
  const { hidden, toggle } = usePrivacy();
  const rotulo = hidden ? titleShow : titleHide;
  return (
    <button
      className="icon-btn" type="button" title={rotulo} aria-label={rotulo} aria-pressed={hidden}
      onClick={() => { toggle(); onChange?.(!hidden); }}
    >
      <i className={`ti ${hidden ? 'ti-eye-off' : 'ti-eye'}`} />
    </button>
  );
}

/* Marca um trecho como sensível: <Sensitive>R$ 184.000,00</Sensitive>
   É um recurso de tela (evita olhar por cima do ombro e vazamento em
   compartilhamento de tela); o dado continua no DOM. */
export function Sensitive({ as: Tag = 'span', className = '', children, ...rest }) {
  return <Tag className={`sens ${className}`.trim()} {...rest}>{children}</Tag>;
}
