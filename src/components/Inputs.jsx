import { forwardRef, useState } from 'react';
import { applyMask, unmask, formatBRL } from '../utils/masks.js';

const junta = (...c) => c.filter(Boolean).join(' ');

/* Campo com ícone, prefixo ou sufixo.
   <InputGroup icon="mail"><input type="email" /></InputGroup>
   <InputGroup prefix="R$" suffix="/mês"><input type="text" /></InputGroup>
   Use icon OU prefix (os dois ocupam o lado esquerdo). */
export function InputGroup({ icon, prefix, suffix, className = '', children }) {
  return (
    <div className={junta('in-grp', icon && 'has-ico', className)}>
      {icon && <i className={`ti ti-${icon} in-grp-ico`} aria-hidden="true" />}
      {prefix && <span className="in-grp-add">{prefix}</span>}
      {children}
      {suffix && <span className="in-grp-add">{suffix}</span>}
    </div>
  );
}

/* Senha com botão de mostrar/ocultar.
   <PasswordInput value={senha} onChange={e => setSenha(e.target.value)} /> */
export const PasswordInput = forwardRef(function PasswordInput({ icon = 'lock', className = '', ...rest }, ref) {
  const [visivel, setVisivel] = useState(false);
  return (
    <div className={junta('in-grp has-btn', icon && 'has-ico', className)}>
      {icon && <i className={`ti ti-${icon} in-grp-ico`} aria-hidden="true" />}
      <input ref={ref} type={visivel ? 'text' : 'password'} autoComplete="current-password" {...rest} />
      <button
        type="button" className="in-grp-btn"
        onClick={() => setVisivel(v => !v)}
        aria-label={visivel ? 'Ocultar senha' : 'Mostrar senha'} aria-pressed={visivel}
      >
        <i className={`ti ti-${visivel ? 'eye-off' : 'eye'}`} aria-hidden="true" />
      </button>
    </div>
  );
});

/* Busca com lupa e botão de limpar. onChange recebe o texto.
   <SearchInput value={busca} onChange={setBusca} placeholder="Buscar título..." /> */
export const SearchInput = forwardRef(function SearchInput({
  value = '', onChange, placeholder = 'Buscar...', className = '', ...rest
}, ref) {
  return (
    <div className={junta('in-grp has-ico has-btn', className)}>
      <i className="ti ti-search in-grp-ico" aria-hidden="true" />
      <input
        ref={ref} type="text" role="searchbox" value={value} placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)} {...rest}
      />
      {value !== '' && (
        <button type="button" className="in-grp-btn" onClick={() => onChange?.('')} aria-label="Limpar busca">
          <i className="ti ti-x" aria-hidden="true" />
        </button>
      )}
    </div>
  );
});

const NUMERICAS = ['cpf', 'telefone', 'cep', 'data', 'hora'];

/* Campo com máscara. onChange recebe (textoComMáscara, textoLimpo).
   <MaskedInput mask="cpf" value={cpf} onChange={setCpf} />
   mask: cpf | cnpj | cpfCnpj | telefone | cep | data | hora, um padrão
   ("000-AA": 0 = dígito, A = letra ou dígito) ou uma função. */
export const MaskedInput = forwardRef(function MaskedInput({ mask, value = '', onChange, ...rest }, ref) {
  return (
    <input
      ref={ref} type="text"
      inputMode={NUMERICAS.includes(mask) ? 'numeric' : undefined}
      value={applyMask(value, mask)}
      onChange={e => { const m = applyMask(e.target.value, mask); onChange?.(m, unmask(m)); }}
      {...rest}
    />
  );
});

/* Valor em reais: digita-se da direita para a esquerda (centavos primeiro).
   value e onChange trabalham com número (ou null quando vazio).
   <CurrencyInput value={valor} onChange={setValor} /> */
export const CurrencyInput = forwardRef(function CurrencyInput({
  value, onChange, prefix = 'R$', placeholder = '0,00', className = '', ...rest
}, ref) {
  const campo = (
    <input
      ref={ref} type="text" inputMode="numeric" placeholder={placeholder}
      className={junta('in-money', prefix ? '' : className)}
      value={formatBRL(value)}
      onChange={e => {
        const d = e.target.value.replace(/\D/g, '').slice(0, 15);
        onChange?.(d ? parseInt(d, 10) / 100 : null);
      }}
      {...rest}
    />
  );
  return prefix ? <InputGroup prefix={prefix} className={className}>{campo}</InputGroup> : campo;
});

const opcao = o => (typeof o === 'object' && o !== null ? o : { value: o, label: String(o) });

/* Grupo de rádios. options: string[] ou { value, label, disabled }[].
   <RadioGroup name="tipo" value={tipo} onChange={setTipo} options={['Pessoa física', 'Pessoa jurídica']} />
   column empilha as opções. */
export function RadioGroup({ name, value, onChange, options = [], column, className = '', ...rest }) {
  return (
    <div className={junta('radio-opts', column && 'col', className)} role="radiogroup" {...rest}>
      {options.map(o => {
        const op = opcao(o);
        return (
          <label key={String(op.value)} className="chk-opt">
            <input
              type="radio" name={name} checked={value === op.value} disabled={op.disabled}
              onChange={() => onChange?.(op.value)}
            />
            {op.label}
          </label>
        );
      })}
    </div>
  );
}

/* Controle segmentado: troca entre poucas opções (visão, período, modo).
   <Segmented value={visao} onChange={setVisao} options={[
     { value: 'lista', label: 'Lista', icon: 'list' }, { value: 'grade', label: 'Grade', icon: 'layout-grid' }
   ]} /> */
export function Segmented({ value, onChange, options = [], size, className = '', ...rest }) {
  return (
    <div className={junta('seg', size === 'sm' && 'seg-sm', className)} role="radiogroup" {...rest}>
      {options.map(o => {
        const op = opcao(o);
        const ativo = value === op.value;
        return (
          <button
            key={String(op.value)} type="button" role="radio" aria-checked={ativo} disabled={op.disabled}
            className={junta('seg-it', ativo && 'active')}
            onClick={() => onChange?.(op.value)}
          >
            {op.icon && <i className={`ti ti-${op.icon}`} aria-hidden="true" />} {op.label}
          </button>
        );
      })}
    </div>
  );
}
