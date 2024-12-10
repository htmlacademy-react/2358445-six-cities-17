import {Helmet} from 'react-helmet-async';
import {AuthorizationStatus} from '../../const';
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

type MainPageProps = {
  cities: string[];
  authorizationStatus: AuthorizationStatus;
  countFavorites: number;
}

function MainPage({cities, countFavorites, authorizationStatus}: MainPageProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const handleCardHover = (offer: Offer | null) => {
    setActiveCard(offer);
  };

  const mainInner = (offers.length ? (
    <>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{offers.length} places to stay in {activeCity}</b>
        <SortForm />
        <CardsList
          authorizationStatus={authorizationStatus}
          onCardHover={handleCardHover}
        />
      </section>
      <div className='cities__right-section'>
        <Map page='cities' selectedOffer={activeCard}/>
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
        <Cities cities={cities}/>
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
