import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../mocks';
import Card from './card';
import { withHistory } from '../../mock-component';
import userEvent from '@testing-library/user-event';

vi.mock('../../components/bookmark-button/bookmark-button', () => {
  const mockBookmarkButton = () => <>This is mock BookmarkButton</>;
  return {
    default: mockBookmarkButton
  };
});

describe('Component: Card', () => {
  it('should render correctly', async () => {
    const cardContainerTestId = 'place-card-container';
    const offer = makeFakeOffer();
    const cardMouseLeaveHandler = vi.fn();
    const cardMouseEnterHandler = vi.fn();

    const preparedComponent = withHistory(<Card offer={offer} onCardMouseEnter={() => cardMouseEnterHandler(offer) as void} onCardMouseLeave={cardMouseLeaveHandler} />);

    render(preparedComponent);
    const cardContainer = screen.getByTestId(cardContainerTestId);
    await userEvent.hover(cardContainer);

    expect(cardContainer).toBeInTheDocument();
    expect(cardMouseEnterHandler).toBeCalledTimes(1);
  });
});
