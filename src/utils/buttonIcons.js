import { Children, isValidElement } from 'react';

/* Ícone padrão dos botões.
   Todo <Button> sem a prop `icon` ganha um ícone escolhido pelo rótulo
   ("Cancelar" → x, "Salvar" → check…). Sem rótulo conhecido, vale o ícone
   da variante. Os pares abaixo seguem o que os apps do hub já usam. */

/* Expressões (têm prioridade sobre as palavras soltas) */
const FRASES = {
  'limpar filtro': 'filter-off',
  'limpar filtros': 'filter-off',
  'tentar de novo': 'refresh',
  'tentar novamente': 'refresh',
  'nao obrigado': 'x',
  'ver todas': 'list',
  'ver todos': 'list',
  'fazer o tour': 'player-play',
  'marcar como': 'check',
  /* espanhol e inglês (para rótulos escritos direto nesses idiomas) */
  'limpiar filtros': 'filter-off', 'limpiar filtro': 'filter-off',
  'intentar de nuevo': 'refresh', 'no gracias': 'x',
  'clear filters': 'filter-off', 'clear filter': 'filter-off',
  'try again': 'refresh', 'no thanks': 'x', 'view all': 'list', 'see all': 'list',
  'sign in': 'login', 'log in': 'login', 'sign out': 'logout', 'log out': 'logout'
};

/* Palavras: vale a primeira do rótulo que estiver aqui */
const PALAVRAS = {
  /* cancelar e fechar */
  cancelar: 'x', cancela: 'x', fechar: 'x', descartar: 'x', dispensar: 'x', nao: 'x', desistir: 'x',
  /* confirmar */
  salvar: 'check', gravar: 'check', confirmar: 'check', concluir: 'check', finalizar: 'check',
  criar: 'check', aplicar: 'check', ok: 'check', sim: 'check', registrar: 'check', cadastrar: 'check',
  aprovar: 'circle-check', aceitar: 'circle-check', autorizar: 'circle-check', liberar: 'circle-check',
  rejeitar: 'circle-x', recusar: 'circle-x', reprovar: 'circle-x', negar: 'circle-x',
  /* criar, editar, excluir */
  novo: 'plus', nova: 'plus', adicionar: 'plus', incluir: 'plus', inserir: 'plus',
  editar: 'pencil', alterar: 'pencil', renomear: 'pencil',
  excluir: 'trash', remover: 'trash', apagar: 'trash', deletar: 'trash', tirar: 'trash',
  copiar: 'copy', clonar: 'copy', duplicar: 'copy',
  arquivar: 'archive', mover: 'arrows-move',
  /* buscar e filtrar */
  buscar: 'search', pesquisar: 'search', procurar: 'search', consultar: 'search',
  filtrar: 'filter', limpar: 'eraser',
  /* navegar */
  voltar: 'arrow-left', anterior: 'arrow-left',
  avancar: 'arrow-right', proximo: 'arrow-right', proxima: 'arrow-right', continuar: 'arrow-right', seguinte: 'arrow-right',
  inicio: 'home', abrir: 'external-link', acessar: 'external-link',
  ver: 'eye', visualizar: 'eye', detalhes: 'eye', exibir: 'eye', mostrar: 'eye', ocultar: 'eye-off',
  /* enviar e arquivos */
  enviar: 'send', emitir: 'send', comentar: 'send', responder: 'send', compartilhar: 'share',
  baixar: 'download', download: 'download', exportar: 'file-export',
  importar: 'upload', upload: 'upload', anexar: 'paperclip', imprimir: 'printer',
  pdf: 'file-type-pdf', xml: 'file-code', csv: 'file-spreadsheet', excel: 'file-spreadsheet', planilha: 'file-spreadsheet',
  /* atualizar e desfazer */
  atualizar: 'refresh', recarregar: 'refresh', sincronizar: 'refresh', tentar: 'refresh',
  estornar: 'arrow-back-up', desfazer: 'arrow-back-up', restaurar: 'arrow-back-up', reabrir: 'arrow-back-up',
  /* sessão e acesso */
  entrar: 'login', login: 'login', sair: 'logout', logout: 'logout',
  bloquear: 'lock', desbloquear: 'lock-open',
  /* execução */
  iniciar: 'player-play', comecar: 'player-play', executar: 'player-play', usar: 'player-play', rodar: 'player-play',
  pausar: 'player-pause', parar: 'player-stop', interromper: 'player-stop', encerrar: 'player-stop',
  gerar: 'bolt', processar: 'bolt',
  /* diversos */
  configurar: 'settings', configuracoes: 'settings', ajuda: 'help-circle', sobre: 'info-circle',
  hoje: 'calendar', agendar: 'calendar', historico: 'history', pagar: 'cash', selecionar: 'click', escolher: 'click',

  /* Espanhol (o que não coincide com o português). O ícone do <Button> é escolhido pelo
     texto de origem; estas palavras só entram em jogo se o rótulo já vier em outro idioma. */
  cerrar: 'x', guardar: 'check', crear: 'check',
  aceptar: 'circle-check', aprobar: 'circle-check', rechazar: 'circle-x',
  nuevo: 'plus', nueva: 'plus', agregar: 'plus', anadir: 'plus',
  eliminar: 'trash', borrar: 'trash', quitar: 'trash',
  limpiar: 'eraser',
  volver: 'arrow-left', atras: 'arrow-left', siguiente: 'arrow-right', omitir: 'player-skip-forward',
  detalles: 'eye',
  descargar: 'download', adjuntar: 'paperclip', actualizar: 'refresh', reintentar: 'refresh',
  deshacer: 'arrow-back-up', salir: 'logout', ayuda: 'help-circle', hoy: 'calendar',

  /* Inglês */
  cancel: 'x', close: 'x', dismiss: 'x', discard: 'x',
  save: 'check', confirm: 'check', done: 'check', finish: 'check', create: 'check', apply: 'check', yes: 'check', submit: 'check',
  approve: 'circle-check', accept: 'circle-check', reject: 'circle-x', decline: 'circle-x',
  new: 'plus', add: 'plus', edit: 'pencil', rename: 'pencil',
  delete: 'trash', remove: 'trash', copy: 'copy', clone: 'copy', duplicate: 'copy', archive: 'archive', move: 'arrows-move',
  search: 'search', find: 'search', filter: 'filter', clear: 'eraser',
  back: 'arrow-left', previous: 'arrow-left', next: 'arrow-right', continue: 'arrow-right', skip: 'player-skip-forward',
  home: 'home', open: 'external-link', view: 'eye', details: 'eye', show: 'eye', hide: 'eye-off',
  send: 'send', share: 'share', export: 'file-export', import: 'upload', attach: 'paperclip', print: 'printer',
  refresh: 'refresh', reload: 'refresh', retry: 'refresh', update: 'refresh', sync: 'refresh',
  undo: 'arrow-back-up', restore: 'arrow-back-up',
  lock: 'lock', unlock: 'lock-open',
  start: 'player-play', run: 'player-play', pause: 'player-pause', stop: 'player-stop', generate: 'bolt',
  settings: 'settings', help: 'help-circle', about: 'info-circle', today: 'calendar', history: 'history', pay: 'cash',
  select: 'click', choose: 'click'
};

