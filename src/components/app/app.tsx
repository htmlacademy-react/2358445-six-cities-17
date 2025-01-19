import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Page404 from '../../pages/page-404/page-404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import LoadingPage from '../../pages/loading-page/loading-page';
import {useAppSelector} from '../../hooks';
import { selectIsOffersDataLoading } from '../../store/cards-process/selectors';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';

type AppProps = {
  cities: string[];
}

function App({cities}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(selectIsOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingPage/>
    );
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage cities={cities} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Page404}
          element={<Page404 />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
