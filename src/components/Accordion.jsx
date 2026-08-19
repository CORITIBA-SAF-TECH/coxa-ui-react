import { useState } from 'react';

export function Accordion({ children }) {
  return <div className="accordion">{children}</div>;
}

/* <AccordionItem title="Pergunta?" defaultOpen>Resposta</AccordionItem> */
export function AccordionItem({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`accordion-item ${open ? 'open' : ''}`.trim()}>
      <button className="accordion-btn" type="button" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        {title}
        <span className="acc-arr"><i className="ti ti-chevron-down" /></span>
      </button>
      <div className="accordion-body" role="region" hidden={!open}>{children}</div>
    </div>
  );
}
