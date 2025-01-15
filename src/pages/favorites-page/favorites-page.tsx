import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import cn from 'classnames';
import {useAppSelector} from '../../hooks';
import LoadingPage from '../loading-page/loading-page';
import ServerErrorPage from '../server-error-page/server-error-page';
import {Page} from '../../const';
import { selectFavorites, selectIsErrorInFavoriteListDataLoading, selectIsFavoriteListDataLoading } from '../../store/cards-process/selectors';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(selectFavorites);
  const isFavoriteListDataLoading = useAppSelector(selectIsFavoriteListDataLoading);
  const isErrorInFavoriteListDataLoading = useAppSelector(selectIsErrorInFavoriteListDataLoading);

  if (isFavoriteListDataLoading) {
    return <LoadingPage/>;
  }

  if (isErrorInFavoriteListDataLoading) {
    return <ServerErrorPage page={Page.Favorites}/>;
  }

  const favoritesInner = (offers.length ?
    <><h1 className='favorites__title'>Saved listing</h1><FavoritesList offers={offers}/></>
    :
    <FavoritesEmpty/>
  );
  return (
    <div className={cn('page', {'page--favorites-empty': !offers.length})}>
      <Header isNavShow/>
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
