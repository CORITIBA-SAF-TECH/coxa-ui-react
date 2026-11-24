import { useState } from 'react';
import { Button } from './Button.jsx';
import { Steps } from './Timeline.jsx';

/* Fluxo em etapas: o <Steps> desenha a trilha; o <Wizard> cuida de avançar, voltar,
   pular, validar e concluir.

   <Wizard
     steps={[
       { label: 'Dados', content: <FormDados />, canNext: !!form.nome },
       { label: 'Perfil', content: <FormPerfil />, optional: true },     // optional mostra "Pular"
       { label: 'Revisão', content: <Resumo /> }
     ]}
     onNext={async i => { if (i === 0) return salvarRascunho(); }}       // retornar false segura na etapa
     onFinish={concluir} onCancel={fechar} finishLabel="Cadastrar" />

   Etapa atual: interna por padrão; para controlar de fora, passe step + onStepChange.
   loading trava os botões (o botão de avançar mostra o spinner). */
export function Wizard({
  steps = [], step: controlado, onStepChange, onNext, onFinish, onCancel,
  nextLabel = 'Continuar', backLabel = 'Voltar', skipLabel = 'Pular', finishLabel = 'Concluir', cancelLabel = 'Cancelar',
  loading = false, className = ''
}) {
  const [interno, setInterno] = useState(0);
  const [ocupado, setOcupado] = useState(false);
  const [sentido, setSentido] = useState('next');   /* de que lado a etapa entra */
  const ultimo = Math.max(0, steps.length - 1);
  const atual = Math.min(Math.max(0, controlado !== undefined ? controlado : interno), ultimo);
  const etapa = steps[atual] || {};
  const travado = loading || ocupado;

  function ir(i) {
    setSentido(i < atual ? 'back' : 'next');
    if (controlado === undefined) setInterno(i);
    onStepChange?.(i);
  }
  async function avancar() {
    if (travado) return;
    setOcupado(true);
    try {
      if (onNext && (await onNext(atual)) === false) return;
      if (atual >= ultimo) await onFinish?.();
      else ir(atual + 1);
    } finally {
      setOcupado(false);
    }
  }

  return (
    <div className={`wiz ${className}`.trim()}>
      <Steps centered items={steps.map(s => s.label)} current={atual} />
      {/* a key remonta o conteúdo a cada etapa, para a animação de entrada rodar */}
      <div className="wiz-body" key={atual} data-dir={sentido}>{etapa.content}</div>
      <div className="wiz-acts">
        {atual === 0
          ? onCancel && <Button variant="secondary" onClick={onCancel} disabled={travado}>{cancelLabel}</Button>
          : <Button variant="secondary" onClick={() => ir(atual - 1)} disabled={travado}>{backLabel}</Button>}
        <span className="wiz-gap" />
        {etapa.optional && atual < ultimo && (
          <Button variant="ghost" icon="player-skip-forward" onClick={() => ir(atual + 1)} disabled={travado}>{skipLabel}</Button>
        )}
        <Button
          icon={atual >= ultimo ? 'check' : 'arrow-right'}
          loading={travado}
          disabled={etapa.canNext === false}
          onClick={avancar}
        >
          {atual >= ultimo ? finishLabel : (etapa.nextLabel || nextLabel)}
        </Button>
      </div>
    </div>
  );
}
