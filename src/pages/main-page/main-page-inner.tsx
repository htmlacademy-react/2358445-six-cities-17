import {useCallback, useState} from 'react';
import {Offer, Offers} from '../../types';
import {getMapPoints} from '../../utils';
import SortForm from '../../components/sort-form/sort-form';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import {selectActiveCity} from '../../store/cards-process/selectors';
import {useAppSelector} from '../../hooks';

type MainPageInnerProps = {
  sortedOffers: Offers;
}

function MainPageInner({sortedOffers}: MainPageInnerProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const activeCity = useAppSelector(selectActiveCity);
  const mapPoints = getMapPoints(sortedOffers);

  const handleCardHover = useCallback((offer: Offer | null) => {
    setActiveCard(offer);
  }, []);

  return (
    <>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{sortedOffers.length} place{sortedOffers.length > 1 && 's'} to stay in {activeCity}</b>
        <SortForm />
        <CardsList
          offers={sortedOffers}
          onCardHover={handleCardHover}
        />
      </section>
      <div className='cities__right-section'>
        <Map page='cities' offers={mapPoints} selectedOffer={activeCard}/>
      </div>
    </>
  );
}

export default MainPageInner;
