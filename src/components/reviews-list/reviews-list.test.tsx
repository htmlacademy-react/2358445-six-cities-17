import {render, screen} from '@testing-library/react';
import {withStore} from '../../mock-component';
import ReviewsList from './reviews-list';
import { makeFakeReview, makeFakeStore, makeFakeUserData } from '../../mocks';
import { AuthorizationStatus, REVIEWS_COUNT } from '../../const';
import { Review } from '../../types';

vi.mock('../review-item/review-item', () => {
  const mockReviewItem = () => <div data-testid='review-item-container'>This is mock ReviewItem</div>;
  return {
    default: mockReviewItem
  };
});

vi.mock('../reviews-form/reviews-form', () => {
  const mockReviewsForm = () => <>This is mock ReviewsForm</>;
  return {
    default: mockReviewsForm
  };
});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const reviews = Array(12).fill(makeFakeReview());
    const reviewsListContainerTestId = 'offer-reviews-container';
    const reviewItemTestId = 'review-item-container';
    const reviewCommonCountTestId = 'offer-common-count';
    const { withStoreComponent } = withStore(<ReviewsList reviews={reviews} offerId='offer-id' />, makeFakeStore());

    render(withStoreComponent);
    const reviewsListContainer = screen.getByTestId(reviewsListContainerTestId);
    const reviewItems = screen.getAllByTestId(reviewItemTestId);
    const reviewCommonCount = screen.getByTestId(reviewCommonCountTestId);

    expect(reviewsListContainer).toBeInTheDocument();
    expect(reviewItems.length).toBe(REVIEWS_COUNT);
    expect(reviewCommonCount).toHaveTextContent(reviews.length.toString());
  });

  it('should render correctly when user auth', () => {
    const reviews:Review[] = [];
    const { withStoreComponent } = withStore(<ReviewsList reviews={reviews} offerId='offer-id' />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText('This is mock ReviewsForm')).toBeInTheDocument();
  });

  it('should render correctly when user no auth', () => {
    const reviews:Review[] = [];
    const { withStoreComponent } = withStore(<ReviewsList reviews={reviews} offerId='offer-id' />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.queryByText('This is mock ReviewsForm')).not.toBeInTheDocument();
  });
});
