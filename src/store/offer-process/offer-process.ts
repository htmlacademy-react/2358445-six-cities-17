import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferProcessType } from '../../types';
import { addReviewAction, changeFavoriteAction, fetchNearByAction, fetchOfferAction, fetchReviewsAction } from '../api-actions';
import { changeIsFavorite } from '../../utils';

const initialState: OfferProcessType = {
  offer: null,
  isOfferDataLoading: false,
  isErrorInOfferDataLoading: false,
  reviews: [],
  isReviewsDataLoading: false,
  isErrorInReviewsDataLoading: false,
  isAddReviewLoading: false,
  isErrorInAddReviewLoading: false,
  nearBy: [],
  isNearByDataLoading: false,
  isErrorInNearByDataLoading: false
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
        state.isErrorInOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferDataLoading = false;
        state.isErrorInOfferDataLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.isErrorInOfferDataLoading = true;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
        state.isErrorInReviewsDataLoading = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsDataLoading = false;
        state.isErrorInReviewsDataLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
        state.isErrorInReviewsDataLoading = true;
      })
      .addCase(fetchNearByAction.pending, (state) => {
        state.isNearByDataLoading = true;
        state.isErrorInNearByDataLoading = false;
      })
      .addCase(fetchNearByAction.fulfilled, (state, action) => {
        state.isNearByDataLoading = false;
        state.isErrorInNearByDataLoading = false;
        state.nearBy = action.payload;
      })
      .addCase(fetchNearByAction.rejected, (state) => {
        state.isNearByDataLoading = false;
        state.isErrorInNearByDataLoading = true;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isAddReviewLoading = true;
        state.isErrorInAddReviewLoading = false;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.isAddReviewLoading = false;
        state.isErrorInAddReviewLoading = false;
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isAddReviewLoading = false;
        state.isErrorInAddReviewLoading = true;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        if (state.offer && state.offer.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
        state.nearBy = changeIsFavorite(action.payload.id, action.payload.isFavorite, state.nearBy);
      });
  }
});
