import cn from 'classnames';

type LocationItemLinkProps = {
  isTab?: boolean;
  text: string;
  isActive?: boolean;
}

function LocationItemLink({isTab, text, isActive}: LocationItemLinkProps): JSX.Element {
  return (
    <div className={cn('locations__item-link', {'tabs__item': isTab}, {'tabs__item--active': isActive})}>
      <span>{text}</span>
    </div>
  );
}

export default LocationItemLink;
