import {render, screen} from '@testing-library/react';
import {withHistory} from '../../mock-component';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'footer-container';
    const expectedAltText = '6 cities logo';
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);
    const footerContainer = screen.getByTestId(expectedTestId);

    expect(footerContainer).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
