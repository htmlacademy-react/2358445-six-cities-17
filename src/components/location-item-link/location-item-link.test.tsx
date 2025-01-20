import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import LocationItemLink from './location-item-link';
import { FIRST_CITY } from '../../const';
import { extractActionsTypes, makeFakeStore } from '../../mocks';
import userEvent from '@testing-library/user-event';

describe('Component: LocationItemLink', () => {
  it('should render correctly', () => {
    const locationItemLinkTestId = 'location-item-link-container';
    const { withStoreComponent } = withStore(<LocationItemLink text={FIRST_CITY} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const locationItemLinkContainer = screen.getByTestId(locationItemLinkTestId);
    expect(locationItemLinkContainer).toBeInTheDocument();
    expect(screen.getByText(FIRST_CITY)).toBeInTheDocument();
  });

  it('should navigate to login-page when not authorized user clicked bookmark button', async () => {
    const locationItemLinkTestId = 'location-item-link-container';
    const { withStoreComponent, mockStore } = withStore(<LocationItemLink text={FIRST_CITY} />, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const locationItemLinkContainer = screen.getByTestId(locationItemLinkTestId);
    await userEvent.click(locationItemLinkContainer);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual(['cards/changeCity']);
  });
});
