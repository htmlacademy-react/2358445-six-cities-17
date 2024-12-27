export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const FIRST_CITY = CITIES[0];

export const STARS_COUNT = 5;

export const REVIEWS_COUNT = 10;

export const NEARBY_COUNT = 3;

export const RATING_VALUES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export enum MapAttribution {
  TileLayer = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Copyright = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}

export enum UrlMarker {
  Default = '/img/pin.svg',
  Current = '/img/pin-active.svg'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Page404 = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortType {
  TOP_RATED_FIRST = 'Top rated first',
  PRICE_LOW_TO_HIGH = 'Price: low to high',
  PRICE_HIGH_TO_LOW = 'Price: high to low',
  POPULAR = 'Popular'
}

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/',
  NearBy = '/nearby',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  FavoriteStatus = '/favorite/',
  Comments = '/comments/'
}

export enum Page {
  PlaceCard = 'place-card',
  Cities = 'cities',
  NearPlaces = 'near-places',
  Favorites = 'favorites',
  Offer = 'offer'
}

export enum ReviewLimit {
  Min = 50,
  Max = 300
}

export enum ReviewFormSubmitMessages {
  RatingSetError = ' Error is detected! You didn&apos;t set rating.',
  ReviewSizeError = ' Error is detected! Your text lenght is incorrect.',
  Success = 'Your review was added.'
}

