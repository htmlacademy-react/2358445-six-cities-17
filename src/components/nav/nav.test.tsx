import {render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import Nav from './nav';
import { extractActionsTypes, makeFakeStore, makeFakeUserData } from '../../mocks';
import { APIRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import userEvent from '@testing-library/user-event';

vi.mock('./user-info', () => {
  const mockUserInfo = () => <>This is mock UserInfo</>;
  return {
    default: mockUserInfo
  };
});

describe('Component: Nav', () => {
  it('should render correctly', () => {
    const headerNavContainerTestId = 'header-nav-container';
    const { withStoreComponent } = withStore(<Nav />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const headerNavContainer = screen.getByTestId(headerNavContainerTestId);

    expect(headerNavContainer).toBeInTheDocument();
  });

  it('should dispatch logoutAction when sign out', async () => {
    const signOutLinkTestId = 'sign-out-link';
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<Nav />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const signOutLink = screen.getByTestId(signOutLinkTestId);
    await userEvent.click(signOutLink);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
  });
});
