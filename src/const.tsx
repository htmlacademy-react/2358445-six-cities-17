export const Settings = {
  countPlaces: 5,
  locations: [
    {
      id: 1,
      name: 'Paris',
      path: '/paris'
    },
    {
      id: 2,
      name: 'Cologne',
      path: '/cologne'
    },
    {
      id: 3,
      name: 'Brussels',
      path: '/brussels'
    },
    {
      id: 4,
      name: 'Amsterdam',
      path: '/amsterdam'
    },
    {
      id: 5,
      name: 'Hamburg',
      path: '/hamburg'
    },
    {
      id: 6,
      name: 'Dusseldorf',
      path: '/dusseldorf'
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
  id: number;
  name: string;
  path: string;
}
