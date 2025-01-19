import {render, screen} from '@testing-library/react';
import ReviewsFormMessage from './reviews-form-message';

describe('Component: ReviewsFormMessage', () => {
  it('should render correctly', () => {
    const messageText = 'Test for ReviewsFormMessage';
    const messageContainerTestId = 'review-form-message-text';

    render(<ReviewsFormMessage text={messageText}/>);
    const messageContainer = screen.getByTestId(messageContainerTestId);

    expect(messageContainer).toBeInTheDocument();
    expect(screen.getByText(messageText)).toBeInTheDocument();
  });
});
