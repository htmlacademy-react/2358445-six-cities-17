import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {CITIES} from './const';
import {savedListing} from './mocks/saved-listing';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer/>
      <App
        cities = {CITIES}
        favorites = {savedListing}
      />
    </Provider>
  </React.StrictMode>
);
