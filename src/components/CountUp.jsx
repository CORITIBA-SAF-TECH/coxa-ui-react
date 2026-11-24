import { useRef } from 'react';
import { useIsoLayoutEffect } from '../hooks/useSlideIndicator.js';
import { motionOn } from '../utils/motion.js';

/* Número que conta até o valor (para métricas de dashboard).
   <CountUp value={1.28} decimals={2} suffix=" mi" />
   <StatCard unit="R$" value={<CountUp value={742} suffix=" mil" />} ... />
   Anima quando o sistema não pede menos movimento (e fora do layout clássico); nos demais
   casos mostra o valor final direto. Formata em pt-BR por padrão. */
export function CountUp({ value = 0, decimals = 0, prefix = '', suffix = '', duration = 950, locale = 'pt-BR', className = '' }) {
  const ref = useRef(null);
  const de = useRef(0);
  const fmt = v => prefix + Number(v).toLocaleString(locale, {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals
  }) + suffix;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inicio = de.current;
    if (!motionOn() || inicio === value) {
      el.textContent = fmt(value);
      de.current = value;
      return;
    }
    el.textContent = fmt(inicio);
    const t0 = performance.now();
    let raf = requestAnimationFrame(function passo(t) {
      const p = Math.min(1, Math.max(0, (t - t0) / duration));
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(inicio + (value - inicio) * e);
      if (p < 1) raf = requestAnimationFrame(passo);
      else de.current = value;
    });
    return () => cancelAnimationFrame(raf);
  }, [value, decimals, prefix, suffix, duration, locale]);

  return <span ref={ref} className={`count-up ${className}`.trim()}>{fmt(value)}</span>;
}
