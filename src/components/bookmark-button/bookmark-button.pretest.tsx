import { render, screen } from '@testing-library/react';
import BookmarkButton from './bookmark-button';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const';
import { extractActionsTypes, makeFakeOfferFull, makeFakeStore, makeFakeUserData } from '../../mocks';
import { withHistory, withStore } from '../../mock-component';
import userEvent from '@testing-library/user-event';
import { changeFavoriteAction } from '../../store/api-actions';
import { createMemoryHistory, MemoryHistory } from 'history';

describe('Component: BookmarkButton', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly when isFavorite true and user authorized', () => {
    const expectedText = 'In bookmarks';
    const isFavorite = true;
    const offerId = 'some-offer-id';
    const bookmarkButtonTestId = 'bookmark-button-container';
    const { withStoreComponent } = withStore(<BookmarkButton isFavorite={isFavorite} offerId={offerId} />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const bookmarkButtonContainer = screen.getByTestId(bookmarkButtonTestId);
    expect(bookmarkButtonContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when isFavorite true and user not authorized', () => {
    const expectedText = 'To bookmarks';
    const isFavorite = true;
    const offerId = 'some-offer-id';
    const bookmarkButtonTestId = 'bookmark-button-container';
    const { withStoreComponent } = withStore(<BookmarkButton isFavorite={isFavorite} offerId={offerId} />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const bookmarkButtonContainer = screen.getByTestId(bookmarkButtonTestId);
    expect(bookmarkButtonContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when isFavorite false', () => {
    const expectedText = 'To bookmarks';
    const isFavorite = false;
    const offerId = 'some-offer-id';
    const bookmarkButtonTestId = 'bookmark-button-container';
    const { withStoreComponent } = withStore(<BookmarkButton isFavorite={isFavorite} offerId={offerId} />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const bookmarkButtonContainer = screen.getByTestId(bookmarkButtonTestId);
    expect(bookmarkButtonContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should dispatch "changeFavoriteAction" when user clicked bookmark button', async () => {
    const isFavorite = true;
    const offerId = 'some-offer-id';
    const fakeServerReplay = makeFakeOfferFull();
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<BookmarkButton isFavorite={isFavorite} offerId={offerId}/>, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    mockAxiosAdapter.onPost(`${APIRoute.FavoriteStatus}${offerId}/1`).reply(200, fakeServerReplay);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      changeFavoriteAction.pending.type,
      changeFavoriteAction.fulfilled.type,
    ]);

  });

  it('should navigate to login-page when not authorized user clicked bookmark button', async () => {
    const isFavorite = false;
    const offerId = 'some-offer-id';
    const { withStoreComponent } = withStore(<BookmarkButton isFavorite={isFavorite} offerId={offerId} />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: null
      }
    }));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });
});
