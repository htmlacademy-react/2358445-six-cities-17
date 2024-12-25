import {createReducer} from '@reduxjs/toolkit';
import {addReviewToList, addToFavoriteList, changeCity, changeSort, loadFavoriteList, loadNearBy, loadOffer, loadOffers, loadReviews, removeFromFavoriteList, requireAuthorization, setFavoriteListDataLoadingStatus, setNearByDataLoadingStatus, setOfferDataLoadingStatus, setOffersDataLoadingStatus, setReviewsDataLoadingStatus} from './action';
import {AuthorizationStatus, EMPTY_OFFER, FIRST_CITY, SortType} from '../const';
import {InitalState} from '../types';
import {changeIsFavorite, getCitySortOffers} from '../utils';

const initialState: InitalState = {
  city: FIRST_CITY,
  offers: [],
  sortedOffers: [],
  offer: EMPTY_OFFER,
  sort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  isReviewsDataLoading: false,
  isNearByDataLoading: false,
  isFavoriteListDataLoading: false,
  reviews: [],
  nearBy: [],
  favorites: []
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
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(setNearByDataLoadingStatus, (state, action) => {
      state.isNearByDataLoading = action.payload;
    })
    .addCase(setFavoriteListDataLoadingStatus, (state, action) => {
      state.isFavoriteListDataLoading = action.payload;
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
    })
    .addCase(addToFavoriteList, (state, action) => {
      state.favorites = [ action.payload, ...state.favorites ];
      if (state.offer.id === action.payload.id) {
        state.offer.isFavorite = action.payload.isFavorite;
      }
      state.offers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.offers);
      state.sortedOffers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.sortedOffers);
      state.nearBy = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.nearBy);
    })
    .addCase(removeFromFavoriteList, (state, action) => {
      state.favorites = state.favorites.filter((item) =>(item.id !== action.payload.id));
      if (state.offer.id === action.payload.id) {
        state.offer.isFavorite = action.payload.isFavorite;
      }
      state.offers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.offers);
      state.sortedOffers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.sortedOffers);
      state.nearBy = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.nearBy);
    })
    .addCase(loadFavoriteList, (state, action) => {
      state.favorites = action.payload;
    });
});

export {reducer};
