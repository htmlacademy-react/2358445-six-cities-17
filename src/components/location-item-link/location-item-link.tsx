type LocationItemLinkProps = {
  isTab?: boolean;
  text: string;
  isActive?: boolean;
}

function LocationItemLink({isTab, text, isActive}: LocationItemLinkProps): JSX.Element {
  return (
    <div className={`locations__item-link${isTab ? ' tabs__item' : ''}${isActive && ' tabs__item--active'}`}>
      <span>{text}</span>
    </div>
  );
}

export default LocationItemLink;
