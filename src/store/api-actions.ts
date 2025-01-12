import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthData, ChangeFavoriteData, Offer, OfferFull, Offers, Review, ReviewData, Reviews, ThunkType, UserData} from '../types';
import {APIRoute, NameSpace} from '../const';
import {dropToken, saveToken} from '../services/token';

const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkType>();

export const fetchOffersAction = createAppAsyncThunk<Offers, undefined>(
  `${NameSpace.Cards}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAppAsyncThunk<OfferFull, string>(
  `${NameSpace.Offer}/fetchOffer`,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferFull>(APIRoute.Offer + offerId);
    return data;
  },
);

export const fetchReviewsAction = createAppAsyncThunk<Reviews, string>(
  `${NameSpace.Offer}/fetchReviews`,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Reviews>(APIRoute.Comments + offerId);
    return data;
  },
);

export const fetchNearByAction = createAppAsyncThunk<Offers, string>(
  `${NameSpace.Offer}/fetchNearBy`,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offer + offerId + APIRoute.NearBy);
    return data;
  },
);

export const fetchFavoriteListAction = createAppAsyncThunk<Offers, undefined>(
  `${NameSpace.Cards}/fetchFavoriteList`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);
    return data;
  },
);

export const addReviewAction = createAppAsyncThunk<Review, ReviewData>(
  `${NameSpace.Offer}/addReview`,
  async ({ comment, rating, offerId }, { extra: api }) => {
    const { data } = await api.post<Review>(APIRoute.Comments + offerId, { comment, rating });
    return data;
  },
);

export const loginAction = createAppAsyncThunk<UserData, AuthData>(
  `${NameSpace.User}/login`,
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const checkAuthAction = createAppAsyncThunk<UserData, undefined>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const changeFavoriteAction = createAppAsyncThunk<Offer, ChangeFavoriteData>(
  `${NameSpace.Cards}/changeFavorite`,
  async ({ status, offerId }, { extra: api }) => {
    const { data } = await api.post<OfferFull>(`${APIRoute.FavoriteStatus}${offerId}/${String(status)}`, { offerId, status });
    return data;
  },
);
