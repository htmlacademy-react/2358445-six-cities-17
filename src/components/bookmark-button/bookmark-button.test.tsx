import { render, screen } from '@testing-library/react';
import BookmarkButton from './bookmark-button';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeStore, makeFakeUserData } from '../../mocks';
import { withHistory, withStore } from '../../mock-component';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
});

describe('Component: BookmarkButton', () => {
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

  it('should dispatch mockDispatch when user clicked bookmark button', async () => {
    const isFavorite = true;
    const offerId = 'some-offer-id';
    const { withStoreComponent, mockStore } = withStore(<BookmarkButton isFavorite={isFavorite} offerId={offerId}/>, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    const mockDispatch = vi.spyOn(mockStore, 'dispatch');

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should navigate to login-page when not authorized user clicked bookmark button', async () => {
    const isFavorite = false;
    const offerId = 'some-offer-id';
    const { withStoreComponent, mockStore } = withStore(<BookmarkButton isFavorite={isFavorite} offerId={offerId} />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: null
      }
    }));
    const mockDispatch = vi.spyOn(mockStore, 'dispatch');

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
