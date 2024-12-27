import {createReducer} from '@reduxjs/toolkit';
import {addToFavoriteList, changeCity, changeSort, removeFromFavoriteList} from './action';
import {AuthorizationStatus, FIRST_CITY, SortType} from '../const';
import {InitalState} from '../types';
import {changeIsFavorite, getCitySortOffers} from '../utils';
import {addReviewAction, checkAuthAction, fetchFavoriteListAction, fetchNearByAction, fetchOfferAction, fetchOffersAction, fetchReviewsAction, loginAction, logoutAction} from './api-actions';

const initialState: InitalState = {
  city: FIRST_CITY,
  sort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  isErrorInAuthRequest: false,
  isErrorInCheckAuthRequest: false,
  offers: [],
  isOffersDataLoading: false,
  isErrorInOffersDataLoading: false,
  sortedOffers: [],
  offer: null,
  isOfferDataLoading: false,
  isErrorInOfferDataLoading: false,
  reviews: [],
  isReviewsDataLoading: false,
  isErrorInReviewsDataLoading: false,
  isAddReviewLoading: false,
  isErrorInAddReviewLoading: false,
  nearBy: [],
  isNearByDataLoading: false,
  isErrorInNearByDataLoading: false,
  favorites: [],
  isFavoriteListDataLoading: false,
  isErrorInFavoriteListDataLoading: false,
  userInfo: null
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
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersDataLoading = true;
      state.isErrorInOffersDataLoading = false;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.isOffersDataLoading = false;
      state.isErrorInOffersDataLoading = false;
      state.offers = action.payload;
      state.sortedOffers = getCitySortOffers(state.offers, state.sort, state.city);
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isOffersDataLoading = false;
      state.isErrorInOffersDataLoading = true;
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.isOfferDataLoading = true;
      state.isErrorInOfferDataLoading = false;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.isOfferDataLoading = false;
      state.isErrorInOfferDataLoading = false;
      state.offer = action.payload;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.isOfferDataLoading = false;
      state.isErrorInOfferDataLoading = true;
    })
    .addCase(fetchReviewsAction.pending, (state) => {
      state.isReviewsDataLoading = true;
      state.isErrorInReviewsDataLoading = false;
    })
    .addCase(fetchReviewsAction.fulfilled, (state, action) => {
      state.isReviewsDataLoading = false;
      state.isErrorInReviewsDataLoading = false;
      state.reviews = action.payload;
    })
    .addCase(fetchReviewsAction.rejected, (state) => {
      state.isReviewsDataLoading = false;
      state.isErrorInReviewsDataLoading = true;
    })
    .addCase(fetchNearByAction.pending, (state) => {
      state.isNearByDataLoading = true;
      state.isErrorInNearByDataLoading = false;
    })
    .addCase(fetchNearByAction.fulfilled, (state, action) => {
      state.isNearByDataLoading = false;
      state.isErrorInNearByDataLoading = false;
      state.nearBy = action.payload;
    })
    .addCase(fetchNearByAction.rejected, (state) => {
      state.isNearByDataLoading = false;
      state.isErrorInNearByDataLoading = true;
    })
    .addCase(fetchFavoriteListAction.pending, (state) => {
      state.isFavoriteListDataLoading = true;
      state.isErrorInFavoriteListDataLoading = false;
    })
    .addCase(fetchFavoriteListAction.fulfilled, (state, action) => {
      state.isFavoriteListDataLoading = false;
      state.isErrorInFavoriteListDataLoading = false;
      state.favorites = action.payload;
    })
    .addCase(fetchFavoriteListAction.rejected, (state) => {
      state.isFavoriteListDataLoading = false;
      state.isErrorInFavoriteListDataLoading = true;
    })
    .addCase(addReviewAction.pending, (state) => {
      state.isAddReviewLoading = true;
      state.isErrorInAddReviewLoading = false;
    })
    .addCase(addReviewAction.fulfilled, (state, action) => {
      state.isAddReviewLoading = false;
      state.isErrorInAddReviewLoading = false;
      state.reviews = [ action.payload, ...state.reviews ];
    })
    .addCase(addReviewAction.rejected, (state) => {
      state.isAddReviewLoading = false;
      state.isErrorInAddReviewLoading = true;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.isErrorInAuthRequest = false;
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userInfo = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.isErrorInAuthRequest = true;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userInfo = null;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.isErrorInCheckAuthRequest = false;
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userInfo = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.isErrorInCheckAuthRequest = true;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(addToFavoriteList, (state, action) => {
      state.favorites = [ action.payload, ...state.favorites ];
      if (state.offer && state.offer.id === action.payload.id) {
        state.offer.isFavorite = action.payload.isFavorite;
      }
      state.offers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.offers);
      state.sortedOffers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.sortedOffers);
      state.nearBy = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.nearBy);
    })
    .addCase(removeFromFavoriteList, (state, action) => {
      state.favorites = state.favorites.filter((item) =>(item.id !== action.payload.id));
      if (state.offer && state.offer.id === action.payload.id) {
        state.offer.isFavorite = action.payload.isFavorite;
      }
      state.offers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.offers);
      state.sortedOffers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.sortedOffers);
      state.nearBy = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.nearBy);
    });
});

export {reducer};
