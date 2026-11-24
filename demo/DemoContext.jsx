import { createContext, useContext } from 'react';

/* Estado compartilhado do playground: layout em uso, navegação entre a
   documentação e as telas de exemplo, paleta de comandos e a sessão simulada. */
export const DemoCtx = createContext(null);
export const useDemo = () => useContext(DemoCtx);
