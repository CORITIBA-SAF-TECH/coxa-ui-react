import Swal from 'sweetalert2';

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
    timer: 3500, timerProgressBar: true, icon, title
  }));
}

/* Diálogo de confirmação — retorna Promise<boolean> */
export function coxaConfirm({ title, text, icon = 'warning', confirmText = 'Confirmar', color }) {
  return Swal.fire(swalOpts({
    title, text, icon, showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: color,
    reverseButtons: true
  })).then(r => r.isConfirmed);
}
