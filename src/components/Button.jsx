import { forwardRef } from 'react';
import { resolveButtonIcon } from '../utils/buttonIcons.js';

const VARIANTS = {
  primary: 'btn-p',
  secondary: 'btn-s',
  danger: 'btn-d',      /* laranja: vermelho é proibido no projeto */
  warning: 'btn-w',
  accent: 'btn-acc',
  ghost: 'btn-ghost'
};
const SIZES = { xs: 'btn-xs', sm: 'btn-sm', lg: 'btn-lg' };

/* <Button variant="primary" size="sm" icon="check">Salvar</Button>
   Todo botão tem ícone. Sem a prop icon, ele é escolhido pelo rótulo
   ("Cancelar" → x, "Salvar" → check, "Voltar" → arrow-left…) e, sem rótulo
   conhecido, pela variante. icon={false} tira o ícone.
   loading troca o ícone por um spinner e desabilita o botão.
   Use as="a" href="..." (ou as={Link}) para renderizar como link.
   Aceita ref (encaminhado ao elemento raiz). */
export const Button = forwardRef(function Button({
  variant = 'primary', size, icon, loading = false, children,
  className = '', as: Tag = 'button', ...rest
}, ref) {
  const cls = ['btn', VARIANTS[variant] || VARIANTS.primary, SIZES[size] || '', loading ? 'btn-loading' : '', className]
    .filter(Boolean).join(' ');
  if (Tag === 'button' && rest.type === undefined) rest.type = 'button';
  if (loading) {
    rest['aria-busy'] = true;
    if (Tag === 'button') rest.disabled = true;
    else rest['aria-disabled'] = true;
  }
  const nome = loading ? 'loader-2' : resolveButtonIcon(icon, children, variant);
  return (
    <Tag ref={ref} className={cls} {...rest}>
      {nome && <i className={`ti ti-${nome}`} aria-hidden="true" />} {children}
    </Tag>
  );
});

export function ButtonGroup({ children }) {
  return <div className="btn-group">{children}</div>;
}

export const IconButton = forwardRef(function IconButton({ icon, className = '', ...rest }, ref) {
  return (
    <button ref={ref} className={`icon-btn ${className}`.trim()} type="button" {...rest}>
      <i className={`ti ti-${icon}`} />
    </button>
  );
});
