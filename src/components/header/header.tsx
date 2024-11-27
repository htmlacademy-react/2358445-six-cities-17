import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import Nav from '../../components/header/nav';

type HeaderProps = {
  isNavShow?: boolean;
  authorizationStatus?: AuthorizationStatus;
}

function Header({isNavShow, authorizationStatus = AuthorizationStatus.Unknown}: HeaderProps): JSX.Element {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
            </Link>
          </div>
          {isNavShow && <Nav authorizationStatus={authorizationStatus}/>}
        </div>
      </div>
    </header>
  );
}

export default Header;
