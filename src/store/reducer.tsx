import {createReducer} from '@reduxjs/toolkit';
import {addReviewToList, changeCity, changeSort, loadNearBy, loadOffer, loadOffers, loadReviews, requireAuthorization, setOffersDataLoadingStatus} from './action';
import {AuthorizationStatus, EMPTY_OFFER, FIRST_CITY, SortType} from '../const';
import {InitalState} from '../types';
import { getCitySortOffers } from '../utils';

const initialState: InitalState = {
  city: FIRST_CITY,
  offers: [],
  sortedOffers: [],
  offer: EMPTY_OFFER,
  sort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  reviews: [],
  nearBy: []
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
    })
    .addCase(addReviewToList, (state, action) => {
      state.reviews = [ action.payload, ...state.reviews ];
    })
    .addCase(loadNearBy, (state, action) => {
      state.nearBy = action.payload;
    });
});

export {reducer};
