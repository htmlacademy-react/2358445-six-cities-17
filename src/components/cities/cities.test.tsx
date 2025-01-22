import { render, screen } from '@testing-library/react';
import Cities from './cities';
import { CITIES } from '../../const';
import { withStore } from '../../mock-component';
import { makeFakeStore } from '../../mocks';

vi.mock('../../components/location-item-link/location-item-link', () => {
  const mockLocationItemLink = () => <>This is mock LocationItemLink</>;
  return {
    default: mockLocationItemLink
  };
});

describe('Component: Cities', () => {
  it('should render correctly', () => {
    const expectedText = 'Cities';
    const locationItemContainerTestId = 'location-item-container';
    const { withStoreComponent } = withStore(<Cities cities={CITIES} />, makeFakeStore());

    render(withStoreComponent);
    const locationItems = screen.getAllByTestId(locationItemContainerTestId);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(locationItems.length).toBe(CITIES.length);
  });
});
