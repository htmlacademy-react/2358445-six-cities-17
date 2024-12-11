import {useState} from 'react';
import {MouseEvent} from 'react';
import cn from 'classnames';
import {FIRST_SORT, SortTypes} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSort, getOffers} from '../../store/action';

function SortForm(): JSX.Element {
  const [isShowSort, setSort] = useState(false);
  const dispatch = useAppDispatch();
  const sortName = useAppSelector((state) => state.sort);

  const handleClickSortOption = (evt: MouseEvent<HTMLElement>) => {
    setSort(!isShowSort);
    dispatch(changeSort(evt.currentTarget.textContent || FIRST_SORT));
    dispatch(getOffers());
  };
  const sortListUl = Object.values(SortTypes).map((value) => (
    <li key={value} className={cn('places__option', {'places__option--active': sortName === value})} tabIndex={0} onClick={handleClickSortOption}>{value}</li>
  ));

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>{' '}
      <span className='places__sorting-type' tabIndex={0} onClick={() => setSort(true)}>
        {sortName}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={cn(
        'places__options',
        'places__options--custom',
        {'places__options--opened': isShowSort})}
      >
        {sortListUl}
      </ul>
    </form>
  );
}

export default SortForm;
