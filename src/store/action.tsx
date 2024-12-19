import {createAction} from '@reduxjs/toolkit';
import {AppRoute, AuthorizationStatus, SortType} from '../const';
import {Offer, OfferFull, Reviews} from '../types';

export const changeCity = createAction<string>('changeCity');

export const changeSort = createAction<SortType>('changeSort');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const loadOffer = createAction<OfferFull>('loadOffer');

export const loadReviews = createAction<Reviews>('loadReviews');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
