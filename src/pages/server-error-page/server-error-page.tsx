import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import {useAppDispatch} from '../../hooks';
import {Page} from '../../const';
import {useParams} from 'react-router-dom';
import {useCallback} from 'react';
import {fetchFavoriteListAction, fetchNearByAction, fetchOfferAction, fetchOffersAction, fetchReviewsAction} from '../../store/api-actions';

type ServerErrorPageProps = {
  page: Page;
}

function ServerErrorPage({ page }: ServerErrorPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const handleTryAgainClick = useCallback(() => {
    if (page === Page.Cities) {
      dispatch(fetchOffersAction());
    }
    if (page === Page.Offer) {
      if (id) {
        dispatch(fetchOfferAction(id))
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              dispatch(fetchReviewsAction(id));
              dispatch(fetchNearByAction(id));
            }
          });
      }
    }
    if (page === Page.Favorites) {
      dispatch(fetchFavoriteListAction());
    }
  }, [page]);
  return (
    <div className='page page--gray page--login'>
      <Header />
      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <Helmet>
              <title>Server error</title>
            </Helmet>
            <h1 className='login__title'>Server returned an error</h1>
            <button onClick={handleTryAgainClick} className='form__submit button' type='button'>Try again</button>
          </section>
          <section className='locations locations--login locations--current'>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ServerErrorPage;
