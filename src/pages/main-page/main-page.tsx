import {Helmet} from 'react-helmet-async';
import {AuthorizationStatus, Location} from '../../const';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import SortForm from '../../components/sort-form/sort-form';
import Card from '../../components/card/card';
import Map from '../../components/map/map';

type MainPageProps = {
  countPlaces: number;
  locations: Array<Location>;
  authorizationStatus: AuthorizationStatus;
}

function MainPage({countPlaces, locations, authorizationStatus}: MainPageProps): JSX.Element {
  return (
    <div className='page page--gray page--main'>
      <Header isNavShow authorizationStatus={authorizationStatus}/>
      <main className='page__main page__main--index'>
        <Helmet>
          <title>Six cities</title>
        </Helmet>
        <Cities locations={locations}/>
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>312 places to stay in Amsterdam</b>
              <SortForm/>
              <div className='cities__places-list places__list tabs__content'>
                {[...Array<number>(countPlaces)].map(()=> <Card key={Math.random()} page='cities'/>)}
              </div>
            </section>
            <div className='cities__right-section'>
              <Map page='cities'/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
