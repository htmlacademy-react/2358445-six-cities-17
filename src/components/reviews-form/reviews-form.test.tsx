import {render, screen} from '@testing-library/react';
import { withStore } from '../../mock-component';
import ReviewsForm from './reviews-form';
import { extractActionsTypes, makeFakeReview, makeFakeStore, makeFakeUserData } from '../../mocks';
import { APIRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import { addReviewAction } from '../../store/api-actions';

describe('Component: ReviewsForm', () => {
  it('should render correctly', () => {
    const expectedLabelText = 'Your review';
    const expectedButtonText = 'Submit';
    const offerId = 'some-offer-id';
    const { withStoreComponent } = withStore(<ReviewsForm offerId={offerId} />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));

    render(withStoreComponent);

    expect(screen.getByRole('button')).toHaveTextContent(expectedButtonText);
    expect(screen.getByText(expectedLabelText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should submit button enable when rating and review was send', async () => {
    const offerId = 'some-offer-id';
    const expectedReviewValue = 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.';
    const fakeServerReplay = makeFakeReview();
    const reviewElementTestId = 'reviewElement';
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ReviewsForm offerId={offerId} />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    mockAxiosAdapter.onPost(APIRoute.Comments + offerId).reply(200, fakeServerReplay);

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(reviewElementTestId),
      expectedReviewValue,
    );
    const clickedRating = screen.getByPlaceholderText('perfect');
    const notClickedRating = screen.getByPlaceholderText('good');
    await userEvent.click(clickedRating);

    expect(clickedRating).toBeChecked();
    expect(notClickedRating).not.toBeChecked();
    expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    screen.getByRole('button').removeAttribute('disabled');
    expect(screen.getByRole('button')).not.toBeDisabled();

    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type,
    ]);
  });
});
