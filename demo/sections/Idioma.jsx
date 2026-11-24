import { Button, FormGroup, LanguageSelector, KVList, KV, t, useI18n } from '../../src/index.js';
import { DocsSection, SubSection, Demo, CodeBlock } from '../DocsBlocks.jsx';

export function SecIdioma() {
  const { lang } = useI18n();
  return (
    <DocsSection id="idioma" icon="language" title="Idiomas e tradução"
      desc="A interface fala português, espanhol e inglês. O português é o idioma de origem: o texto escrito no código é a chave, e o que ainda não tiver tradução aparece em português. Por isso um sistema pode ser traduzido aos poucos.">
      <SubSection title="Seletor no cabeçalho">
        <Demo code={`<HeaderRight>
  <LanguageSelector />
  <DarkModeButton />
</HeaderRight>
// cada idioma aparece com a bandeira do país: Brasil, Espanha e Estados Unidos
// languages={['pt-BR', 'en']} limita a lista · onChange={codigo => ...} avisa o app`}>
          <div className="demo-hdr-strip"><LanguageSelector /></div>
          <p className="docs-note">A escolha fica salva no navegador e vale para os outros sistemas do clube. Ao trocar, a página é recarregada para a tela inteira voltar no idioma novo.</p>
        </Demo>
      </SubSection>

      <SubSection title="Registrar as traduções do sistema">
        <CodeBlock>{`// uma vez, no entry do app (main.jsx), antes de desenhar a tela
import { registerMessages } from 'coxa-ui-react';

registerMessages({
  es: { 'Salvar título': 'Guardar título', 'Títulos em aberto': 'Títulos pendientes' },
  en: { 'Salvar título': 'Save receivable', 'Títulos em aberto': 'Open receivables' }
});`}</CodeBlock>
        <p className="docs-note">Os textos da própria biblioteca (botões, filtros, paginação, páginas de erro) já vêm traduzidos.</p>
      </SubSection>

      <SubSection title="O que é traduzido">
        <table className="docs-table">
          <thead><tr><th>Texto</th><th>Como é traduzido</th></tr></thead>
          <tbody>
            <tr><td>Da própria biblioteca</td><td>Sozinho. Não há nada a fazer.</td></tr>
            <tr><td>Passado a um componente</td><td>Sozinho, quando está no dicionário: rótulo de botão, título, label de campo, placeholder, cabeçalho de tabela.</td></tr>
            <tr><td>Montado no código</td><td>Com a função t, que aceita variáveis entre chaves.</td></tr>
            <tr><td>Sem tradução registrada</td><td>Aparece em português, como foi escrito.</td></tr>
          </tbody>
        </table>
        <Demo code={`<Button>Salvar título</Button>                        // traduzido sozinho
<FormGroup label="Valor do título">...</FormGroup>    // idem

import { t } from 'coxa-ui-react';
t('{n} títulos em aberto', { n: 3 })                  // texto montado no código

<span translate="no">Coxa-Branca</span>               // nunca traduzir este trecho`}>
          <div className="demo-gap">
            <Button>Salvar título</Button>
            <Button variant="secondary">Cancelar</Button>
          </div>
          <div style={{ maxWidth: 320, marginTop: 12 }}>
            <FormGroup label="Valor do título"><input type="text" placeholder="Buscar título..." /></FormGroup>
          </div>
          <KVList>
            <KV k="Idioma atual">{lang}</KV>
            <KV k="Texto com variável">{t('{n} títulos em aberto', { n: 3 })}</KV>
          </KVList>
        </Demo>
      </SubSection>

      <SubSection title="Descobrir o que falta traduzir">
        <CodeBlock>{`import { getMissingMessages } from 'coxa-ui-react';

// abra as telas no idioma novo e chame no console:
getMissingMessages()   // textos que apareceram na tela sem tradução`}</CodeBlock>
        <p className="docs-note">Neste playground, acrescente ?lang=en&faltando ao endereço para ver a lista no console.</p>
      </SubSection>
    </DocsSection>
  );
}
