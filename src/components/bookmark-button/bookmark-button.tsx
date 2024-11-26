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
  page: string;
};

function BookmarkButton({page}: BookmarkButtonProps): JSX.Element {
  return (
    <button className={`${page}__bookmark-button ${page}__bookmark-button--active button`} type='button'>
      <svg className={`${page}__bookmark-icon`} width={BookmarkSettings[page].width} height={BookmarkSettings[page].height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
