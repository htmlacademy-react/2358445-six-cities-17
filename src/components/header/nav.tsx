import {Link, useLocation, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {MouseEvent} from 'react';
import UserInfo from './user-info';
import {selectAuthorizationStatus} from '../../store/user-process/selectors';
import cn from 'classnames';

function Nav(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const handleLogoutClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction())
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled' && currentPath as AppRoute === AppRoute.Favorites) {
          navigate(AppRoute.Login);
        }
      });
  };

  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        {(authorizationStatus === AuthorizationStatus.Auth) && <UserInfo/>}
        <li className={cn('header__nav-item', {'user': authorizationStatus !== AuthorizationStatus.Auth})}>
          {
            (authorizationStatus !== AuthorizationStatus.Auth)
              ?
              <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Login}><div className='header__avatar-wrapper user__avatar-wrapper'></div><span className='header__login'>Sign in</span></Link>
              :
              <a href='#' className='header__nav-link' onClick={handleLogoutClick}><span className='header__signout'>Sign out</span></a>
          }
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
