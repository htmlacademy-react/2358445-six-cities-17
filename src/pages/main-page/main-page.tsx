import {Helmet} from 'react-helmet-async';
import {Offer} from '../../types';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import SortForm from '../../components/sort-form/sort-form';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import MainEmpty from '../../components/main-empty/main-empty';
import cn from 'classnames';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {getCitySortOffers, getMapPoints} from '../../utils';

type MainPageProps = {
  cities: string[];
  countFavorites: number;
}

function MainPage({cities, countFavorites}: MainPageProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const sort = useAppSelector((state) => state.sort);
  const city = useAppSelector((state) => state.city);
  const sortedOffers = getCitySortOffers(offers, sort, city);
  const mapPoints = getMapPoints(sortedOffers);

  const handleCardHover = (offer: Offer | null) => {
    setActiveCard(offer);
  };

  const mainInner = (sortedOffers.length ? (
    <>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{sortedOffers.length} places to stay in {activeCity}</b>
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
  )
    :
    <MainEmpty/>
  );

  return (
    <div className='page page--gray page--main'>
      <Header isNavShow countFavorites={countFavorites}/>
      <main className={cn('page__main', 'page__main--index', {'page__main--index-empty': !sortedOffers.length})}>
        <Helmet>
          <title>Six cities</title>
        </Helmet>
        <Cities cities={cities}/>
        <div className='cities'>
          <div className={cn('cities__places-container', 'container', {'cities__places-container--empty':!sortedOffers.length})}>
            {mainInner}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
