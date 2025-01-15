import {system, name, internet} from 'faker';
import {Action} from 'redux';
import {AppState, Offer, UserData} from './types';
import {AuthorizationStatus, FIRST_CITY, SortType} from './const';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {createAPI} from './services/api';

export type AppThunkDispatch = ThunkDispatch<AppState, ReturnType<typeof createAPI>, Action>;

export const makeFakeUserData = (): UserData => ({
  name: name.title(),
  avatarUrl: system.filePath(),
  isPro: true,
  email: internet.email(),
  token: 'secret'
} as UserData);

export const makeFakeOffer = (): Offer => ({
  id: 'ae9218e7-dfe9-4d3d-b807-a0fdff9d0a58',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'room',
  price: 198,
  previewImage: system.filePath(),
  isFavorite: false,
  isPremium: false,
  rating: 2.2,
  city: {
    'name': 'Paris',
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  },
  location: {
    'latitude': 48.868610000000004,
    'longitude': 2.342499,
    'zoom': 16
  }
} as Offer);

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<AppState>): AppState => ({
  cards: {
    city: FIRST_CITY,
    sort: SortType.POPULAR,
    offers: [],
    isOffersDataLoading: false,
    isErrorInOffersDataLoading: false,
    favorites: [],
    isFavoriteListDataLoading: false,
    isErrorInFavoriteListDataLoading: false
  },
  offer: {
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
  },
  user: {
    authorizationStatus: AuthorizationStatus.Unknown,
    isErrorInAuthRequest: false,
    isErrorInCheckAuthRequest: false,
    userInfo: null
  },
  ...initialState ?? {},
});
