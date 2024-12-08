import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {AUTHORIZATION_STATUS} from '../../const';
import {Offer, OfferFull, Review} from '../../types';
import {showRating} from '../../utils';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import ReviewsList from '../../components/reviews-list/reviews-list';
import OfferGalery from '../../components/offer-galery/offer-galery';
import OfferGoods from '../../components/offer-goods/offer-goods';
import HostUser from '../../components/host-user/host-user';
import CardsList from '../../components/cards-list/cards-list';
import OfferLabel from '../../components/offerLabel/offerLabel';

type OfferPageProps = {
  authorizationStatus: AUTHORIZATION_STATUS;
  offer: OfferFull;
  reviews: Review[];
  neighbourhoodOffers: Offer[];
  countFavorites: number;
}

function OfferPage({ offer, reviews, neighbourhoodOffers, countFavorites, authorizationStatus = AUTHORIZATION_STATUS.Unknown }: OfferPageProps): JSX.Element {
  const params = useParams();
  const page = 'offer';
  const premiumIcon = offer.isPremium ? <OfferLabel page={page} /> : '';
  if (params.id) {
    //console.log(params);
  }
  return (
    <div className='page'>
      <Header isNavShow authorizationStatus={authorizationStatus} countFavorites={countFavorites}/>
      <main className='page__main page__main--offer'>
        <section className={page}>
          <Helmet>
            <title>{offer.title}</title>
          </Helmet>
          <OfferGalery images={offer.images} />
          <div className='offer__container container'>
            <div className='offer__wrapper'>
              {premiumIcon}
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>{offer.title}</h1>
                <BookmarkButton isFavorite={offer.isFavorite} page={page} authorizationStatus={authorizationStatus} />
              </div>
              <div className='offer__rating rating'>
                <div className='offer__stars rating__stars'>
                  <span style={{ width: showRating(offer.rating) }}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='offer__rating-value rating__value'>{offer.rating}</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature offer__feature--entire'>
                  {offer.type}
                </li>
                <li className='offer__feature offer__feature--bedrooms'>
                  {offer.bedrooms} Bedroom{offer.bedrooms > 1 && 's'}
                </li>
                <li className='offer__feature offer__feature--adults'>
                  Max {offer.maxAdults} adult{offer.maxAdults > 1 && 's'}
                </li>
              </ul>
              <div className='offer__price'>
                <b className='offer__price-value'>&euro;{offer.price}</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              <OfferGoods goods={offer.goods} />
              <div className='offer__host'>
                <h2 className='offer__host-title'>Meet the host</h2>
                <HostUser host={offer.host} />
                <div className='offer__description'>
                  <p className='offer__text'>{offer.description}</p>
                </div>
              </div>
              <ReviewsList authorizationStatus={authorizationStatus} reviews={reviews} offerId={offer.id} />
            </div>
          </div>
          <Map page={page} offers={[offer, ...neighbourhoodOffers]} selectedOffer={offer}/>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <CardsList
              authorizationStatus={authorizationStatus}
              offers={neighbourhoodOffers}
              page='near-places'
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
