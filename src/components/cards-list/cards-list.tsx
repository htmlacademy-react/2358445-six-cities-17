import {AUTHORIZATION_STATUS} from '../../const';
import {Offer} from '../../types';
import Card from '../../components/card/card';
import cn from 'classnames';
import { useState } from 'react';

type CardsListProps = {
  offers: Offer[];
  page?: 'cities' | 'near-places' | 'favorites';
  authorizationStatus: AUTHORIZATION_STATUS;
  onCardHover?: (offer: Offer | null) => void;
};

function CardsList({page = 'cities', offers, onCardHover, authorizationStatus = AUTHORIZATION_STATUS.Unknown}: CardsListProps): JSX.Element {
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
      onCardMouseLeave={() => {
        cardMouseLeaveHandler();
      }}
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
