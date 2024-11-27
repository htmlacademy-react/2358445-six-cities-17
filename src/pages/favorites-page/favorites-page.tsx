import {Helmet} from 'react-helmet-async';
import {AuthorizationStatus} from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import LocationItemLink from '../../components/location-item-link/location-item-link';
import Card from '../../components/card/card';

type FavoritesPageProps = {
  authorizationStatus: AuthorizationStatus;
}

function FavoritesPage({authorizationStatus}: FavoritesPageProps): JSX.Element {
  return (
    <div className='page'>
      <Header isNavShow authorizationStatus={authorizationStatus}/>
      <main className='page__main page__main--favorites'>
        <Helmet>
          <title>Saved listing</title>
        </Helmet>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              <li className='favorites__locations-items'>
                <div className='favorites__locations locations locations--current'>
                  <div className='locations__item'>
                    <LocationItemLink text='Amsterdam' isTab={false} isActive/>
                  </div>
                </div>
                <div className='favorites__places'>
                  <Card page='favorites'/>
                  <Card page='favorites'/>
                </div>
              </li>

              <li className='favorites__locations-items'>
                <div className='favorites__locations locations locations--current'>
                  <div className='locations__item'>
                    <LocationItemLink text='Cologne' isTab={false} isActive/>
                  </div>
                </div>
                <div className='favorites__places'>
                  <Card page='favorites'/>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesPage;
