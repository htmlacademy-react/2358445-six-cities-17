import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory, withStore} from '../../mock-component';
import LoginPage from './login-page';
import { makeFakeStore } from '../../mocks';

vi.mock('../../components/location-item-link/location-item-link', () => {
  const mockLocationItemLink = () => <>This is mock LocationItemLink</>;
  return {
    default: mockLocationItemLink
  };
});

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Sign in';
    const loginText = 'E-mail';
    const passwordText = 'Password';
    const { withStoreComponent } = withStore(<LoginPage />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('button')).toHaveTextContent(expectedText);
    expect(screen.getByText(loginText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';
    const { withStoreComponent } = withStore(<LoginPage />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
