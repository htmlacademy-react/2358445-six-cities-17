import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {APP_ROUTE, AUTHORIZATION_STATUS} from '../../const';
import {Offer, Review, OfferFull} from '../../types';
import PrivateRoute from '../../components/private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Page404 from '../../pages/page-404/page-404';
import UseScrollToTop from '../hooks/use-scroll-to-top/use-scroll-to-top';

type AppProps = {
  cities: string[];
  offers: Offer[];
  reviews: Review[];
  offer: OfferFull;
  favorites: Offer[];
  neighbourhoodOffers: Offer[];
}

function App({cities, offers, reviews, offer, favorites, neighbourhoodOffers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <UseScrollToTop/>
        <Routes>
          <Route
            path={APP_ROUTE.Main}
            element={<MainPage cities={cities} offers={offers} authorizationStatus={AUTHORIZATION_STATUS.NoAuth} countFavorites={favorites.length}/>}
          />
          <Route
            path={APP_ROUTE.Login}
            element={<LoginPage authorizationStatus={AUTHORIZATION_STATUS.NoAuth}/>}
          />
          <Route
            path={APP_ROUTE.Offer}
            element={<OfferPage offer={offer} reviews={reviews} neighbourhoodOffers={neighbourhoodOffers} authorizationStatus={AUTHORIZATION_STATUS.Auth} countFavorites={favorites.length}/>}
          />
          <Route
            path={APP_ROUTE.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AUTHORIZATION_STATUS.NoAuth}
              >
                <FavoritesPage offers={favorites} authorizationStatus={AUTHORIZATION_STATUS.Auth} countFavorites={favorites.length}/>
              </PrivateRoute>
            }
          />
          <Route
            path={APP_ROUTE.Page404}
            element={<Page404 />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
