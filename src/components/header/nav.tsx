import {Link, useLocation, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';

function Nav(): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userName = useAppSelector((state) => state.userInfo && state.userInfo.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const userLine = (authorizationStatus === AuthorizationStatus.Auth) &&
    <li className='header__nav-item user'>
      <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Favorites}>
        <div className='header__avatar-wrapper user__avatar-wrapper'>
        </div>
        <span className='header__user-name user__name'>{userName}</span>
        <span className='header__favorite-count'>{favorites.length}</span>
      </Link>
    </li>;
  let actionLink = (
    <a href='#' className='header__nav-link' onClick={(evt) => {
      evt.preventDefault();
      dispatch(logoutAction())
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled' && currentPath as AppRoute === AppRoute.Favorites) {
            navigate(AppRoute.Main);
          }
        });
    }}
    >
      <span className='header__signout'>Log Out</span>
    </a>
  );
  if (authorizationStatus !== AuthorizationStatus.Auth) {
    actionLink = <Link className='header__nav-link' to={AppRoute.Login}><span className='header__signout'>Sign in</span></Link>;
  }
  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        {userLine}
        <li className='header__nav-item'>
          {actionLink}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
