import {createReducer} from '@reduxjs/toolkit';
import {changeCity, getOffers} from './action';
import {FIRST_CITY} from '../const';
import {offers} from '../mocks/offers';

const initialState = {
  city: FIRST_CITY,
  offers: offers.filter((el) => el.city.name === FIRST_CITY),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = offers.filter((el) => el.city.name === state.city);
    });
});

export {reducer};
