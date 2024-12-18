import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSort} from './action';
import {FIRST_CITY, SortType} from '../const';
import {offers} from '../mocks/offers';
import {getCitySortOffers} from '../utils';

const initialState = {
  city: FIRST_CITY,
  offers: offers.filter((el) => el.city.name === FIRST_CITY),
  sort: SortType.POPULAR
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
    });
});

export {reducer};
