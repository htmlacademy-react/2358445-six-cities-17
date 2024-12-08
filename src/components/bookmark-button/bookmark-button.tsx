import {AppRoute, AuthorizationStatus} from '../../const';
import {SettingsType} from '../../types';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';

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
  return (
    <button className={
      cn(`${page}__bookmark-button`,
        'button',
        { 'place-card__bookmark-button--active': isFavorite && page === 'place-card' },
        { 'offer__bookmark-button--active': isFavorite && page === 'offer' }
      )
    } type='button' onClick={() => {
      if (authorizationStatus === AuthorizationStatus.NoAuth) {
        navigate(AppRoute.Login);
      }
    }}
    >
      <svg className={`${page}__bookmark-icon`} width={BookmarkSettings[page].width} height={BookmarkSettings[page].height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
