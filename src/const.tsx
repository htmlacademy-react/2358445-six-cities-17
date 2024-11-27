export const Settings = {
  countPlaces: 5,
  locations: [
    {
      id: 1,
      name: 'Paris'
    },
    {
      id: 2,
      name: 'Cologne'
    },
    {
      id: 3,
      name: 'Brussels'
    },
    {
      id: 4,
      name: 'Amsterdam'
    },
    {
      id: 5,
      name: 'Hamburg'
    },
    {
      id: 6,
      name: 'Dusseldorf'
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

export type SettingsType = {
  [key: string]: {
    width: number;
    height: number;
  };
}
