import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthData, OfferFull, Offers, Review, ReviewData, Reviews, ThunkType, UserData} from '../types';
import {addReviewToList, loadNearBy, loadOffer, loadOffers, loadReviews, redirectToRoute, requireAuthorization, setOffersDataLoadingStatus} from './action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {dropToken, saveToken} from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, ThunkType>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, ThunkType>(
  'fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<OfferFull>(APIRoute.Offer + offerId);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadOffer(data));
    } catch {
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(redirectToRoute(AppRoute.Page404));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, ThunkType>(
  'fetchReviews',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Reviews>(APIRoute.Comments + offerId);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadReviews(data));
  },
);

export const fetchNearByAction = createAsyncThunk<void, string, ThunkType>(
  'fetchNearBy',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offer + offerId + APIRoute.NearBy);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadNearBy(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkType>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, ThunkType>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkType>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const addReviewAction = createAsyncThunk<void, ReviewData, ThunkType>(
  'addReview',
  async ({ comment, rating, offerId }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(APIRoute.Comments + offerId, { comment, rating });
    dispatch(addReviewToList(data));
  },
);
