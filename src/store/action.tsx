import {createAction} from '@reduxjs/toolkit';
import { SortTypes } from '../const';

export const changeCity = createAction<string>('changeCity');

export const getOffers = createAction('getOffers');

export const changeSort = createAction<SortTypes>('changeSort');
