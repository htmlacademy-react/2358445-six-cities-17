import {createSelector} from '@reduxjs/toolkit';
import {NameSpace, SortType} from '../../const';
import {AppState, Offers} from '../../types';
import {getCitySortOffers} from '../../utils';

export const selectIsOffersDataLoading = (state: AppState): boolean => state[NameSpace.Cards].isOffersDataLoading;
export const selectIsErrorInOffersDataLoading = (state: AppState): boolean => state[NameSpace.Cards].isErrorInOffersDataLoading;
export const selectActiveCity = (state: AppState): string => state[NameSpace.Cards].city;
export const selectFavorites = (state: AppState): Offers => state[NameSpace.Cards].favorites;
export const selectSortName = (state: AppState): SortType => state[NameSpace.Cards].sort;
export const selectIsFavoriteListDataLoading = (state: AppState): boolean => state[NameSpace.Cards].isFavoriteListDataLoading;
export const selectIsErrorInFavoriteListDataLoading = (state: AppState): boolean => state[NameSpace.Cards].isErrorInFavoriteListDataLoading;

export const selectCitySortOffers = createSelector(
  [
    (state: AppState) => state[NameSpace.Cards].offers,
    (state: AppState) => state[NameSpace.Cards].sort,
    (state: AppState) => state[NameSpace.Cards].city
  ],
  (offers, sort, city):Offers => getCitySortOffers(offers, sort, city)
);
