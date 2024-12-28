import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import MainEmpty from '../../components/main-empty/main-empty';
import cn from 'classnames';
import {useAppSelector} from '../../hooks';
import ServerErrorPage from '../server-error-page/server-error-page';
import MainPageInner from './main-page-inner';
import {Page} from '../../const';
import {selectCitySortOffers, selectIsErrorInOffersDataLoading} from '../../store/cards-process/selectors';

type MainPageProps = {
  cities: string[];
}

function MainPage({cities}: MainPageProps): JSX.Element {
  const isErrorInOffersDataLoading = useAppSelector(selectIsErrorInOffersDataLoading);
  const sortedOffers = useAppSelector(selectCitySortOffers);

  if (isErrorInOffersDataLoading) {
    return <ServerErrorPage page={Page.Cities}/>;
  }

  return (
    <div className='page page--gray page--main'>
      <Header isNavShow/>
      <main className={cn('page__main', 'page__main--index', {'page__main--index-empty': !sortedOffers.length})}>
        <Helmet>
          <title>Six cities</title>
        </Helmet>
        <Cities cities={cities}/>
        <div className='cities'>
          <div className={cn('cities__places-container', 'container', {'cities__places-container--empty':!sortedOffers.length})}>
            {sortedOffers.length ? <MainPageInner sortedOffers={sortedOffers}/> : <MainEmpty/>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
