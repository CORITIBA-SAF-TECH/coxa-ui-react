import { buttonIconFor } from './buttonIcons.js';
import { t } from '../i18n/core.js';

const el = (tag, cls, texto) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (texto !== undefined && texto !== null) n.textContent = String(texto);
  return n;
};

function botao(cls, icone, texto) {
  const b = el('button', 'btn ' + cls);
  b.type = 'button';
  if (icone) {
    const i = el('i', 'ti ti-' + String(icone).replace(/[^a-z0-9-]/g, ''));
    i.setAttribute('aria-hidden', 'true');
    b.append(i, ' ');
  }
  b.append(t(String(texto)));
  return b;
}

/* Confirmação leve, sem dependência (o coxaConfirm continua existindo, via SweetAlert2).
     const ok = await confirmDialog({ title: 'Excluir título?', text: 'Não pode ser desfeito.',
                                      confirmText: 'Excluir', danger: true });
   Retorna Promise<boolean>. Esc, clique fora e Cancelar resolvem false.
   Os botões sempre têm ícone: Cancelar usa "x"; o de confirmar segue o rótulo.
   Título e texto entram como textContent, nunca como HTML. */
export function confirmDialog({
  title, text, icon, confirmText = 'Confirmar', cancelText = 'Cancelar',
  confirmIcon, cancelIcon, danger = false
} = {}) {
  if (typeof document === 'undefined') return Promise.resolve(false);

  return new Promise(resolve => {
    const anterior = document.activeElement;
    const ov = el('div', 'modal-overlay cx-confirm');
    const box = el('div', 'modal-box modal-sm');
    box.setAttribute('role', 'alertdialog');
    box.setAttribute('aria-modal', 'true');
    if (title) box.setAttribute('aria-label', t(String(title)));

    const ico = el('div', 'cx-confirm-ico' + (danger ? ' danger' : ''));
    const i = el('i', 'ti ti-' + String(icon || (danger ? 'alert-triangle' : 'help-circle')).replace(/[^a-z0-9-]/g, ''));
    i.setAttribute('aria-hidden', 'true');
    ico.append(i);
    box.append(ico);
    if (title) box.append(el('h2', 'cx-confirm-title', t(String(title))));
    if (text) box.append(el('p', 'cx-confirm-text', t(String(text))));

    const nao = botao('btn-s', cancelIcon === false ? null : (cancelIcon || buttonIconFor(cancelText, 'secondary')), cancelText);
    const sim = botao(danger ? 'btn-d' : 'btn-p',
      confirmIcon === false ? null : (confirmIcon || buttonIconFor(confirmText, danger ? 'danger' : 'primary')), confirmText);
    const acoes = el('div', 'modal-actions');
    acoes.append(nao, sim);
    box.append(acoes);
    ov.append(box);

    const overflow = document.body.style.overflow;
    let fechado = false;
    function fechar(valor) {
      if (fechado) return;
      fechado = true;
      document.removeEventListener('keydown', tecla, true);
      document.body.style.overflow = overflow;
      ov.classList.remove('open');
      setTimeout(() => ov.remove(), 200);
      if (anterior && anterior.focus) anterior.focus();
      resolve(valor);
    }
    function tecla(e) {
      if (e.key === 'Escape') { e.stopPropagation(); fechar(false); return; }
      if (e.key !== 'Tab') return;
      e.preventDefault();
      (document.activeElement === nao ? sim : nao).focus();
    }

    nao.addEventListener('click', () => fechar(false));
    sim.addEventListener('click', () => fechar(true));
    ov.addEventListener('click', e => { if (e.target === ov) fechar(false); });
    document.addEventListener('keydown', tecla, true);

    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    /* força o layout antes de abrir, para a transição de opacidade rodar */
    void ov.offsetWidth;
    ov.classList.add('open');
    /* ação destrutiva: o foco começa em Cancelar */
    (danger ? nao : sim).focus();
  });
}
