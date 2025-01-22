import { render, screen } from '@testing-library/react';
import { withStore } from '../../mock-component';
import NearByOffers from './near-by-offers';
import { makeFakeOffer, makeFakeOfferFull, makeFakeStore, makeFakeUserData } from '../../mocks';
import { AuthorizationStatus } from '../../const';

vi.mock('../cards-list/cards-list', () => {
  const mockCardsList = () => <>This is mock CardsList</>;
  return {
    default: mockCardsList
  };
});

describe('Component: NearByOffers', () => {
  it('should render correctly', () => {
    const expectedText = 'Other places in the neighbourhood';
    const { withStoreComponent } = withStore(<NearByOffers />, makeFakeStore({
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

    render(withStoreComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
