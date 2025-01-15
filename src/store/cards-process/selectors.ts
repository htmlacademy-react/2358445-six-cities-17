import {createSelector} from '@reduxjs/toolkit';
import {NameSpace, SortType} from '../../const';
import {AppState, Offers} from '../../types';
import {getCitySortOffers} from '../../utils';

export const selectIsOffersDataLoading = (state: Pick<AppState, NameSpace.Cards>): boolean => state[NameSpace.Cards].isOffersDataLoading;
export const selectIsErrorInOffersDataLoading = (state: Pick<AppState, NameSpace.Cards>): boolean => state[NameSpace.Cards].isErrorInOffersDataLoading;
export const selectActiveCity = (state: Pick<AppState, NameSpace.Cards>): string => state[NameSpace.Cards].city;
export const selectFavorites = (state: Pick<AppState, NameSpace.Cards>): Offers => state[NameSpace.Cards].favorites;
export const selectSortName = (state: Pick<AppState, NameSpace.Cards>): SortType => state[NameSpace.Cards].sort;
export const selectIsFavoriteListDataLoading = (state: Pick<AppState, NameSpace.Cards>): boolean => state[NameSpace.Cards].isFavoriteListDataLoading;
export const selectIsErrorInFavoriteListDataLoading = (state: Pick<AppState, NameSpace.Cards>): boolean => state[NameSpace.Cards].isErrorInFavoriteListDataLoading;

export const selectCitySortOffers = createSelector(
  [
    (state: Pick<AppState, NameSpace.Cards>) => state[NameSpace.Cards].offers,
    (state: Pick<AppState, NameSpace.Cards>) => state[NameSpace.Cards].sort,
    (state: Pick<AppState, NameSpace.Cards>) => state[NameSpace.Cards].city
  ],
  (offers, sort, city):Offers => getCitySortOffers(offers, sort, city)
);
