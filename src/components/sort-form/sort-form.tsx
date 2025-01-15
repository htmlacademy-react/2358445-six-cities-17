import {memo, useEffect, useRef, useState} from 'react';
import {MouseEvent} from 'react';
import cn from 'classnames';
import {SortType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectSortName} from '../../store/cards-process/selectors';
import {changeSort} from '../../store/cards-process/cards-process';

function SortForm(): JSX.Element {
  const sortSpanRef = useRef<HTMLElement>(null);
  const [isShowSort, setIsShowSort] = useState(false);
  const dispatch = useAppDispatch();
  const sortName = useAppSelector(selectSortName);

  useEffect(() => {
    const hideSortForm = (evt: MouseEvent | Event): void => {
      if (evt.target instanceof HTMLElement && sortSpanRef.current && !sortSpanRef.current.contains(evt.target)) {
        setIsShowSort(false);
      }
    };
    document.addEventListener('click', hideSortForm);

    return () => {
      document.removeEventListener('click', hideSortForm);
    };
  }, []);

  const handleClickSortOption = (evt: MouseEvent<HTMLElement>) => {
    dispatch(changeSort(evt.currentTarget.textContent as SortType || SortType.POPULAR));
  };

  const handleChangeShowSort = () => setIsShowSort((lastOpened) => (!lastOpened));

  const sortListUl = (Object.values(SortType) as string[]).map((value) => (
    <li key={value} className={cn('places__option', {'places__option--active': sortName === value as SortType})} tabIndex={0} onClick={handleClickSortOption}>{value}</li>
  ));

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>{' '}
      <span ref={sortSpanRef} className='places__sorting-type' tabIndex={0} onClick={handleChangeShowSort}>
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

export default memo(SortForm);
