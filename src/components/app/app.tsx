import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus, City, Offer, Review, OfferFull} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Page404 from '../../pages/page-404/page-404';

type AppProps = {
  cities: Array<City>;
  offers: Array<Offer>;
  reviews: Array<Review>;
  offer: OfferFull;
  favorites: Array<Offer>;
  neighbourhoodOffers: Array<Offer>;
}

function App({cities, offers, reviews, offer, favorites, neighbourhoodOffers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage cities={cities} offers={offers} authorizationStatus={AuthorizationStatus.NoAuth}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage authorizationStatus={AuthorizationStatus.NoAuth}/>}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage offer={offer} reviews={reviews} neighbourhoodOffers={neighbourhoodOffers} authorizationStatus={AuthorizationStatus.Auth}/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesPage offers={favorites} authorizationStatus={AuthorizationStatus.Auth}/>
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<Page404 />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
