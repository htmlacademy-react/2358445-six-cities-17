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

export type InitalState = {
  city: string;
  offers: Offer[];
  sort: SortType;
  authorizationStatus: AuthorizationStatus;
};

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};
