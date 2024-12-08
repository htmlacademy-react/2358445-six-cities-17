import {Helmet} from 'react-helmet-async';
import {AUTHORIZATION_STATUS} from '../../const';
import {Offer} from '../../types';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import SortForm from '../../components/sort-form/sort-form';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import MainEmpty from '../../components/main-empty/main-empty';
import cn from 'classnames';
import {useState} from 'react';

type MainPageProps = {
  cities: string[];
  offers: Offer[];
  authorizationStatus: AUTHORIZATION_STATUS;
  countFavorites: number;
}

function MainPage({cities, offers, countFavorites, authorizationStatus}: MainPageProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>('Paris');

  const handleCardHover = (offer: Offer | null) => {
    setActiveCard(offer);
  };

  const handleCityClick = (city: string | null) => {
    setActiveCity(city);
  };

  const mainInner = (offers.length ? (
    <>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{offers.length} places to stay in {activeCity}</b>
        <SortForm />
        <CardsList
          authorizationStatus={authorizationStatus}
          offers={offers}
          onCardHover={handleCardHover}
        />
      </section>
      <div className='cities__right-section'>
        <Map page='cities' offers={offers} selectedOffer={activeCard}/>
      </div>
    </>
  )
    :
    <MainEmpty/>
  );

  return (
    <div className='page page--gray page--main'>
      <Header isNavShow authorizationStatus={authorizationStatus} countFavorites={countFavorites}/>
      <main className={cn('page__main', 'page__main--index', {'page__main--index-empty': !offers.length})}>
        <Helmet>
          <title>Six cities</title>
        </Helmet>
        <Cities cities={cities} onCityClick={handleCityClick} activeCity={activeCity}/>
        <div className='cities'>
          <div className={cn('cities__places-container', 'container', {'cities__places-container--empty':!offers.length})}>
            {mainInner}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
