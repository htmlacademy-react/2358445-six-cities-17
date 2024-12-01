import {Helmet} from 'react-helmet-async';
import {AuthorizationStatus, Offer} from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

type FavoritesPageProps = {
  authorizationStatus: AuthorizationStatus;
  offers: Array<Offer>;
}

function FavoritesPage({offers, authorizationStatus}: FavoritesPageProps): JSX.Element {
  const favoritesInner = (offers.length ?
    <><h1 className='favorites__title'>Saved listing</h1><FavoritesList authorizationStatus={authorizationStatus} offers={offers}/></>
    :
    <FavoritesEmpty/>
  );
  return (
    <div className='page'>
      <Header isNavShow authorizationStatus={authorizationStatus}/>
      <main className={`page__main page__main--favorites${!offers.length ? ' page__main--favorites-empty' : ''}`}>
        <Helmet>
          <title>Saved listing</title>
        </Helmet>
        <div className='page__favorites-container container'>
          <section className={`favorites${!offers.length ? ' favorites--empty' : ''}`}>
            {favoritesInner}
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesPage;
