import { forwardRef, useEffect, useRef, useState } from 'react';
import { Button } from './Button.jsx';

/* Botão de ação destrutiva: só confirma se ficar pressionado até o fim.
   Evita o clique acidental sem abrir um modal de confirmação.
   <HoldButton icon="trash" onConfirm={excluir}>Segure para excluir</HoldButton>
   Funciona com mouse, toque e teclado (segurar Espaço ou Enter).
   Aceita as props do <Button> (variant padrão: danger) e duration em ms. */
export const HoldButton = forwardRef(function HoldButton({
  onConfirm, duration = 1100, variant = 'danger', className = '', disabled, style, children, ...rest
}, ref) {
  const [segurando, setSegurando] = useState(false);
  const timer = useRef(0);
  const confirmar = useRef(onConfirm);
  confirmar.current = onConfirm;

  const soltar = () => {
    clearTimeout(timer.current);
    timer.current = 0;
    setSegurando(false);
  };
  const segurar = () => {
    if (disabled || timer.current) return;
    setSegurando(true);
    timer.current = setTimeout(() => { soltar(); confirmar.current?.(); }, duration);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <Button
      ref={ref}
      variant={variant}
      disabled={disabled}
      className={`btn-hold ${segurando ? 'holding' : ''} ${className}`.replace(/\s+/g, ' ').trim()}
      style={{ '--hold': `${duration}ms`, ...style }}
      onPointerDown={segurar}
      onPointerUp={soltar}
      onPointerLeave={soltar}
      onPointerCancel={soltar}
      onBlur={soltar}
      onKeyDown={e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); segurar(); } }}
      onKeyUp={soltar}
      onContextMenu={e => e.preventDefault()}
      {...rest}
    >
      {children}
    </Button>
  );
});
