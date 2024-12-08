import {Link, useLocation} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import Nav from '../../components/header/nav';

type HeaderProps = {
  isNavShow?: boolean;
  authorizationStatus?: AuthorizationStatus;
  countFavorites?: number;
}

function Header({isNavShow, countFavorites, authorizationStatus = AuthorizationStatus.Unknown}: HeaderProps): JSX.Element {
  const logo = <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />;
  const logoBlock = (useLocation().pathname !== '/' ?
    <Link className="header__logo-link header__logo-link--active" to="/">{logo}</Link>
    :
    logo
  );
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>{logoBlock}</div>
          {(isNavShow && countFavorites) && <Nav authorizationStatus={authorizationStatus} countFavorites={countFavorites}/>}
        </div>
      </div>
    </header>
  );
}

export default Header;
