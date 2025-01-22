import { render, screen } from '@testing-library/react';
import { APIRoute, Page } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { extractActionsTypes, makeFakeOffer, makeFakeStore } from '../../mocks';
import ServerErrorPage from './server-error-page';
import userEvent from '@testing-library/user-event';
import { fetchOffersAction } from '../../store/api-actions';

vi.mock('../../components/location-item-link/location-item-link', () => {
  const mockLocationItemLink = () => <>This is mock LocationItemLink</>;
  return {
    default: mockLocationItemLink
  };
});

vi.mock('../../components/header/header', () => {
  const mockHeader = () => <>This is mock Header</>;
  return {
    default: mockHeader
  };
});

describe('Component: ServerErrorPage', () => {
  it('should render correctly', async () => {
    const expectedText = 'Server returned an error';
    const buttonText = 'Try again';
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ServerErrorPage page={Page.Cities} />, makeFakeStore());
    const mockOffers = [makeFakeOffer()];
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);

    expect(screen.getByRole('button')).toHaveTextContent(buttonText);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
