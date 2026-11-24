import { Avatar } from './Misc.jsx';
import { Button } from './Button.jsx';

const iniciais = nome => String(nome || '?').trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase() || '?';

/* Fio de comentários.
   <CommentList>
     <Comment author="Maria Souza" when="24/11 09:12">Recebido, vou verificar.</Comment>
     <Comment author="João Lima" when="24/11 09:40" reply tag={<Badge color="blue">solicitante</Badge>}>Obrigado!</Comment>
   </CommentList>
   <CommentBox value={texto} onChange={setTexto} onSubmit={enviar} loading={enviando} />

   Comment: avatar (URL da foto) ou as iniciais do autor; reply recua e muda a cor da borda
   (resposta do outro lado da conversa); tag e actions ficam no cabeçalho. O texto preserva
   as quebras de linha. */
export function CommentList({ empty = null, className = '', children }) {
  const vazio = children === null || children === undefined || (Array.isArray(children) && !children.filter(Boolean).length);
  if (vazio) return empty;
  return <div className={`cmt-list ${className}`.trim()}>{children}</div>;
}

export function Comment({ author, when, avatar, tag, actions, reply, className = '', children }) {
  return (
    <div className={`cmt ${reply ? 'cmt-reply' : ''} ${className}`.replace(/\s+/g, ' ').trim()}>
      <div className="cmt-head">
        <Avatar size="sm" title={author}>{avatar ? <img src={avatar} alt="" /> : iniciais(author)}</Avatar>
        <strong>{author}</strong>
        {tag}
        {when && <span className="cmt-when">{when}</span>}
        {actions && <span className="cmt-acts">{actions}</span>}
      </div>
      <div className="cmt-text">{children}</div>
    </div>
  );
}

/* Caixa de novo comentário. onChange recebe o texto; Ctrl+Enter envia.
   O botão fica desabilitado enquanto o texto estiver vazio. */
export function CommentBox({
  value = '', onChange, onSubmit, loading = false, placeholder = 'Escreva um comentário...',
  submitLabel = 'Comentar', rows = 3, actions, className = ''
}) {
  const vazio = !String(value).trim();
  const enviar = () => { if (!vazio && !loading) onSubmit?.(value); };
  return (
    <div className={`cmt-box ${className}`.trim()}>
      <textarea
        rows={rows} value={value} placeholder={placeholder} disabled={loading} aria-label={placeholder}
        onChange={e => onChange?.(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); enviar(); } }}
      />
      <div className="cmt-box-acts">
        <span className="cmt-box-hint">Ctrl + Enter envia</span>
        {actions}
        <Button size="sm" icon="send" loading={loading} disabled={vazio} onClick={enviar}>{submitLabel}</Button>
      </div>
    </div>
  );
}
