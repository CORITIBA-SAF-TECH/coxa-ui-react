import { Dropdown } from './Dropdown.jsx';
import { Avatar } from './Misc.jsx';

/* Menu do usuário para o header: avatar + nome/subtítulo, com menu de ações.
   Use dentro de <HeaderRight>. Os itens são <DropdownItem>.
   <UserMenu name="Alberto" sub="TI" initials="AR">
     <DropdownItem icon="user">Meu perfil</DropdownItem>
     <DropdownItem icon="ticket">Meus chamados</DropdownItem>
     <DropdownSep />
     <DropdownItem icon="logout" onClick={sair}>Sair</DropdownItem>
   </UserMenu> */
export function UserMenu({ name, sub, initials, children }) {
  const trigger = (
    <button type="button" className="usr-menu-btn" aria-haspopup="menu">
      <Avatar size="sm">{initials || (name ? name.slice(0, 2).toUpperCase() : '?')}</Avatar>
      {(name || sub) && (
        <span className="usr-menu-info">
          {name && <span className="usr-menu-name">{name}</span>}
          {sub && <span className="usr-menu-sub">{sub}</span>}
        </span>
      )}
      <i className="ti ti-chevron-down" style={{ fontSize: '.85rem', opacity: .7 }} />
    </button>
  );
  return <Dropdown align="right" trigger={trigger}>{children}</Dropdown>;
}
