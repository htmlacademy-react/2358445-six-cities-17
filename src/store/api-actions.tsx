import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState, AuthData, OfferFull, Offers, Reviews, UserData } from '../types';
import { AxiosInstance } from 'axios';
import { loadNearBy, loadOffer, loadOffers, loadReviews, redirectToRoute, requireAuthorization, setOffersDataLoadingStatus } from './action';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<OfferFull>(APIRoute.Offer + offerId);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadOffer(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.Page404));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Reviews>(APIRoute.Comments + offerId);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadReviews(data));
  },
);

export const fetchNearByAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'fetchNearBy',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offer + offerId + APIRoute.NearBy);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadNearBy(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
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

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
