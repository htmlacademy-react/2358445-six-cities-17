import {Link, useLocation, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {MouseEvent} from 'react';
import UserInfo from './user-info';
import {selectAuthorizationStatus} from '../../store/user-process/selectors';

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
          navigate(AppRoute.Main);
        }
      });
  };

  let actionLink = <a href='#' className='header__nav-link' onClick={handleLogoutClick}><span className='header__signout'>Log Out</span></a>;
  if (authorizationStatus !== AuthorizationStatus.Auth) {
    actionLink = <Link className='header__nav-link' to={AppRoute.Login}><span className='header__signout'>Sign in</span></Link>;
  }
  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        {(authorizationStatus === AuthorizationStatus.Auth) && <UserInfo/>}
        <li className='header__nav-item'>
          {actionLink}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
