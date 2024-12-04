import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {cities} from './const';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import {offer} from './mocks/offer';
import {savedListing} from './mocks/saved-listing';
import { neighbourhoodOffers } from './mocks/neighbourhood-offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      cities = {cities}
      offers = {offers}
      reviews = {reviews}
      offer = {offer}
      favorites = {savedListing}
      neighbourhoodOffers = {neighbourhoodOffers}
    />
  </React.StrictMode>
);
