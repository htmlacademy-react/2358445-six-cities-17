import {SettingsType} from '../../const';

const BookmarkSettings: SettingsType = {
  'place-card': {
    width: 18,
    height: 19
  },
  'offer': {
    width: 31,
    height: 33
  },
};

type BookmarkButtonProps = {
  isFavorite: boolean;
  page?: 'place-card' | 'offer';
};

function BookmarkButton({isFavorite, page = 'place-card'}: BookmarkButtonProps): JSX.Element {
  const buttonClass = isFavorite ? `${page}__bookmark-button button ${page}__bookmark-button--active` : `${page}__bookmark-button button`;
  return (
    <button className={buttonClass} type='button'>
      <svg className={`${page}__bookmark-icon`} width={BookmarkSettings[page].width} height={BookmarkSettings[page].height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
