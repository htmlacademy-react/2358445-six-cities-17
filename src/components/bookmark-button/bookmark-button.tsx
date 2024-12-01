import {AppRoute, AuthorizationStatus, SettingsType} from '../../const';
import {useNavigate} from 'react-router-dom';

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
  authorizationStatus: AuthorizationStatus;
};

function BookmarkButton({isFavorite, page = 'place-card', authorizationStatus = AuthorizationStatus.Unknown}: BookmarkButtonProps): JSX.Element {
  const navigate = useNavigate();
  const buttonClass = isFavorite ? `${page}__bookmark-button button ${page}__bookmark-button--active` : `${page}__bookmark-button button`;
  return (
    <button className={buttonClass} type='button' onClick={() => {
      if (authorizationStatus === AuthorizationStatus.NoAuth) {
        navigate(AppRoute.Login);
      }
    }}
    >
      <svg className={`${page}__bookmark-icon`} width={BookmarkSettings[page].width} height={BookmarkSettings[page].height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
