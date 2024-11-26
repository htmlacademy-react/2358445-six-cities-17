import {AppRoute, AuthorizationStatus} from '../../const';

type NavProps = {
  authorizationStatus: AuthorizationStatus;
}

function Nav({authorizationStatus}: NavProps): JSX.Element {
  const userLine = (authorizationStatus === AuthorizationStatus.Auth) &&
    <li className='header__nav-item user'>
      <a className='header__nav-link header__nav-link--profile' href='#'>
        <div className='header__avatar-wrapper user__avatar-wrapper'>
        </div>
        <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
        <span className='header__favorite-count'>3</span>
      </a>
    </li>;
  let actionHref = '#';
  let actionText = 'Sign out';
  if (authorizationStatus !== AuthorizationStatus.Auth) {
    actionHref = AppRoute.Login;
    actionText = 'Sign in';
  }
  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        {userLine}
        <li className='header__nav-item'>
          <a className='header__nav-link' href={actionHref}>
            <span className='header__signout'>{actionText}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
