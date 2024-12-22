import {AppRoute, AuthorizationStatus} from '../../const';
import {SettingsType} from '../../types';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';
import {useAppSelector} from '../../hooks';

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
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();
  return (
    <button className={
      cn(`${page}__bookmark-button`,
        'button',
        { [`${page}__bookmark-button--active`]: isFavorite }
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
