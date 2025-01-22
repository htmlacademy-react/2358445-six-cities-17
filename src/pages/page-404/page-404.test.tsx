import { render, screen } from '@testing-library/react';
import Page404 from './page-404';
import { withHistory } from '../../mock-component';

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

describe('Component: Page404', () => {
  it('should render correctly', () => {
    const expectedH1Text = '404 Not Found';
    const expectedLinkText = 'Back to main page';
    const preparedComponent = withHistory(<Page404 />);

    render(preparedComponent);

    expect(screen.getByTestId('page-404-title-container')).toHaveTextContent(expectedH1Text);
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
