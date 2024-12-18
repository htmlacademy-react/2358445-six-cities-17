import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSort, loadOffers, requireAuthorization} from './action';
import {AuthorizationStatus, FIRST_CITY, SortType} from '../const';
import {getCitySortOffers} from '../utils';
import {InitalState} from '../types';



const initialState: InitalState = {
  city: FIRST_CITY,
  offers: [],
  sort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sort = SortType.POPULAR;
      state.offers = getCitySortOffers(offers, state.sort, state.city);
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
      state.offers = getCitySortOffers(offers, state.sort, state.city);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
