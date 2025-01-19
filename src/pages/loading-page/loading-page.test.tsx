import {render, screen} from '@testing-library/react';
import LoadingPage from './loading-page';

describe('Component: LoadingPage', () => {
  it('should render correctly', () => {
    const loadingPageContainerTestId = 'loading-page-container';

    render(<LoadingPage/>);
    const loadingPageContainer = screen.getByTestId(loadingPageContainerTestId);

    expect(loadingPageContainer).toBeInTheDocument();
  });
});
