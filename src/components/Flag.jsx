/* Bandeiras em SVG, para o seletor de idioma.
   <Flag country="br" />   → br (Brasil), es (Espanha), us (Estados Unidos)

   Emoji de bandeira não serve: o Windows não os desenha (mostra as letras do país).
   O desenho é simplificado para ler bem em 20 px (sem brasão nem estrelas detalhadas),
   todas na mesma proporção. As cores são as oficiais de cada bandeira: é o único lugar
   da biblioteca em que o vermelho aparece, porque faz parte do símbolo do país. */
const DESENHOS = {
  br: (
    <>
      <path fill="#009739" d="M0 0h20v14H0z" />
      <path fill="#FEDD00" d="M1.7 7 10 1.7 18.3 7 10 12.3z" />
      <circle cx="10" cy="7" r="3.5" fill="#012169" />
      <path fill="none" stroke="#fff" strokeWidth=".5" d="M6.78 5.88A8.25 8.25 0 0 1 13.32 7.72" />
    </>
  ),
  es: (
    <>
      <path fill="#AA151B" d="M0 0h20v14H0z" />
      <path fill="#F1BF00" d="M0 3.5h20v7H0z" />
    </>
  ),
  us: (
    <>
      <path fill="#fff" d="M0 0h20v14H0z" />
      <path stroke="#B22234" strokeWidth="1.077" d="M0 .54h20M0 2.69h20M0 4.85h20M0 7h20M0 9.15h20M0 11.31h20M0 13.46h20" />
      <path fill="#3C3B6E" d="M0 0h8v7.54H0z" />
      <path stroke="#fff" strokeWidth=".8" strokeLinecap="round"
        d="M1.33 1.25h.01M4 1.25h.01M6.67 1.25h.01M2.67 2.5h.01M5.33 2.5h.01M1.33 3.77h.01M4 3.77h.01M6.67 3.77h.01M2.67 5.03h.01M5.33 5.03h.01M1.33 6.28h.01M4 6.28h.01M6.67 6.28h.01" />
    </>
  )
};

export function Flag({ country, className = '', ...rest }) {
  const desenho = DESENHOS[String(country || '').toLowerCase()];
  if (!desenho) return null;
  return (
    <svg className={`cx-flag ${className}`.trim()} viewBox="0 0 20 14" width="20" height="14"
      aria-hidden="true" focusable="false" {...rest}>
      {desenho}
    </svg>
  );
}
