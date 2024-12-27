import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthData, ChangeFavoriteData, OfferFull, Offers, Review, ReviewData, Reviews, ThunkType, UserData} from '../types';
import {addToFavoriteList, removeFromFavoriteList} from './action';
import {APIRoute} from '../const';
import {dropToken, saveToken} from '../services/token';

const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkType>();

export const fetchOffersAction = createAppAsyncThunk<Offers, undefined>(
  'fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAppAsyncThunk<OfferFull, string>(
  'fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferFull>(APIRoute.Offer + offerId);
    return data;
  },
);

export const fetchReviewsAction = createAppAsyncThunk<Reviews, string>(
  'fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Reviews>(APIRoute.Comments + offerId);
    return data;
  },
);

export const fetchNearByAction = createAppAsyncThunk<Offers, string>(
  'fetchNearBy',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offer + offerId + APIRoute.NearBy);
    return data;
  },
);

export const fetchFavoriteListAction = createAppAsyncThunk<Offers, undefined>(
  'fetchFavoriteList',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);
    return data;
  },
);

export const addReviewAction = createAppAsyncThunk<Review, ReviewData>(
  'addReview',
  async ({ comment, rating, offerId }, { extra: api }) => {
    const { data } = await api.post<Review>(APIRoute.Comments + offerId, { comment, rating });
    return data;
  },
);

export const loginAction = createAppAsyncThunk<UserData, AuthData>(
  'login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  'logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const checkAuthAction = createAppAsyncThunk<UserData, undefined>(
  'checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const changeFavoriteAction = createAppAsyncThunk<void, ChangeFavoriteData>(
  'changeFavorite',
  async ({ status, offerId }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferFull>(`${APIRoute.FavoriteStatus}${offerId}/${String(status)}`, { offerId, status });
    if (status) {
      dispatch(addToFavoriteList(data));
    } else {
      dispatch(removeFromFavoriteList(data));
    }
  },
);
