import {Link, useLocation} from 'react-router-dom';
import Nav from '../../components/header/nav';
import {memo} from 'react';

type HeaderProps = {
  isNavShow?: boolean;
}

function Header({isNavShow}: HeaderProps): JSX.Element {
  const logo = <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />;
  const logoBlock = (useLocation().pathname !== '/' ?
    <Link className="header__logo-link header__logo-link--active" to="/">{logo}</Link>
    :
    logo
  );
  return (
    <header className='header' data-testid='header-container'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>{logoBlock}</div>
          {isNavShow && <Nav/>}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
