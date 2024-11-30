export const Settings = {
  cities: [
    {
      id: 1,
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    {
      id: 2,
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    {
      id: 3,
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    {
      id: 4,
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    {
      id: 5,
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 10.000654,
        zoom: 13
      }
    },
    {
      id: 6,
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    }
  ]
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

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
  previewImage: string;
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
