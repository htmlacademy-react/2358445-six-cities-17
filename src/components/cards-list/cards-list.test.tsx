import {render, screen} from '@testing-library/react';
import { Offer } from '../../types';
import { makeFakeOffer } from '../../mocks';
import CardsList from './cards-list';

vi.mock('../../components/card/card', () => {
  const mockCard = () => <div data-testid='card-container'>This is mock Card</div>;
  return {
    default: mockCard
  };
});

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const cardsListContainerTestId = 'cards-list-container';
    const cardContainerTestId = 'card-container';
    const offers = Array<Offer>(5).fill(makeFakeOffer());

    render(<CardsList offers={offers} />);
    const cardsListContainer = screen.getByTestId(cardsListContainerTestId);
    const cardItems = screen.getAllByTestId(cardContainerTestId);

    expect(cardsListContainer).toBeInTheDocument();
    expect(cardItems.length).toBe(5);
  });
});
