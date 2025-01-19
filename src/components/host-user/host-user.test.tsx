import {render, screen} from '@testing-library/react';
import HostUser from './host-user';
import { makeFakeUserData } from '../../mocks';

describe('Component: HostUser', () => {
  it('should render correctly', () => {
    const hostUserContainerTestId = 'host-user-container';
    const proText = 'Pro';
    const host = makeFakeUserData();
    const expectedAltText = 'Host avatar';

    render(<HostUser host={host}/>);
    const hostUserContainer = screen.getByTestId(hostUserContainerTestId);

    expect(hostUserContainer).toBeInTheDocument();
    expect(screen.getByText(proText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
