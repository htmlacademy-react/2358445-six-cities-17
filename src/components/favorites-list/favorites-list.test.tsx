import { render, screen } from '@testing-library/react';
import FavoritesList from './favorites-list';
import { Offer } from '../../types';
import { makeFakeOffer } from '../../mocks';

vi.mock('../cards-list/cards-list', () => {
  const mockCardsList = () => <>This is mock CardsList</>;
  return {
    default: mockCardsList
  };
});

vi.mock('../../components/location-item-link/location-item-link', () => {
  const mockLocationItemLink = () => <>This is mock LocationItemLink</>;
  return {
    default: mockLocationItemLink
  };
});

describe('Component: NearByOffers', () => {
  it('should render correctly', () => {
    const favoritesListContainerTestId = 'favorites-list-container';
    const offers = Array<Offer>(5).fill(makeFakeOffer());

    render(<FavoritesList offers={offers} />);
    const favoritesListContainer = screen.getByTestId(favoritesListContainerTestId);

    expect(favoritesListContainer).toBeInTheDocument();
  });
});
