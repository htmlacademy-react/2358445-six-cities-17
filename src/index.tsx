import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {CITIES} from './const';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchFavoriteListAction, fetchOffersAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction())
  .then((response) => {
    if (response.meta.requestStatus === 'fulfilled') {
      store.dispatch(fetchFavoriteListAction());
    }
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App
          cities = {CITIES}
        />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
