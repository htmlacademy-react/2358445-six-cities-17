import {render, screen} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const favoritesEmptyContainerTestId = 'favorites-empty-container';
    const favoritesEmptyH1Text = 'Favorites (empty)';
    const favoritesEmptyStatusText = 'Nothing yet saved.';
    const favoritesEmptyDescriptionText = 'Save properties to narrow down search or plan your future trips.';

    render(<FavoritesEmpty/>);
    const favoritesEmptyContainer = screen.getByTestId(favoritesEmptyContainerTestId);

    expect(favoritesEmptyContainer).toBeInTheDocument();
    expect(screen.getByText(favoritesEmptyH1Text)).toBeInTheDocument();
    expect(screen.getByText(favoritesEmptyStatusText)).toBeInTheDocument();
    expect(screen.getByText(favoritesEmptyDescriptionText)).toBeInTheDocument();
  });
});
