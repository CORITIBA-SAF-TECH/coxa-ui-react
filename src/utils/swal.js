import Swal from 'sweetalert2';
import { buttonIconFor } from './buttonIcons.js';
import { t } from '../i18n/core.js';

function swalOpts(extra) {
  const dark = document.documentElement.classList.contains('dark');
  const base = dark
    ? { background: '#1f2937', color: '#f9fafb' }
    : { background: '#ffffff', color: '#1a1a1a' };
  return Object.assign(base, extra || {});
}

/* Toast padrão do CoxaUI (SweetAlert2) */
export function coxaToast(icon, title) {
  Swal.fire(swalOpts({
    toast: true, position: 'top', showConfirmButton: false,
    timer: 3500, timerProgressBar: true, icon, title: t(title)
  }));
}

const comIcone = (nome, texto) => `<i class="ti ti-${String(nome).replace(/[^a-z0-9-]/g, '')}" aria-hidden="true"></i> ${texto}`;

/* Diálogo de confirmação: retorna Promise<boolean>.
   Os dois botões têm ícone: Cancelar usa "x" e o de confirmar segue o rótulo
   (confirmText="Excluir" → trash). confirmIcon / cancelIcon trocam o ícone;
   passe false para tirar. */
export function coxaConfirm({
  title, text, icon = 'warning', confirmText = 'Confirmar', cancelText = 'Cancelar',
  confirmIcon, cancelIcon, color
}) {
  const icOk = confirmIcon === false ? null : (confirmIcon || buttonIconFor(confirmText, 'primary'));
  const icNao = cancelIcon === false ? null : (cancelIcon || buttonIconFor(cancelText, 'secondary'));
  return Swal.fire(swalOpts({
    title: t(title), text: t(text), icon, showCancelButton: true,
    confirmButtonText: icOk ? comIcone(icOk, t(confirmText)) : t(confirmText),
    cancelButtonText: icNao ? comIcone(icNao, t(cancelText)) : t(cancelText),
    confirmButtonColor: color,
    reverseButtons: true
  })).then(r => r.isConfirmed);
}
