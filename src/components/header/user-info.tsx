import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute} from '../../const';
import {selectFavorites} from '../../store/cards-process/selectors';
import {selectUser} from '../../store/user-process/selectors';

function UserInfo(): JSX.Element {
  const favorites = useAppSelector(selectFavorites);
  const user = useAppSelector(selectUser);

  return (
    <li className='header__nav-item user'>
      <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Favorites}>
        <div className='header__avatar-wrapper user__avatar-wrapper' style={{borderRadius: '20px', backgroundImage: (user ? `url(${user.avatarUrl})` : 'url(../img/avatar.svg)')}}></div>
        <span className='header__user-name user__name'>{user && user.email}</span>
        <span className='header__favorite-count'>{favorites.length}</span>
      </Link>
    </li>
  );
}

export default UserInfo;
