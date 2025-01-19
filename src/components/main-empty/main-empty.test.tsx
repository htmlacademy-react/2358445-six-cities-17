import {render, screen} from '@testing-library/react';
import {withStore} from '../../mock-component';
import {makeFakeStore} from '../../mocks';
import MainEmpty from './main-empty';
import { FIRST_CITY } from '../../const';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const expectedText = 'No places to stay available';
    const { withStoreComponent } = withStore(<MainEmpty />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${FIRST_CITY}`, 'i'))).toBeInTheDocument();
  });
});
