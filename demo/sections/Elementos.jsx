import { useState } from 'react';
import {
  Button, FormRow, FormGroup,
  InputGroup, PasswordInput, SearchInput, MaskedInput, CurrencyInput, RadioGroup, Segmented,
  Result, CopyButton, Kbd,
  confirmDialog, notify, formatBRL
} from '../../src/index.js';
import { DocsSection, SubSection, Demo } from '../DocsBlocks.jsx';

export function SecCampos() {
  const [busca, setBusca] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [fone, setFone] = useState('');
  const [cep, setCep] = useState('');
  const [valor, setValor] = useState(1250.9);
  const [nome, setNome] = useState('');
  return (
    <DocsSection id="campos" icon="forms" title="Campos: ícone, máscara, moeda e erro"
      desc="Peças que os apps vinham refazendo à mão: campo com ícone ou prefixo, senha com olho, busca com limpar, máscaras brasileiras, valor em reais e mensagem de erro por campo.">
      <SubSection title="Ícone, prefixo, sufixo, senha e busca">
        <Demo code={`<InputGroup icon="mail"><input type="email" placeholder="nome@coritiba.com.br" /></InputGroup>
<InputGroup prefix="https://" suffix=".coritiba.com.br"><input type="text" /></InputGroup>
<PasswordInput value={senha} onChange={e => setSenha(e.target.value)} />
<SearchInput value={busca} onChange={setBusca} placeholder="Buscar título..." />`}>
          <FormRow>
            <FormGroup label="E-mail">
              <InputGroup icon="mail"><input type="email" placeholder="nome@coritiba.com.br" /></InputGroup>
            </FormGroup>
            <FormGroup label="Endereço do sistema">
              <InputGroup prefix="https://" suffix=".coritiba.com.br"><input type="text" placeholder="portaria" /></InputGroup>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup label="Senha">
              <PasswordInput value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" />
            </FormGroup>
            <FormGroup label="Busca">
              <SearchInput value={busca} onChange={setBusca} placeholder="Buscar título..." />
            </FormGroup>
          </FormRow>
        </Demo>
      </SubSection>
      <SubSection title="Máscaras e moeda">
        <Demo code={`// onChange recebe (textoComMáscara, textoLimpo)
<MaskedInput mask="cpf" value={cpf} onChange={setCpf} />
<MaskedInput mask="cnpj" value={cnpj} onChange={setCnpj} />     // aceita o CNPJ alfanumérico
<MaskedInput mask="telefone" value={fone} onChange={setFone} /> // 8 ou 9 dígitos
<MaskedInput mask="cep" value={cep} onChange={setCep} />
<MaskedInput mask="000-AA" ... />                               // padrão próprio: 0 = dígito, A = letra ou dígito
// também: cpfCnpj | data | hora

// Valor em reais: value e onChange trabalham com número
<CurrencyInput value={valor} onChange={setValor} />

// Fora de campos: applyMask(valor, 'cpf'), unmask(texto), formatBRL(1250.9, true)`}>
          <FormRow cols={3}>
            <FormGroup label="CPF"><MaskedInput mask="cpf" value={cpf} onChange={setCpf} placeholder="000.000.000-00" /></FormGroup>
            <FormGroup label="CNPJ"><MaskedInput mask="cnpj" value={cnpj} onChange={setCnpj} placeholder="00.000.000/0000-00" /></FormGroup>
            <FormGroup label="Telefone"><MaskedInput mask="telefone" value={fone} onChange={setFone} placeholder="(41) 99999-0000" /></FormGroup>
          </FormRow>
          <FormRow cols={3}>
            <FormGroup label="CEP"><MaskedInput mask="cep" value={cep} onChange={setCep} placeholder="00000-000" /></FormGroup>
            <FormGroup label="Valor" fieldHint={`Número guardado: ${valor ?? 'null'} · ${formatBRL(valor, true) || 'vazio'}`}>
              <CurrencyInput value={valor} onChange={setValor} />
            </FormGroup>
          </FormRow>
        </Demo>
      </SubSection>
      <SubSection title="Erro de campo">
        <Demo code={`<FormGroup label="Nome" required error={!nome && 'Informe o nome do visitante'}>
  <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
</FormGroup>
// error marca o campo em laranja (vermelho é proibido) e mostra a mensagem abaixo`}>
          <FormRow>
            <FormGroup label="Nome" required error={!nome && 'Informe o nome do visitante'}>
              <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite para o erro sumir" />
            </FormGroup>
          </FormRow>
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecEscolha() {
  const [tipo, setTipo] = useState('pf');
  const [visao, setVisao] = useState('lista');
  const [periodo, setPeriodo] = useState('30d');
  return (
    <DocsSection id="escolha" icon="circle-dot" title="Rádios e controle segmentado"
      desc="RadioGroup para escolher uma entre poucas opções num formulário; Segmented para trocar visão, período ou modo sem ocupar uma linha de abas.">
      <Demo code={`<RadioGroup name="tipo" value={tipo} onChange={setTipo} options={[
  { value: 'pf', label: 'Pessoa física' },
  { value: 'pj', label: 'Pessoa jurídica' },
  { value: 'ex', label: 'Estrangeiro', disabled: true }
]} />   // column empilha as opções

<Segmented value={visao} onChange={setVisao} options={[
  { value: 'lista', label: 'Lista', icon: 'list' },
  { value: 'grade', label: 'Grade', icon: 'layout-grid' },
  { value: 'agenda', label: 'Agenda', icon: 'calendar' }
]} />
<Segmented size="sm" value={periodo} onChange={setPeriodo} options={['7d', '30d', '90d', '12m']} />`}>
        <div className="demo-gap-v">
          <RadioGroup name="demo-tipo" value={tipo} onChange={setTipo} options={[
            { value: 'pf', label: 'Pessoa física' },
            { value: 'pj', label: 'Pessoa jurídica' },
            { value: 'ex', label: 'Estrangeiro', disabled: true }
          ]} />
          <div className="demo-gap">
            <Segmented value={visao} onChange={setVisao} options={[
              { value: 'lista', label: 'Lista', icon: 'list' },
              { value: 'grade', label: 'Grade', icon: 'layout-grid' },
              { value: 'agenda', label: 'Agenda', icon: 'calendar' }
            ]} />
            <Segmented size="sm" value={periodo} onChange={setPeriodo} options={['7d', '30d', '90d', '12m']} />
          </div>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecConfirmar() {
  return (
    <DocsSection id="confirmar" icon="help-circle" title="Confirmação leve"
      desc="confirmDialog() pergunta antes de uma ação sem depender do SweetAlert2 (o coxaConfirm continua existindo). Os dois botões sempre têm ícone, e em ação destrutiva o foco começa em Cancelar.">
      <Demo code={`import { confirmDialog } from 'coxa-ui-react';

const ok = await confirmDialog({
  title: 'Excluir título?', text: 'Essa ação não pode ser desfeita.',
  confirmText: 'Excluir', danger: true
});
if (ok) { /* … */ }
// opções: icon, cancelText, confirmIcon, cancelIcon`}>
        <div className="demo-gap">
          <Button size="sm" variant="secondary" icon="send" onClick={async () => {
            const ok = await confirmDialog({ title: 'Enviar para aprovação?', text: 'O gestor recebe um aviso por e-mail.', confirmText: 'Enviar' });
            notify(ok ? 'success' : 'info', ok ? 'Enviado para aprovação' : 'Nada foi enviado');
          }}>Confirmar envio</Button>
          <Button size="sm" variant="danger" onClick={async () => {
            const ok = await confirmDialog({ title: 'Excluir título?', text: 'Essa ação não pode ser desfeita.', confirmText: 'Excluir', danger: true });
            notify(ok ? 'warning' : 'info', ok ? 'Título excluído' : 'Exclusão cancelada');
          }}>Excluir título</Button>
        </div>
      </Demo>
    </DocsSection>
  );
}

export function SecResultado() {
  const [status, setStatus] = useState('404');
  return (
    <DocsSection id="resultado" icon="mood-search" title="Páginas de resultado"
      desc="Result cobre 404, acesso negado, erro, sem conexão, manutenção e sucesso, com as ações que fazem sentido em cada caso.">
      <SubSection title="Result">
        <Demo code={`<Result status="404" actions={<Button as="a" href="/">Início</Button>} />
<Result status="403" />   // também: 500 | offline | manutencao
<Result status="success" title="Nota emitida"
  actions={<><Button variant="secondary">Voltar</Button><Button icon="file-type-pdf">Baixar PDF</Button></>}>
  A NFS-e 1234 foi autorizada pela prefeitura.
</Result>`}>
          <div className="demo-gap" style={{ justifyContent: 'center' }}>
            <Segmented size="sm" value={status} onChange={setStatus} options={['404', '403', '500', 'offline', 'manutencao', 'success']} />
          </div>
          {status === 'success' ? (
            <Result status="success" title="Nota emitida"
              actions={<><Button variant="secondary">Voltar</Button><Button icon="file-type-pdf">Baixar PDF</Button></>}>
              A NFS-e 1234 foi autorizada pela prefeitura.
            </Result>
          ) : (
            <Result status={status} actions={<><Button variant="secondary">Voltar</Button><Button>Tentar de novo</Button></>} />
          )}
        </Demo>
      </SubSection>
    </DocsSection>
  );
}

export function SecCopiar() {
  const chave = '41261112345678000199550010000012341000012345';
  return (
    <DocsSection id="copiar" icon="copy" title="Copiar e teclas"
      desc="CopyButton copia um texto e confirma no próprio botão. Kbd mostra teclas de atalho.">
      <Demo code={`<CopyButton text={chave}>Copiar chave</CopyButton>
<CopyButton text={chave} />                          // só o ícone
<CopyButton text={pix} variant="primary" size="lg" onCopy={avisar}>Copiar código PIX</CopyButton>

<Kbd>Ctrl</Kbd> <Kbd>K</Kbd>`}>
        <div className="demo-gap">
          <code>{chave.slice(0, 22)}…</code>
          <CopyButton text={chave} />
          <CopyButton text={chave}>Copiar chave</CopyButton>
          <CopyButton text={chave} variant="primary" onCopy={() => notify('success', 'Chave copiada')}>Copiar e avisar</CopyButton>
        </div>
        <p className="docs-note">Abra a busca com <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> e feche com <Kbd>Esc</Kbd>.</p>
      </Demo>
    </DocsSection>
  );
}
