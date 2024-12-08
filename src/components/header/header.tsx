import {Link} from 'react-router-dom';
import {AUTHORIZATION_STATUS} from '../../const';
import Nav from '../../components/header/nav';

type HeaderProps = {
  isNavShow?: boolean;
  authorizationStatus?: AUTHORIZATION_STATUS;
  countFavorites?: number;
}

function Header({isNavShow, countFavorites, authorizationStatus = AUTHORIZATION_STATUS.Unknown}: HeaderProps): JSX.Element {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
            </Link>
          </div>
          {(isNavShow && countFavorites) && <Nav authorizationStatus={authorizationStatus} countFavorites={countFavorites}/>}
        </div>
      </div>
    </header>
  );
}

export default Header;