/* Sem rótulo conhecido: ícone da variante */
const POR_VARIANTE = {
  primary: 'check',
  accent: 'bolt',
  secondary: 'chevron-right',
  ghost: 'chevron-right',
  danger: 'alert-triangle',
  warning: 'alert-triangle'
};

const extras = {};

const normalizar = s => String(s ?? '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function textoDe(no) {
  if (no == null || typeof no === 'boolean') return '';
  if (typeof no === 'string' || typeof no === 'number') return String(no);
  if (Array.isArray(no)) return no.map(textoDe).join(' ');
  if (isValidElement(no)) return textoDe(no.props.children);
  return '';
}

/* O app pode ensinar rótulos próprios (ou trocar um padrão), uma vez, no entry:
     registerButtonIcons({ 'baixar danfse': 'file-type-pdf', conciliar: 'arrows-exchange' }); */
export function registerButtonIcons(mapa) {
  Object.entries(mapa || {}).forEach(([rotulo, icone]) => {
    const k = normalizar(rotulo);
    if (k) extras[k] = icone;
  });
}

/* Ícone padrão para um rótulo (string ou children do React).
   Devolve sempre um nome de ícone: o do rótulo ou, na falta, o da variante. */
export function buttonIconFor(rotulo, variant = 'primary') {
  const t = normalizar(typeof rotulo === 'string' ? rotulo : textoDe(rotulo));
  if (t) {
    if (extras[t]) return extras[t];
    const cercado = ` ${t} `;
    for (const mapa of [extras, FRASES]) {
      for (const k in mapa) if (k.includes(' ') && cercado.includes(` ${k} `)) return mapa[k];
    }
    for (const p of t.split(' ')) {
      if (extras[p]) return extras[p];
      if (PALAVRAS[p]) return PALAVRAS[p];
    }
  }
  return POR_VARIANTE[variant] || POR_VARIANTE.primary;
}

/* Decide o ícone de um <Button>:
   - icon="nome"            → esse ícone
   - icon={false} ou null   → sem ícone
   - sem a prop             → ícone padrão, a não ser que o conteúdo já comece
                              por um adorno (<i>, <Spinner>, <img>…) */
export function resolveButtonIcon(icon, children, variant) {
  if (icon === false || icon === null) return null;
  if (typeof icon === 'string' && icon) return icon;
  const primeiro = Children.toArray(children)[0];
  if (isValidElement(primeiro) && !textoDe(primeiro).trim()) return null;
  return buttonIconFor(children, variant);
}
