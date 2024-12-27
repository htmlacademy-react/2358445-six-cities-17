import {createSelector} from '@reduxjs/toolkit';
import {getCitySortOffers} from '../utils';
import {InitalState, Offers} from '../types';

export const selectCitySortOffers = createSelector(
  [
    (state:InitalState) => state.offers,
    (state:InitalState) => state.sort,
    (state:InitalState) => state.city
  ],
  (offers, sort, city):Offers => getCitySortOffers(offers, sort, city)
);

export const selectAuthorizationStatus = (state:InitalState) => state.authorizationStatus;
export const selectIsOffersDataLoading = (state:InitalState) => state.isOffersDataLoading;
export const selectIsErrorInOffersDataLoading = (state:InitalState) => state.isErrorInOffersDataLoading;
export const selectActiveCity = (state:InitalState) => state.city;
export const selectFavorites = (state:InitalState) => state.favorites;
export const selectUserName = (state:InitalState) => state.userInfo && state.userInfo.email;
export const selectNearByOffers = (state:InitalState) => state.nearBy;
export const selectSortName = (state:InitalState) => state.sort;
export const selectIsFavoriteListDataLoading = (state:InitalState) => state.isFavoriteListDataLoading;
export const selectIsErrorInFavoriteListDataLoading = (state:InitalState) => state.isErrorInFavoriteListDataLoading;
export const selectOffer = (state:InitalState) => state.offer;
export const selectReviews = (state:InitalState) => state.reviews;
export const selectIsOfferDataLoading = (state:InitalState) => state.isOfferDataLoading;
export const selectIsErrorInOfferDataLoading = (state:InitalState) => state.isErrorInOfferDataLoading;
export const selectIsReviewsDataLoading = (state:InitalState) => state.isReviewsDataLoading;
export const selectIsNearByDataLoading = (state:InitalState) => state.isNearByDataLoading;
