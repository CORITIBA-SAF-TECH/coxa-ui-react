import { useCallback, useEffect, useState } from 'react';

const DARK_KEY = 'coxaui-dark';

/* Modo escuro com persistência em localStorage (mesma chave do CoxaUI vanilla,
   então a preferência é compartilhada entre apps HTML e React). */
export function useDarkMode() {
  const [dark, setDark] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(DARK_KEY) === '1'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(DARK_KEY, dark ? '1' : '0');
  }, [dark]);

  const toggle = useCallback(() => setDark(d => !d), []);
  return { dark, toggle, setDark };
}
