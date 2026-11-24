import { Accordion, AccordionItem } from './Accordion.jsx';
import { Badge } from './Badge.jsx';
import { Empty } from './Misc.jsx';

/* Histórico de versões do sistema (a tela "Versões" que o rodapé abre).
   <Changelog current="2.4.0" versions={[
     { version: '2.4.0', date: '24/11/2026', items: ['Exportação em PDF', 'Correção no filtro de período'] },
     { version: '2.3.1', date: '10/11/2026', content: <p>Ajustes de desempenho.</p> }
   ]} />
   Cada versão traz items (lista de textos) e/ou content (qualquer conteúdo).
   A primeira nasce aberta; a versão igual a current ganha o selo "atual". */
export function Changelog({ versions = [], current, empty = 'Nenhuma versão registrada.' }) {
  if (!versions.length) return <Empty icon="clock-off">{empty}</Empty>;
  return (
    <Accordion>
      {versions.map((v, i) => (
        <AccordionItem
          key={v.version ?? i}
          defaultOpen={i === 0}
          title={(
            <span className="chg-title">
              <strong>v{v.version}</strong>
              {v.date && <small>{v.date}</small>}
              {current !== undefined && String(v.version) === String(current) && <Badge color="green">atual</Badge>}
            </span>
          )}
        >
          <div className="chg-body">
            {v.items && v.items.length > 0 && <ul>{v.items.map((t, j) => <li key={j}>{t}</li>)}</ul>}
            {v.content}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
