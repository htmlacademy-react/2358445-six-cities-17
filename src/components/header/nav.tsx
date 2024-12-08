import {Link} from 'react-router-dom';
import {APP_ROUTE, AUTHORIZATION_STATUS} from '../../const';

type NavProps = {
  authorizationStatus: AUTHORIZATION_STATUS;
  countFavorites: number;
}

function Nav({authorizationStatus, countFavorites}: NavProps): JSX.Element {
  const userLine = (authorizationStatus === AUTHORIZATION_STATUS.Auth) &&
    <li className='header__nav-item user'>
      <Link className='header__nav-link header__nav-link--profile' to={APP_ROUTE.Favorites}>
        <div className='header__avatar-wrapper user__avatar-wrapper'>
        </div>
        <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
        <span className='header__favorite-count'>{countFavorites}</span>
      </Link>
    </li>;
  let actionHref = '#';
  let actionText = 'Log Out';
  if (authorizationStatus !== AUTHORIZATION_STATUS.Auth) {
    actionHref = APP_ROUTE.Login;
    actionText = 'Sign in';
  }
  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        {userLine}
        <li className='header__nav-item'>
          <Link className='header__nav-link' to={actionHref}>
            <span className='header__signout'>{actionText}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
