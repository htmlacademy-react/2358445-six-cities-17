import {Link} from 'react-router-dom';
import Nav from '../../components/header/nav';
type HeaderProps = {
  isNavShow?: boolean;
}

function Header({isNavShow}: HeaderProps): JSX.Element {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
            </Link>
          </div>
          {isNavShow && <Nav/>}
        </div>
      </div>
    </header>
  );
}

export default Header;
