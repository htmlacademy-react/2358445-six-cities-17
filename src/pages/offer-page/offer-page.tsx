import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {NEARBY_COUNT, Page} from '../../const';
import {getMapPoints, showRating} from '../../utils';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import ReviewsList from '../../components/reviews-list/reviews-list';
import OfferGalery from '../../components/offer-galery/offer-galery';
import OfferGoods from '../../components/offer-goods/offer-goods';
import HostUser from '../../components/host-user/host-user';
import OfferLabel from '../../components/offerLabel/offerLabel';
import {fetchNearByAction, fetchOfferAction, fetchReviewsAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import LoadingPage from '../loading-page/loading-page';
import {useEffect} from 'react';
import Page404 from '../page-404/page-404';
import NearByOffers from '../../components/near-by-offers/near-by-offers';
import {selectIsNearByDataLoading, selectIsOfferDataLoading, selectIsReviewsDataLoading, selectNearByOffers, selectOffer, selectReviews} from '../../store/selectors';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            dispatch(fetchReviewsAction(id));
            dispatch(fetchNearByAction(id));
          }
        });
    }
  }, [dispatch, id]);

  const page = Page.Offer;
  const offer = useAppSelector(selectOffer);
  const reviews = useAppSelector(selectReviews);
  const neighbourhoodOffers = useAppSelector(selectNearByOffers);
  const isOfferDataLoading = useAppSelector(selectIsOfferDataLoading);
  const isReviewsDataLoading = useAppSelector(selectIsReviewsDataLoading);
  const isNearByDataLoading = useAppSelector(selectIsNearByDataLoading);

  if (isOfferDataLoading || isReviewsDataLoading || isNearByDataLoading) {
    return <LoadingPage/>;
  }

  if (!offer) {
    return <Page404/>;
  }

  const {isPremium, title, images, isFavorite, rating, type, bedrooms, maxAdults, price, goods, description, host} = offer;

  const premiumIcon = isPremium && <OfferLabel page={page} />;
  const nearOffers = neighbourhoodOffers.slice(0, NEARBY_COUNT);
  const offersForMap = getMapPoints(nearOffers, offer);

  return (
    <div className='page'>
      <Header isNavShow/>
      <main className='page__main page__main--offer'>
        <section className={page}>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <OfferGalery images={images} />
          <div className='offer__container container'>
            <div className='offer__wrapper'>
              {premiumIcon}
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>{title}</h1>
                <BookmarkButton isFavorite={isFavorite} page={page} offerId={offer.id} />
              </div>
              <div className='offer__rating rating'>
                <div className='offer__stars rating__stars'>
                  <span style={{ width: showRating(rating) }}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='offer__rating-value rating__value'>{rating}</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature offer__feature--entire'>
                  {type}
                </li>
                <li className='offer__feature offer__feature--bedrooms'>
                  {bedrooms} Bedroom{bedrooms > 1 && 's'}
                </li>
                <li className='offer__feature offer__feature--adults'>
                  Max {maxAdults} adult{maxAdults > 1 && 's'}
                </li>
              </ul>
              <div className='offer__price'>
                <b className='offer__price-value'>&euro;{price}</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              <OfferGoods goods={goods} />
              <div className='offer__host'>
                <h2 className='offer__host-title'>Meet the host</h2>
                <HostUser host={host} />
                <div className='offer__description'>
                  <p className='offer__text'>{description}</p>
                </div>
              </div>
              <ReviewsList reviews={reviews} offerId={offer.id} />
            </div>
          </div>
          <Map page={page} offers={offersForMap} selectedOffer={offer}/>
        </section>
        {nearOffers.length && <NearByOffers/>}
      </main>
    </div>
  );
}

export default OfferPage;
