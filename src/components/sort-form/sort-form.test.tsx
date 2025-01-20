import {render, screen} from '@testing-library/react';
import SortForm from './sort-form';
import { withStore } from '../../mock-component';
import { extractActionsTypes, makeFakeStore } from '../../mocks';
import { SortType } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: SortForm', () => {
  it('should render correctly', () => {
    const sortFormContainerTestId = 'sort-form-container';
    const sortOptionContainerTestId = 'sort-option-container';
    const { withStoreComponent } = withStore(<SortForm />, makeFakeStore());

    render(withStoreComponent);
    const sortFormContainer = screen.getByTestId(sortFormContainerTestId);
    const sortOptionItems = screen.getAllByTestId(sortOptionContainerTestId);

    expect(sortFormContainer).toBeInTheDocument();
    expect(sortOptionItems.length).toBe(Object.values(SortType).length);
  });

  it('should dispatch changeSort on click sort item', async () => {
    const sortOptionContainerTestId = 'sort-option-container';
    const { withStoreComponent, mockStore } = withStore(<SortForm />, makeFakeStore());

    render(withStoreComponent);
    const sortOptionItems = screen.getAllByTestId(sortOptionContainerTestId);
    await userEvent.click(sortOptionItems[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual(['cards/changeSort']);
  });
});
