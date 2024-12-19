import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationItemLink from '../../components/location-item-link/location-item-link';
import {AuthorizationStatus, AppRoute} from '../../const';
import {Navigate} from 'react-router-dom';
import {randomizeCity, checkPassword} from '../../utils';
import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  const [passwordError, setPasswordError] = useState(true);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }
  const randomCity = randomizeCity();

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPasswordError(checkPassword(evt.target.value));
  };

  return (
    <div className='page page--gray page--login'>
      <Header/>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <Helmet>
              <title>Login</title>
            </Helmet>
            <h1 className='login__title'>Sign in</h1>
            <form className='login__form form' action='#' method='post' onSubmit={handleSubmit}>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input ref={loginRef} className='login__input form__input' type='email' name='email' placeholder='Email' required />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input ref={passwordRef} className='login__input form__input' type='password' name='password' placeholder='Password' onChange={handlePasswordChange} required />
                {passwordError || <div style={{color: 'red', marginBottom: '20px', fontSize: 'small'}}>The password must consist of at least one letter and number.</div>}
              </div>
              <button className='login__submit form__submit button' type='submit' disabled={!passwordError}>Sign in</button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <LocationItemLink text={randomCity} isTab={false} isActive/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
