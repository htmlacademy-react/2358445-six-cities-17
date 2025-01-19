import {render, screen} from '@testing-library/react';
import OfferLabel from './offer-label';

describe('Component: OfferLabel', () => {
  it('should render correctly', () => {
    const labelContainerTestId = 'premium-label-container';
    const labelText = 'Premium';

    render(<OfferLabel/>);
    const labelContainer = screen.getByTestId(labelContainerTestId);

    expect(labelContainer).toBeInTheDocument();
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });
});
