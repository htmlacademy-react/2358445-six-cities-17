import {Offer} from '../../types';
import Card from '../../components/card/card';
import cn from 'classnames';


type CardsListProps = {
  offers: Offer[];
  page?: 'cities' | 'near-places' | 'favorites';
  onCardHover?: (offer: Offer | null) => void;
};

function CardsList({page = 'cities', offers, onCardHover}: CardsListProps): JSX.Element {
  const cardMouseEnterHandler = (offer: Offer): void => onCardHover?.(offer);

  const cardMouseLeaveHandler = (): void => onCardHover?.(null);

  const cardsList = offers.map((offer) => (
    <Card
      key={offer.id}
      offer={offer}
      page={page}
      onCardMouseEnter={() => {
        cardMouseEnterHandler(offer);
      }}
      onCardMouseLeave={cardMouseLeaveHandler}
    />
  ));
  return (
    <div className={cn(
      {'cities__places-list places__list tabs__content': page === 'cities'},
      {'near-places__list places__list': page === 'near-places'},
      {'favorites__places': page === 'favorites'}
    )}
    >
      {cardsList}
    </div>
  );
}

export default CardsList;
