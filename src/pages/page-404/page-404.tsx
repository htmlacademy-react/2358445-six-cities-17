import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
function Page404(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <Helmet>
              <title>404 Not Found</title>
            </Helmet>
            <h1 className="login__title">404 Not Found</h1>
            <a className="header__logo-link" href="main.html">Back to main page</a>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Page404;
