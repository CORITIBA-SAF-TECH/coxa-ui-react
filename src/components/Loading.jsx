import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { COXA_LOGO } from '../assets/logo.js';
import { useIsoLayoutEffect } from '../hooks/useSlideIndicator.js';

/* Variações de carregamento (além do escudo): quantas peças <i> cada desenho usa.
   A mesma tabela serve ao showLoading(), que monta o desenho sem React. */
export const LOADER_PARTS = { ring: 0, dots: 3, bars: 4, pulse: 2, orbit: 2, linear: 1 };
const TAMANHOS = { sm: 18, md: 32, lg: 48 };
const px = (size, padrao) => (typeof size === 'number' ? size : TAMANHOS[size] || padrao);
const junta = (...c) => c.filter(Boolean).join(' ');

/* O carregamento do CoxaUI com o escudo do Coritiba pulsando dentro de um anel que gira.
   <LogoLoader />                      → 64 px
   <LogoLoader size={96} label="Carregando títulos..." />
   light: anel claro, para fundos escuros (é o que a <LoadingScreen> usa).
   logo troca a imagem (padrão: o escudo embutido na lib). */
export function LogoLoader({ size = 64, label, light = false, logo = COXA_LOGO, className = '' }) {
  return (
    <span className={junta('logo-ld', light && 'logo-ld-light', className)}
      role="status" aria-live="polite" aria-label={typeof label === 'string' ? label : 'Carregando'}>
      <span className="logo-ld-art" style={{ '--sz': `${px(size, 64)}px` }}>
        <span className="logo-ld-ring" />
        <img src={logo} alt="" />
      </span>
      {label && <span className="logo-ld-lbl">{label}</span>}
    </span>
  );
}

/* Carregamento em todas as variações.
   <Loader />                                   → anel (o carregamento normal)
   <Loader variant="dots" label="Buscando..." />
   <Loader variant="linear" />                  → barra indeterminada, ocupa a largura do container
   <Loader variant="logo" size={72} />          → o escudo (o mesmo que <LogoLoader>)

   variant: ring (padrão) | dots | bars | pulse | orbit | linear | logo
   size:    número em px ou sm (18) | md (32, padrão) | lg (48)
   row:     rótulo ao lado, em vez de embaixo (para usar dentro de uma linha)
   light:   cores claras, para fundos escuros */
export function Loader({ variant = 'ring', size, label, row = false, light = false, logo, className = '' }) {
  if (variant === 'logo') {
    return <LogoLoader size={size ?? 64} label={label} light={light} logo={logo || undefined} className={className} />;
  }
  const v = LOADER_PARTS[variant] === undefined ? 'ring' : variant;
  return (
    <span className={junta('ld', `ld-${v}`, row && 'ld-row', light && 'ld-light', className)}
      role="status" aria-live="polite" aria-label={typeof label === 'string' ? label : 'Carregando'}>
      <span className={`ld-art ld-a-${v}`} style={{ '--sz': `${px(size, 32)}px` }}>
        {Array.from({ length: LOADER_PARTS[v] }, (_, i) => <i key={i} />)}
      </span>
      {label && <span className="ld-lbl">{label}</span>}
    </span>
  );
}

/* Modal de carregamento: desfoca o fundo, bloqueia a interação e mostra o carregamento.
   <LoadingOverlay open={salvando} label="Salvando título..." />                 → escudo
   <LoadingOverlay open={salvando} variant="ring" label="Salvando..." />         → anel
   variant: logo (padrão) | ring | dots | bars | pulse | orbit | linear

   Por padrão cobre a tela inteira (portal no <body>). Com local, cobre só o container
   pai, que precisa ter position: relative (ex.: um cartão recarregando):
     <div style={{ position: 'relative' }}>
       <LoadingOverlay local open={recarregando} label="Atualizando..." />
       ...conteúdo...
     </div>
   Para disparar de qualquer lugar, sem estado: showLoading('Salvando...') (utils). */
export function LoadingOverlay({ open, label = 'Carregando...', variant = 'logo', local = false, size, logo, className = '' }) {
  const raiz = useRef(null);
  /* fechado, continua no DOM (para a transição): inert o tira do foco e do clique */
  useIsoLayoutEffect(() => { if (raiz.current) raiz.current.inert = !open; }, [open]);

  const tamanho = size ?? (variant === 'logo' ? (local ? 48 : 72) : (local ? 32 : 44));
  const no = (
    <div ref={raiz} className={junta('load-ov', local && 'load-ov-local', open && 'open', className)}
      aria-busy={open || undefined}>
      <div className={junta('load-box', variant === 'linear' && 'load-box-wide')}>
        {open && <Loader variant={variant} size={tamanho} label={label} logo={logo} />}
      </div>
    </div>
  );
  if (local) return no;
  if (typeof document === 'undefined') return null;
  return createPortal(no, document.body);
}
