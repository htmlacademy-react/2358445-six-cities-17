import {AxiosInstance} from 'axios';
import {AuthorizationStatus, SortType} from './const';
import {store} from './store';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  id?: number;
  name: string;
  location: Location;
};

export type OfferSimple = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage?: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type Offer = OfferSimple & {
  city: City;
  location: Location;
};

export type OfferFull = Offer & {
  description: string;
  images: string[];
  goods: string[];
  host: User;
  bedrooms: number;
  maxAdults: number;
};

export type Offers = Offer[];

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id?: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
};

export type Reviews = Review[];

export type SettingsType = {
  [key: string]: {
    width: number;
    height: number;
  };
}

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = User & {
  email: string;
  token: string;
};

export type ReviewData = {
  offerId: string;
  comment: string;
  rating: number;
};

export type ThunkType = {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}

export type ChangeFavoriteData = {
  offerId: string;
  status: number;
};

export type UserProcessType = {
  authorizationStatus: AuthorizationStatus;
  isErrorInAuthRequest: boolean;
  isErrorInCheckAuthRequest: boolean;
  userInfo: UserData | null;
};

export type OfferProcessType = {
  offer: OfferFull | null;
  isOfferDataLoading: boolean;
  isErrorInOfferDataLoading: boolean;
  reviews: Reviews;
  isReviewsDataLoading: boolean;
  isErrorInReviewsDataLoading: boolean;
  isAddReviewLoading: boolean;
  isErrorInAddReviewLoading: boolean;
  nearBy: Offers;
  isNearByDataLoading: boolean;
  isErrorInNearByDataLoading: boolean;
};

export type CardsProcessType = {
  city: string;
  sort: SortType;
  offers: Offers;
  isOffersDataLoading: boolean;
  isErrorInOffersDataLoading: boolean;
  favorites: Offers;
  isFavoriteListDataLoading: boolean;
  isErrorInFavoriteListDataLoading: boolean;
};
