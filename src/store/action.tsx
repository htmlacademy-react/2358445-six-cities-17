import {SortType} from '../const';
import {createAction} from '@reduxjs/toolkit';

export const changeCity = createAction<string>('changeCity');

export const changeSort = createAction<SortType>('changeSort');
