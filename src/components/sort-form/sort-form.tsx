import {useState} from 'react';
import {MouseEvent} from 'react';
import cn from 'classnames';
import {SortType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSort} from '../../store/action';

function SortForm(): JSX.Element {
  const [isShowSort, setIsShowSort] = useState(false);
  const dispatch = useAppDispatch();
  const sortName = useAppSelector((state) => state.sort);

  const handleClickSortOption = (evt: MouseEvent<HTMLElement>) => {
    setIsShowSort(!isShowSort);
    dispatch(changeSort(evt.currentTarget.textContent as SortType || SortType.POPULAR));
  };
  const sortListUl = (Object.values(SortType) as string[]).map((value) => (
    <li key={value} className={cn('places__option', {'places__option--active': sortName === value as SortType})} tabIndex={0} onClick={handleClickSortOption}>{value}</li>
  ));

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>{' '}
      <span className='places__sorting-type' tabIndex={0} onClick={() => setIsShowSort(true)}>
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
