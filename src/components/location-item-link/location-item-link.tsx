import {NavLink} from 'react-router-dom';

type LocationItemLinkProps = {
  isTab?: boolean;
  location: string;
  text: string;
  isActive?: boolean;
}

function LocationItemLink({isTab, location, text, isActive}: LocationItemLinkProps): JSX.Element {
  return (
    <NavLink className={`locations__item-link${isTab ? ' tabs__item' : ''}${isActive && ' tabs__item--active'}`} to={location}>
      <span>{text}</span>
    </NavLink>
  );
}

export default LocationItemLink;
