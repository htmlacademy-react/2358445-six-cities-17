import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {CITIES} from './const';
import {reviews} from './mocks/reviews';
import {offer} from './mocks/offer';
import {savedListing} from './mocks/saved-listing';
import {neighbourhoodOffers} from './mocks/neighbourhood-offers';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        cities = {CITIES}
        reviews = {reviews}
        offer = {offer}
        favorites = {savedListing}
        neighbourhoodOffers = {neighbourhoodOffers}
      />
    </Provider>
  </React.StrictMode>
);
