import {createAction} from '@reduxjs/toolkit';
import {SortType} from '../const';
import {OfferFull} from '../types';

export const changeCity = createAction<string>('changeCity');

export const changeSort = createAction<SortType>('changeSort');

export const addToFavoriteList = createAction<OfferFull>('addToFavoriteList');

export const removeFromFavoriteList = createAction<OfferFull>('removeFromFavoriteList');
