import {Helmet} from 'react-helmet-async';
import {AuthorizationStatus} from '../../const';
import {Offer} from '../../types';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import cn from 'classnames';

type FavoritesPageProps = {
  authorizationStatus: AuthorizationStatus;
  offers: Offer[];
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
      <main className={cn('page__main', 'page__main--favorites', {'page__main--favorites-empty': !offers.length})}>
        <Helmet>
          <title>Saved listing</title>
        </Helmet>
        <div className='page__favorites-container container'>
          <section className={cn('favorites', {'favorites--empty': !offers.length})}>
            {favoritesInner}
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesPage;
