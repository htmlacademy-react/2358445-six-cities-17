import {createAction} from '@reduxjs/toolkit';
import {AppRoute, AuthorizationStatus, SortType} from '../const';
import {Offer, OfferFull, Review, Reviews} from '../types';

export const changeCity = createAction<string>('changeCity');

export const changeSort = createAction<SortType>('changeSort');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const loadOffer = createAction<OfferFull>('loadOffer');

export const setOfferDataLoadingStatus = createAction<boolean>('setOfferDataLoadingStatus');

export const loadReviews = createAction<Reviews>('loadReviews');

export const setReviewsDataLoadingStatus = createAction<boolean>('setReviewsDataLoadingStatus');

export const addReviewToList = createAction<Review>('addReviewToList');

export const loadNearBy = createAction<Offer[]>('loadNearBy');

export const setNearByDataLoadingStatus = createAction<boolean>('setNearByDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const addToFavoriteList = createAction<OfferFull>('addToFavoriteList');

export const removeFromFavoriteList = createAction<OfferFull>('removeFromFavoriteList');

export const loadFavoriteList = createAction<Offer[]>('loadFavoriteList');

export const setFavoriteListDataLoadingStatus = createAction<boolean>('setFavoriteListDataLoadingStatus');
