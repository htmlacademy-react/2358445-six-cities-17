import {AppRoute, Page} from '../../const';
import {SettingsType, OfferSimple} from '../../types';
import {toUpFirstLetter, showRating} from '../../utils';
import {Link} from 'react-router-dom';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import OfferLabel from '../offer-label/offer-label';
import {generatePath} from 'react-router';
import { memo, useMemo } from 'react';

const CardSettings: SettingsType = {
  'cities': {
    width: 260,
    height: 200
  },
  'favorites': {
    width: 150,
    height: 110
  },
  'near-places': {
    width: 260,
    height: 200
  },
};

type CardProps = {
  offer: OfferSimple;
  page?: Page.Cities | Page.NearPlaces | Page.Favorites;
  onCardMouseEnter?: () => void;
  onCardMouseLeave?: () => void;
};

function Card({offer, page = Page.Cities, onCardMouseEnter, onCardMouseLeave}: CardProps): JSX.Element {
  const {id, title, type, previewImage, price, isFavorite, rating} = offer;
  const premiumIcon = offer.isPremium && <OfferLabel/>;
  const offerType = useMemo(() => toUpFirstLetter(type), [type]);
  return (
    <article
      key={id}
      className={`${page}__card place-card`}
      onMouseEnter={onCardMouseEnter}
      onMouseLeave={onCardMouseLeave}
      data-testid='place-card-container'
    >
      {premiumIcon}
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Offer, { id })}>
          <img className='place-card__image' src={previewImage} width={CardSettings[page].width} height={CardSettings[page].height} alt={title} />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <BookmarkButton isFavorite={isFavorite} offerId={id}/>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: showRating(rating)}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={generatePath(AppRoute.Offer, { id })}>
            {title}
          </Link>
        </h2>
        <p className='place-card__type'>{offerType}</p>
      </div>
    </article>
  );
}

export default memo(Card);
