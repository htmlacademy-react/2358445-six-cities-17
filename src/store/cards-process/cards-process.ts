import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FIRST_CITY, NameSpace, SortType } from '../../const';
import { CardsProcessType } from '../../types';
import { changeFavoriteAction, fetchFavoriteListAction, fetchOffersAction } from '../api-actions';
import { changeIsFavorite } from '../../utils';

const initialState: CardsProcessType = {
  city: FIRST_CITY,
  sort: SortType.POPULAR,
  offers: [],
  isOffersDataLoading: false,
  isErrorInOffersDataLoading: false,
  favorites: [],
  isFavoriteListDataLoading: false,
  isErrorInFavoriteListDataLoading: false
};

export const cardsProcess = createSlice({
  name: NameSpace.Cards,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
      state.sort = SortType.POPULAR;
    },
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.isErrorInOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.isErrorInOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.isErrorInOffersDataLoading = true;
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
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites = [action.payload, ...state.favorites];
        } else {
          state.favorites = state.favorites.filter((item) => (item.id !== action.payload.id));
        }
        state.offers = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.offers);
      });
  }
});

export const { changeCity, changeSort } = cardsProcess.actions;
