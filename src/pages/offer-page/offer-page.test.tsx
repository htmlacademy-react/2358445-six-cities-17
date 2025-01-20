import {render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import OfferPage from './offer-page';
import { makeFakeOffer, makeFakeOfferFull, makeFakeStore } from '../../mocks';

vi.mock('../../components/header/header', () => {
  const mockHeader = () => <>This is mock Header</>;
  return {
    default: mockHeader
  };
});

vi.mock('../../components/map/map', () => {
  const mockMap = () => <>This is mock Map</>;
  return {
    default: mockMap
  };
});

vi.mock('../../components/bookmark-button/bookmark-button', () => {
  const mockBookmarkButton = () => <>This is mock BookmarkButton</>;
  return {
    default: mockBookmarkButton
  };
});

vi.mock('../../components/reviews-list/reviews-list', () => {
  const mockReviewsList = () => <>This is mock ReviewsList</>;
  return {
    default: mockReviewsList
  };
});

vi.mock('../../components/offer-galery/offer-galery', () => {
  const mockOfferGalery = () => <>This is mock OfferGalery</>;
  return {
    default: mockOfferGalery
  };
});

vi.mock('../../components/offer-goods/offer-goods', () => {
  const mockOfferGoods = () => <>This is mock OfferGoods</>;
  return {
    default: mockOfferGoods
  };
});

vi.mock('../../components/host-user/host-user', () => {
  const mockHostUser = () => <>This is mock HostUser</>;
  return {
    default: mockHostUser
  };
});

vi.mock('../../components/near-by-offers/near-by-offers', () => {
  const mockNearByOffers = () => <>This is mock NearByOffers</>;
  return {
    default: mockNearByOffers
  };
});

describe('Component: OfferPage', () => {
  it('should render correctly', () => {
    const expectedH2Text = 'Meet the host';
    const adultsText = 'Max 5 adults';
    const bedroomsText = '4 Bedrooms';
    const { withStoreComponent } = withStore(<OfferPage />, makeFakeStore({
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
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedH2Text)).toBeInTheDocument();
    expect(screen.getByText(adultsText)).toBeInTheDocument();
    expect(screen.getByText(bedroomsText)).toBeInTheDocument();
  });
});
