import {createReducer} from '@reduxjs/toolkit';
import {changeCity, getOffers, changeSort} from './action';
import {FIRST_CITY, FIRST_SORT} from '../const';
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
        case 'Top rated first':
          state.offers = offers.filter((el) => el.city.name === state.city).sort((a, b) => b.rating - a.rating);
          break;
        case 'Price: low to high':
          state.offers = offers.filter((el) => el.city.name === state.city).sort((a, b) => a.price - b.price);
          break;
        case 'Price: high to low':
          state.offers = offers.filter((el) => el.city.name === state.city).sort((a, b) => b.price - a.price);
          break;
        case 'Popular': state.offers = offers.filter((el) => el.city.name === state.city);
      }
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    });
});

export {reducer};
