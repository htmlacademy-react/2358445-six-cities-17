import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus, SortType} from '../const';
import {Offer} from '../types';

export const changeCity = createAction<string>('changeCity');

export const changeSort = createAction<SortType>('changeSort');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
