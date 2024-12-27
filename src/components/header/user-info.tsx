import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute} from '../../const';

function UserInfo(): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);
  const userName = useAppSelector((state) => state.userInfo && state.userInfo.email);

  return (
    <li className='header__nav-item user'>
      <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Favorites}>
        <div className='header__avatar-wrapper user__avatar-wrapper'>
        </div>
        <span className='header__user-name user__name'>{userName}</span>
        <span className='header__favorite-count'>{favorites.length}</span>
      </Link>
    </li>
  );
}

export default UserInfo;
