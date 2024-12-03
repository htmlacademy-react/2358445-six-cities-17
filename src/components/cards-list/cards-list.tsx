import {AuthorizationStatus, Offer} from '../../const';
import Card from '../../components/card/card';
import {MouseEvent} from 'react';

type CardsListProps = {
  offers: Array<Offer>;
  page?: 'cities' | 'near-places' | 'favorites';
  authorizationStatus: AuthorizationStatus;
  cardHover: (offer: Offer | null) => void;
};

function CardsList({page = 'cities', offers, cardHover, authorizationStatus = AuthorizationStatus.Unknown}: CardsListProps): JSX.Element {
  const cardsList = offers.map((offer) => (
    <article
      key={offer.id}
      className={`${page}__card place-card`}
      onMouseEnter={(evt: MouseEvent<HTMLElement>) => {
        evt.preventDefault();
        cardHover(offer);
      }}
      onMouseLeave={(evt: MouseEvent<HTMLElement>) => {
        evt.preventDefault();
        cardHover(null);
      }}
    >
      <Card
        key={offer.id}
        id={offer.id}
        title={offer.title}
        type={offer.type}
        price={offer.price}
        previewImage={offer.previewImage}
        isPremium={offer.isPremium}
        isFavorite={offer.isFavorite}
        rating={offer.rating}
        authorizationStatus={authorizationStatus}
        page={page}
      />
    </article>
  ));
  const cardsListClass = (()=> {
    switch(page) {
      case 'cities': {
        return 'cities__places-list places__list tabs__content';
      }
      case 'near-places': {
        return `${page}__list places__list`;
      }
      case 'favorites': {
        return 'favorites__places';
      }
    }
  });
  return (
    <div className={cardsListClass()}>
      {cardsList}
    </div>
  );
}

export default CardsList;
