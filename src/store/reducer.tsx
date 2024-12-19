import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSort, loadOffer, loadOffers, loadReviews, requireAuthorization, setOffersDataLoadingStatus} from './action';
import {AuthorizationStatus, FIRST_CITY, SortType} from '../const';
import {getCitySortOffers} from '../utils';
import {InitalState} from '../types';

const initialState: InitalState = {
  city: FIRST_CITY,
  offers: [],
  offer: {
    'id': '',
    'title': '',
    'description': '',
    'type': '',
    'price': 0,
    'images': [],
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 0,
      'longitude': 0,
      'zoom': 0
    },
    'goods': [],
    'host': {
      'isPro': true,
      'name': '',
      'avatarUrl': ''
    },
    'isPremium': false,
    'isFavorite': false,
    'rating': 0,
    'bedrooms': 0,
    'maxAdults': 0
  },
  sortedOffers: [],
  sort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  reviews: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sort = SortType.POPULAR;
      state.sortedOffers = getCitySortOffers(state.offers, state.sort, state.city);
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
      state.sortedOffers = getCitySortOffers(state.offers, state.sort, state.city);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.sortedOffers = getCitySortOffers(state.offers, state.sort, state.city);
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export {reducer};
