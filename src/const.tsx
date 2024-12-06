export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const starsCount = 5;

export const ratingValues = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export const urlMarkerDefault = '/img/pin.svg';

export const urlMarkerCurrent = '/img/pin-active.svg';

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
