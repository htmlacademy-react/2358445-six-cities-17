import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';

function ServerErrorPage(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <Helmet>
              <title>Server error</title>
            </Helmet>
            <h1 className="login__title">Server returned an error</h1>
          </section>
          <section className="locations locations--login locations--current">
          </section>
        </div>
      </main>
    </div>
  );
}

export default ServerErrorPage;
