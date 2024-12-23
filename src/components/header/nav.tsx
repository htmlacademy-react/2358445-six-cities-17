import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';

type NavProps = {
  countFavorites: number;
}

function Nav({countFavorites}: NavProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userLine = (authorizationStatus === AuthorizationStatus.Auth) &&
    <li className='header__nav-item user'>
      <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Favorites}>
        <div className='header__avatar-wrapper user__avatar-wrapper'>
        </div>
        <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
        <span className='header__favorite-count'>{countFavorites}</span>
      </Link>
    </li>;
  let actionLink = (
    <a href='/' className='header__nav-link' onClick={(evt) => {
      evt.preventDefault();
      dispatch(logoutAction());
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
