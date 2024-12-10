import {AuthorizationStatus} from '../../const';
import {Offer} from '../../types';
import Card from '../../components/card/card';
import cn from 'classnames';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';

type CardsListProps = {
  page?: 'cities' | 'near-places' | 'favorites';
  authorizationStatus: AuthorizationStatus;
  onCardHover?: (offer: Offer | null) => void;
};

function CardsList({page = 'cities', onCardHover, authorizationStatus = AuthorizationStatus.Unknown}: CardsListProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  if (onCardHover) {
    onCardHover(activeCard);
  }

  const cardMouseEnterHandler = (offer: Offer): void => {
    setActiveCard(offer);
  };

  const cardMouseLeaveHandler = (): void => {
    setActiveCard(null);
  };

  const cardsList = offers.map((offer) => (
    <Card
      key={offer.id}
      offer={offer}
      authorizationStatus={authorizationStatus}
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
