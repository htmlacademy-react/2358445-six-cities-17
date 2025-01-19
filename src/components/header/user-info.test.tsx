import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mock-component';
import {makeFakeStore, makeFakeUserData} from '../../mocks';
import UserInfo from './user-info';
import { AuthorizationStatus } from '../../const';

describe('Component: UserInfo', () => {
  it('should render correctly', () => {
    const userInfoContainerTestId = 'header-user-info-container';
    const { withStoreComponent } = withStore(<UserInfo />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserData()
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const userInfoContainer = screen.getByTestId(userInfoContainerTestId);

    expect(userInfoContainer).toBeInTheDocument();
  });
});
