import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory } from '../../mock-component';

vi.mock('../../components/header/nav', () => {
  const mockNav = () => <>This is mock Nav</>;
  return {
    default: mockNav
  };
});

describe('Component: Header', () => {
  it('should render correctly with Nav', () => {
    const headerContainerTestId = 'header-container';
    const expectedText = 'This is mock Nav';
    const isNavShow = true;
    const preparedComponent = withHistory(<Header isNavShow={isNavShow} />);

    render(preparedComponent);
    const headerContainer = screen.getByTestId(headerContainerTestId);

    expect(headerContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly without Nav', () => {
    const headerContainerTestId = 'header-container';
    const notExpectedText = 'This is mock Nav';
    const isNavShow = false;
    const preparedComponent = withHistory(<Header isNavShow={isNavShow} />);

    render(preparedComponent);
    const headerContainer = screen.getByTestId(headerContainerTestId);

    expect(headerContainer).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
