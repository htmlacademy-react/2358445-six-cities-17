import { render, screen } from '@testing-library/react';
import { withStore } from '../../mock-component';
import { Offer } from '../../types';
import { makeFakeOffer, makeFakeStore } from '../../mocks';
import MainPageInner from './main-page-inner';

vi.mock('../sort-form/sort-form', () => {
  const mockSortForm = () => <>This is mock SortForm</>;
  return {
    default: mockSortForm
  };
});

vi.mock('../cards-list/cards-list', () => {
  const mockCardsList = () => <>This is mock CardsList</>;
  return {
    default: mockCardsList
  };
});

vi.mock('../map/map', () => {
  const mockMap = () => <>This is mock Map</>;
  return {
    default: mockMap
  };
});

describe('Component: MainPageInner', () => {
  it('should render correctly', () => {
    const expectedH2Text = 'Places';
    const offers = Array<Offer>(5).fill(makeFakeOffer());
    const fakeStore = makeFakeStore();
    const expectedPlacesFoundText = `${offers.length} place${offers.length > 1 && 's'} to stay in ${fakeStore.cards.city}`;
    const { withStoreComponent } = withStore(<MainPageInner sortedOffers={offers}/>, fakeStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedH2Text)).toBeInTheDocument();
    expect(screen.getByText(expectedPlacesFoundText)).toBeInTheDocument();
  });
});
