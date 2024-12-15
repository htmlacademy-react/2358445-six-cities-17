import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Offer, Review, OfferFull} from '../../types';
import PrivateRoute from '../../components/private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Page404 from '../../pages/page-404/page-404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

type AppProps = {
  cities: string[];
  reviews: Review[];
  offer: OfferFull;
  favorites: Offer[];
  neighbourhoodOffers: Offer[];
}

function App({cities, reviews, offer, favorites, neighbourhoodOffers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage cities={cities} authorizationStatus={AuthorizationStatus.NoAuth} countFavorites={favorites.length}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage authorizationStatus={AuthorizationStatus.NoAuth}/>}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage offer={offer} reviews={reviews} neighbourhoodOffers={neighbourhoodOffers} authorizationStatus={AuthorizationStatus.Auth} countFavorites={favorites.length}/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesPage offers={favorites} authorizationStatus={AuthorizationStatus.Auth} countFavorites={favorites.length}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Page404}
            element={<Page404 />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
