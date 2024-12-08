import {AuthorizationStatus} from '../../const';
import {Offer} from '../../types';
import CardsList from '../cards-list/cards-list';
import LocationItemLink from '../location-item-link/location-item-link';

type FavoritesListProps = {
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
};

type OffersByCity = {
  [key: string]: Offer[];
};

function FavoritesList({ offers, authorizationStatus = AuthorizationStatus.Unknown }: FavoritesListProps): JSX.Element {
  const offersGroup = offers.reduce((acc: OffersByCity, item: Offer)=>{
    const cityName: string = item.city.name;
    if (acc[cityName]) {
      acc[cityName].push(item);
    } else {
      acc[cityName] = [item];
    }
    return acc;
  }, {});
  const FavoritesListUl = Object.entries(offersGroup).map((items) => (
    <li className='favorites__locations-items' key={items[0]}>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <LocationItemLink text={items[0]} isTab={false} isActive />
        </div>
      </div>
      <CardsList
        authorizationStatus={authorizationStatus}
        offers={items[1]}
        page='favorites'
      />
    </li>
  ));
  return (
    <ul className='favorites__list'>
      {FavoritesListUl}
    </ul>
  );
}

export default FavoritesList;
