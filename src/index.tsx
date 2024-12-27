import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {CITIES} from './const';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchFavoriteListAction, fetchOffersAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer/>
      <App
        cities = {CITIES}
      />
    </Provider>
  </React.StrictMode>
);
