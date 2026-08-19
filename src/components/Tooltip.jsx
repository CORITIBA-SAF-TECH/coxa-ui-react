/* Tooltip simples no hover (aparece acima do elemento).
   <Tooltip text="Texto de ajuda"><Button>Passe o mouse</Button></Tooltip> */
export function Tooltip({ text, children, className = '' }) {
  return (
    <span className={`tooltip-wrap ${className}`.trim()}>
      {children}
      <span className="tooltip-tip" role="tooltip">{text}</span>
    </span>
  );
}
