import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationItemLink from '../../components/location-item-link/location-item-link';
import {AUTHORIZATION_STATUS, APP_ROUTE} from '../../const';
import {Navigate} from 'react-router-dom';

type LoginPageProps = {
  authorizationStatus: AUTHORIZATION_STATUS;
}

function LoginPage({authorizationStatus}: LoginPageProps): JSX.Element {
  if (authorizationStatus === AUTHORIZATION_STATUS.Auth) {
    return <Navigate to={APP_ROUTE.Main} />;
  }
  return (
    <div className="page page--gray page--login">
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <Helmet>
              <title>Login</title>
            </Helmet>
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <LocationItemLink text='Amsterdam' isTab={false} isActive/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
