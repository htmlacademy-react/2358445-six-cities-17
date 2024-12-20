export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const FIRST_CITY = CITIES[0];

export const STARS_COUNT = 5;

export const REVIEWS_COUNT = 10;

export const NEARBY_COUNT = 3;

export const RATING_VALUES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export const EMPTY_OFFER = {
  'id': '',
  'title': '',
  'description': '',
  'type': '',
  'price': 0,
  'images': [],
  'city': {
    'name': 'Paris',
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  },
  'location': {
    'latitude': 0,
    'longitude': 0,
    'zoom': 0
  },
  'goods': [],
  'host': {
    'isPro': true,
    'name': '',
    'avatarUrl': ''
  },
  'isPremium': false,
  'isFavorite': false,
  'rating': 0,
  'bedrooms': 0,
  'maxAdults': 0
};

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

