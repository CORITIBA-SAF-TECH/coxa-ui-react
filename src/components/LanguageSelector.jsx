import { useEffect } from 'react';
import { Dropdown, DropdownItem } from './Dropdown.jsx';
import { Flag } from './Flag.jsx';
import { t, useI18n } from '../i18n/core.js';

/* Seletor de idioma para o cabeçalho (dentro de <HeaderRight>).
   <LanguageSelector />                              → Português (Brasil), Español, English
   <LanguageSelector languages={['pt-BR', 'en']} />  → só alguns

   Cada idioma aparece com a bandeira do país (Brasil, Espanha, Estados Unidos) e, no botão,
   também com a sigla: a bandeira sozinha não diz o idioma para quem usa leitor de tela.

   A escolha fica em localStorage ('coxaui-lang') e vale para os outros sistemas do
   clube no mesmo domínio. Por padrão a página é recarregada ao trocar, para a tela
   inteira voltar já no idioma novo; com reload={false} só o que usa useI18n() muda na hora.
   onChange(código) é chamado antes de recarregar (ex.: gravar a preferência no backend). */
export function LanguageSelector({ languages, reload = true, onChange }) {
  const { lang, setLanguage, languages: todas } = useI18n();
  const lista = languages ? todas.filter(l => languages.includes(l.code)) : todas;
  const atual = todas.find(l => l.code === lang) || todas[0];

  /* <html lang> acompanha o idioma (leitores de tela, hifenização, corretor do navegador) */
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  function escolher(code) {
    if (code === lang) return;
    setLanguage(code);
    onChange?.(code);
    if (reload) window.location.reload();
  }

  const rotulo = `${t('Idioma')}: ${atual.label}`;
  const trigger = (
    <button type="button" className="lang-btn" aria-haspopup="menu" title={rotulo} aria-label={rotulo} translate="no">
      {atual.flag ? <Flag country={atual.flag} /> : <i className="ti ti-language" aria-hidden="true" />}
      <span>{atual.short}</span>
      <i className="ti ti-chevron-down" aria-hidden="true" />
    </button>
  );

  return (
    <Dropdown align="right" trigger={trigger}>
      {lista.map(l => (
        <DropdownItem key={l.code} onClick={() => escolher(l.code)}>
          <span className={`lang-item ${l.code === lang ? 'current' : ''}`.trim()} translate="no" lang={l.code}>
            {l.flag ? <Flag country={l.flag} /> : <span className="lang-code">{l.short}</span>}
            <span className="lang-name">{l.label}</span>
            {l.code === lang && <i className="ti ti-check" aria-hidden="true" />}
          </span>
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
