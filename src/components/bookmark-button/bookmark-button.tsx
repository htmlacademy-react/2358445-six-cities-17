import {AppRoute, AuthorizationStatus} from '../../const';
import {SettingsType} from '../../types';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteAction} from '../../store/api-actions';
import {useState} from 'react';

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
  offerId: string;
};

function BookmarkButton({isFavorite, page = 'place-card', offerId}: BookmarkButtonProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [addedInFavorite, setAddedInFavorite] = useState(isFavorite);

  return (
    <button className={
      cn(`${page}__bookmark-button`,
        'button',
        { [`${page}__bookmark-button--active`]: addedInFavorite }
      )
    } type='button' onClick={() => {
      if (authorizationStatus === AuthorizationStatus.NoAuth) {
        navigate(AppRoute.Login);
      }
      dispatch(changeFavoriteAction({
        status: (addedInFavorite ? 0 : 1),
        offerId: offerId
      }));
      setAddedInFavorite(!addedInFavorite);
    }}
    >
      <svg className={`${page}__bookmark-icon`} width={BookmarkSettings[page].width} height={BookmarkSettings[page].height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{addedInFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
