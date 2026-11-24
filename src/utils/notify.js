import { t } from '../i18n/core.js';

const ICONES = {
  success: 'circle-check',
  info: 'info-circle',
  warning: 'alert-triangle',
  error: 'alert-octagon'
};

let pilha = null;

/* Toast leve, sem dependência (o coxaToast continua existindo, via SweetAlert2).
     notify('success', 'Título salvo');
     notify('warning', 'Sessão expirando', { duration: 6000 });
   kind: success | info | warning | error ("error" é laranja: vermelho é proibido).
   O texto entra como textContent, nunca como HTML.
   Retorna uma função que fecha o toast antes da hora. */
export function notify(kind, message, { duration = 3200 } = {}) {
  if (typeof document === 'undefined') return () => {};
  if (!pilha || !pilha.isConnected) {
    pilha = document.createElement('div');
    pilha.className = 'cx-toasts';
    pilha.setAttribute('aria-live', 'polite');
    document.body.appendChild(pilha);
  }
  const k = ICONES[kind] ? kind : 'info';

  const t = document.createElement('div');
  t.className = 'cx-toast ' + k;
  t.setAttribute('role', 'status');
  t.style.setProperty('--toast-dur', duration + 'ms');
  const ico = document.createElement('i');
  ico.className = 'ti ti-' + ICONES[k];
  const txt = document.createElement('span');
  txt.textContent = t(String(message));
  t.append(ico, txt);
  pilha.append(t);

  let fechado = false;
  const fechar = () => {
    if (fechado) return;
    fechado = true;
    clearTimeout(timer);
    t.classList.add('out');
    setTimeout(() => t.remove(), 260);
  };
  const timer = setTimeout(fechar, duration);
  t.addEventListener('click', fechar);
  return fechar;
}
