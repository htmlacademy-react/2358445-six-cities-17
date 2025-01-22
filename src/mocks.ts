import {system, name, internet, lorem} from 'faker';
import {Action} from 'redux';
import {AppState, City, Offer, OfferFull, Review, UserData} from './types';
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

export const makeFakeImagesData = (): string[] => Array<string>(10).fill(system.filePath());

export const makeFakeReview = (): Review => ({
  comment: lorem.lines(1),
  date: '2024-11-05T21:00:00.490Z',
  rating: Math.floor(Math.random() * 5 + 1),
  user: makeFakeUserData()
} as Review);

export const makeFakeCity = (): City => ({
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
} as City);

export const makeFakeOffer = (): Offer => ({
  id: 'ae9218e7-dfe9-4d3d-b807-a0fdff9d0a58',
  title: lorem.lines(1),
  type: 'room',
  price: 198,
  previewImage: system.filePath(),
  isFavorite: true,
  isPremium: false,
  rating: 2.2,
  city: makeFakeCity(),
  location: {
    'latitude': 48.868610000000004,
    'longitude': 2.342499,
    'zoom': 16
  }
} as Offer);

export const makeFakeOfferFull = (): OfferFull => {
  const offerFields = makeFakeOffer();
  const offerFullFields = {
    description: lorem.lines(3),
    images: makeFakeImagesData(),
    goods: ['Heating', 'Towels', 'Washing machine', 'Laptop friendly workspace'],
    host: makeFakeUserData(),
    bedrooms: 4,
    maxAdults: 5
  };
  return { ...offerFields, ...offerFullFields };
};

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
