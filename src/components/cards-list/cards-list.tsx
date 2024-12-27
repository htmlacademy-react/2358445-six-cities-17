import {Offer} from '../../types';
import Card from '../../components/card/card';
import cn from 'classnames';
import {Page} from '../../const';


type CardsListProps = {
  offers: Offer[];
  page?: Page.Cities | Page.NearPlaces | Page.Favorites;
  onCardHover?: (offer: Offer | null) => void;
};

function CardsList({page = Page.Cities, offers, onCardHover}: CardsListProps): JSX.Element {
  const cardMouseEnterHandler = (offer: Offer): void => onCardHover?.(offer);

  const cardMouseLeaveHandler = (): void => onCardHover?.(null);

  const cardsList = offers.map((offer) => (
    <Card
      key={offer.id}
      offer={offer}
      page={page}
      onCardMouseEnter={() => cardMouseEnterHandler(offer)}
      onCardMouseLeave={cardMouseLeaveHandler}
    />
  ));
  return (
    <div className={cn(
      {'cities__places-list places__list tabs__content': page === Page.Cities},
      {'near-places__list places__list': page === Page.NearPlaces},
      {'favorites__places': page === Page.Favorites}
    )}
    >
      {cardsList}
    </div>
  );
}

export default CardsList;
