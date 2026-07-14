import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

/* Paleta oficial dos gráficos — todas variações do verde primary,
   alternando tons escuros e claros para contraste (nunca vermelho). */
export const COXA_CHART_COLORS = [
  '#006B3C', /* verde Coritiba (primary) */
  '#34d399', /* esmeralda claro          */
  '#004526', /* verde escuro             */
  '#6ee7b7', /* esmeralda mais claro     */
  '#059669', /* esmeralda médio          */
  '#a7f3d0', /* verde pastel             */
  '#065f46', /* verde profundo           */
  '#10b981'  /* esmeralda                */
];

function theme() {
  const dark = document.documentElement.classList.contains('dark');
  return {
    text: dark ? '#d1d5db' : '#4b5563',
    grid: dark ? 'rgba(255,255,255,.09)' : 'rgba(0,0,0,.07)',
    ring: dark ? '#1f2937' : '#fff'
  };
}

function applyPalette(config, th) {
  ((config.data && config.data.datasets) || []).forEach((ds, i) => {
    const cor = COXA_CHART_COLORS[i % COXA_CHART_COLORS.length];
    const tipo = ds.type || config.type;
    const circular = ['pie', 'doughnut', 'polarArea'].includes(tipo);
    if (ds.backgroundColor === undefined)
      ds.backgroundColor = circular ? COXA_CHART_COLORS
        : (tipo === 'line' || tipo === 'radar') ? cor + '2e'
        : tipo === 'bubble' ? cor + '99'
        : cor;
    if (ds.borderColor === undefined)
      ds.borderColor = circular ? th.ring : cor;
  });
}

/* <CoxaChart type="line" data={{labels, datasets}} options={...} height={260} />
   Datasets sem cor recebem a paleta verde automaticamente; texto e grade
   seguem o tema claro/escuro e reagem ao alternar o dark mode. */
export function CoxaChart({ type, data, options, height = 260, ...rest }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const th = theme();
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    Chart.defaults.color = th.text;
    Chart.defaults.borderColor = th.grid;

    /* clona o config para não mutar as props */
    const config = {
      type,
      data: JSON.parse(JSON.stringify(data)),
      options: { maintainAspectRatio: false, ...(options || {}) }
    };
    applyPalette(config, th);

    chartRef.current = new Chart(canvasRef.current, config);

    /* re-estiliza quando html.dark muda */
    const obs = new MutationObserver(() => {
      const t = theme();
      Chart.defaults.color = t.text;
      Chart.defaults.borderColor = t.grid;
      chartRef.current?.update();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      obs.disconnect();
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [type, data, options]);

  return (
    <div style={{ height }} {...rest}>
      <canvas ref={canvasRef} />
    </div>
  );
}
