/* Máscaras de digitação (sem dependência).
   No padrão, "0" aceita um dígito e "A" aceita dígito ou letra; o resto é literal.
     applyMask('12345678909', 'cpf')            → '123.456.789-09'
     applyMask('1234', '00/00')                 → '12/34'
     unmask('123.456.789-09')                   → '12345678909' */

const limpar = v => String(v ?? '').toUpperCase().replace(/[^0-9A-Z]/g, '');

function aplicar(valor, padrao) {
  const src = limpar(valor);
  let out = '', pend = '', i = 0;
  for (const c of padrao) {
    if (c === '0' || c === 'A') {
      const aceita = c === '0' ? /\d/ : /[0-9A-Z]/;
      while (i < src.length && !aceita.test(src[i])) i++;
      if (i >= src.length) break;
      out += pend + src[i++];
      pend = '';
    } else {
      pend += c;
    }
  }
  return out;
}

const CPF = '000.000.000-00';
/* CNPJ alfanumérico (desde jul/2026): 12 posições com letras ou dígitos + 2 dígitos verificadores */
const CNPJ = 'AA.AAA.AAA/AAAA-00';

export const masks = {
  cpf: v => aplicar(v, CPF),
  cnpj: v => aplicar(v, CNPJ),
  cpfCnpj: v => {
    const s = limpar(v);
    return /[A-Z]/.test(s) || s.length > 11 ? aplicar(s, CNPJ) : aplicar(s, CPF);
  },
  telefone: v => {
    const d = limpar(v).replace(/\D/g, '');
    return aplicar(d, d.length > 10 ? '(00) 00000-0000' : '(00) 0000-0000');
  },
  cep: v => aplicar(v, '00000-000'),
  data: v => aplicar(v, '00/00/0000'),
  hora: v => aplicar(v, '00:00')
};

/* mask: nome de uma máscara pronta, padrão ("000-AA") ou função (valor) => texto */
export function applyMask(valor, mask) {
  if (typeof mask === 'function') return mask(valor);
  if (masks[mask]) return masks[mask](valor);
  return mask ? aplicar(valor, mask) : String(valor ?? '');
}

/* Só letras e dígitos (o que vai para o backend) */
export function unmask(valor) {
  return limpar(valor);
}

const brl = typeof Intl !== 'undefined'
  ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  : null;

/* formatBRL(1234.5) → '1.234,50' ; formatBRL(1234.5, true) → 'R$ 1.234,50' */
export function formatBRL(valor, comSimbolo = false) {
  const n = Number(valor);
  if (valor === null || valor === undefined || valor === '' || Number.isNaN(n)) return '';
  const txt = brl ? brl.format(n) : n.toFixed(2).replace('.', ',');
  return comSimbolo ? `R$ ${txt}` : txt;
}
