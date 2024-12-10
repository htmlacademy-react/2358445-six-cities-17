import {useState} from 'react';
import {MouseEvent} from 'react';
import cn from 'classnames';
import {FIRST_SORT} from '../../const';
import {useAppDispatch} from '../../hooks';
import {changeSort, getOffers} from '../../store/action';

function SortForm(): JSX.Element {
  const [sortParams, setSort] = useState({
    isShow: false,
    text: FIRST_SORT,
  });
  const dispatch = useAppDispatch();

  const handleClickSortOption = (evt: MouseEvent<HTMLElement>) => {
    setSort({ isShow: false, text: evt.currentTarget.textContent || '' });
    dispatch(changeSort(evt.currentTarget.textContent || 'Popular'));
    dispatch(getOffers());
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>{' '}
      <span className='places__sorting-type' tabIndex={0} onClick={() => {
        setSort({ ...sortParams, isShow: true });
      }}
      >
        {sortParams.text}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={cn(
        'places__options',
        'places__options--custom',
        {'places__options--opened': sortParams.isShow})}
      >
        <li className='places__option places__option--active' tabIndex={0} onClick={handleClickSortOption}>Popular</li>
        <li className='places__option' tabIndex={0} onClick={handleClickSortOption}>Price: low to high</li>
        <li className='places__option' tabIndex={0} onClick={handleClickSortOption}>Price: high to low</li>
        <li className='places__option' tabIndex={0} onClick={handleClickSortOption}>Top rated first</li>
      </ul>
    </form>
  );
}

export default SortForm;
