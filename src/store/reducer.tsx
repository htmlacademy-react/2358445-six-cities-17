import {createReducer} from '@reduxjs/toolkit';
import {changeCity, getOffers, changeSort} from './action';
import {FIRST_CITY, FIRST_SORT, SortTypes} from '../const';
import {offers} from '../mocks/offers';

const initialState = {
  city: FIRST_CITY,
  offers: offers.filter((el) => el.city.name === FIRST_CITY),
  sort: FIRST_SORT
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state) => {
      switch(state.sort) {
        case SortTypes.TOP_RATED_FIRST:
          state.offers = offers.filter((el) => el.city.name === state.city).sort((a, b) => b.rating - a.rating);
          break;
        case SortTypes.PRICE_LOW_TO_HIGH:
          state.offers = offers.filter((el) => el.city.name === state.city).sort((a, b) => a.price - b.price);
          break;
        case SortTypes.PRICE_HIGH_TO_LOW:
          state.offers = offers.filter((el) => el.city.name === state.city).sort((a, b) => b.price - a.price);
          break;
        case SortTypes.POPULAR: state.offers = offers.filter((el) => el.city.name === state.city);
      }
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    });
});

export {reducer};
