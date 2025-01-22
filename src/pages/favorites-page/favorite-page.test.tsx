import { render, screen } from '@testing-library/react';
import FavoritesPage from './favorites-page';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeOffer, makeFakeStore, makeFakeUserData } from '../../mocks';
import { AuthorizationStatus, FIRST_CITY, SortType } from '../../const';
import { Offer } from '../../types';

vi.mock('../../components/header/header', () => {
  const mockHeader = () => <>This is mock Header</>;
  return {
    default: mockHeader
  };
});

vi.mock('../../components/favorites-list/favorites-list', () => {
  const mockFavoritesList = () => <>This is mock FavoritesList</>;
  return {
    default: mockFavoritesList
  };
});

vi.mock('../../components/favorites-empty/favorites-empty', () => {
  const mockFavoritesEmpty = () => <>This is mock FavoritesEmpty</>;
  return {
    default: mockFavoritesEmpty
  };
});

describe('Component: FavoritePage', () => {
  it('should render correctly with full offers', () => {
    const expectedH1Text = 'Saved listing';
    const expectedFavoritesListText = 'This is mock FavoritesList';
    const mockOffers = Array<Offer>(12).fill(makeFakeOffer());
    const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      },
      cards: {
        city: FIRST_CITY,
        sort: SortType.POPULAR,
        offers: [],
        isOffersDataLoading: false,
        isErrorInOffersDataLoading: false,
        favorites: mockOffers,
        isFavoriteListDataLoading: false,
        isErrorInFavoriteListDataLoading: false
      }
    }
    ));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedH1Text)).toBeInTheDocument();
    expect(screen.getByText(expectedFavoritesListText)).toBeInTheDocument();
  });

  it('should render correctly with empty offers', () => {
    const notExpectedH1Text = 'Saved listing';
    const expectedFavoritesEmptyText = 'This is mock FavoritesEmpty';
    const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText(notExpectedH1Text)).not.toBeInTheDocument();
    expect(screen.getByText(expectedFavoritesEmptyText)).toBeInTheDocument();
  });
});
