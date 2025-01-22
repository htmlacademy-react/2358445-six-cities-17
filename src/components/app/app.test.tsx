import {render, screen} from '@testing-library/react';
import {MemoryHistory, createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus, CITIES, FIRST_CITY} from '../../const';
import App from './app';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeOffer, makeFakeOfferFull, makeFakeStore, makeFakeUserData } from '../../mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App cities = {CITIES}/>, mockHistory);
    Object.defineProperty(global.window, 'scrollTo', { value: vi.fn() });
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${FIRST_CITY}`, 'i'))).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer"', () => {
    const withHistoryComponent = withHistory(<App cities = {CITIES}/>, mockHistory);
    Object.defineProperty(global.window, 'scrollTo', { value: vi.fn() });
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      },
      offer: {
        offer: makeFakeOfferFull(),
        isOfferDataLoading: false,
        isErrorInOfferDataLoading: false,
        reviews: [],
        isReviewsDataLoading: false,
        isErrorInReviewsDataLoading: false,
        isAddReviewLoading: false,
        isErrorInAddReviewLoading: false,
        nearBy: [makeFakeOffer()],
        isNearByDataLoading: false,
        isErrorInNearByDataLoading: false
      }
    }));
    mockHistory.push(AppRoute.Offer);

    render(withStoreComponent);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App cities = {CITIES}/>, mockHistory);
    Object.defineProperty(global.window, 'scrollTo', { value: vi.fn() });
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App cities = {CITIES}/>, mockHistory);
    Object.defineProperty(global.window, 'scrollTo', { value: vi.fn() });
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: null
      }
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
  });

  it('should render "Page404" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App cities = {CITIES}/>, mockHistory);
    Object.defineProperty(global.window, 'scrollTo', { value: vi.fn() });
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: null
      }
    }));
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back to main page')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigates to "/favorites" and is not authorized', () => {
    const fakeStoreWithAuthorizedStatus = makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    });
    const expectedText = 'Sign in';
    const { withStoreComponent } = withStore(<App cities = {CITIES}/>, fakeStoreWithAuthorizedStatus);
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Favorites);

    render(withHistoryComponent);

    expect(screen.getByRole('button')).toHaveTextContent(expectedText);
  });
});
