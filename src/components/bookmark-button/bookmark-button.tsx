import {AppRoute, AuthorizationStatus, Page} from '../../const';
import {SettingsType} from '../../types';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteAction} from '../../store/api-actions';
import {selectAuthorizationStatus} from '../../store/user-process/selectors';

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
  page?: Page.PlaceCard | Page.Offer;
  offerId: string;
};

function BookmarkButton({isFavorite, page = Page.PlaceCard, offerId}: BookmarkButtonProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickBookmarkButton = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }
    dispatch(changeFavoriteAction({
      status: (+!isFavorite),
      offerId
    }));
  };

  return (
    <button className={
      cn(`${page}__bookmark-button`,
        'button',
        { [`${page}__bookmark-button--active`]: isFavorite }
      )
    } type='button' onClick={handleClickBookmarkButton}
    >
      <svg className={`${page}__bookmark-icon`} width={BookmarkSettings[page].width} height={BookmarkSettings[page].height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
