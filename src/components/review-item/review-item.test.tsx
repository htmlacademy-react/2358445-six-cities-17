import {render, screen} from '@testing-library/react';
import {makeFakeReview} from '../../mocks';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const expectedAltText = 'Reviews avatar';
    const { comment, date, rating, user } = makeFakeReview();

    render(<ReviewItem comment={comment} date={date} rating={rating} user={user} />);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
  });
});
