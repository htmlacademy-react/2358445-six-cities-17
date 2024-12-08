import cn from 'classnames';
import {Link} from 'react-router-dom';

type LocationItemLinkProps = {
  isTab?: boolean;
  text: string;
  isActive?: boolean;
}

function LocationItemLink({isTab, text, isActive}: LocationItemLinkProps): JSX.Element {
  return (
    <Link className={cn('locations__item-link', {'tabs__item': isTab}, {'tabs__item--active': isActive})} to='/'>
      <span>{text}</span>
    </Link>
  );
}

export default LocationItemLink;
