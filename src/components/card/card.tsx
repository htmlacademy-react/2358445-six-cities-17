import {AuthorizationStatus, SettingsType, OfferSimple} from '../../const';
import { toUpFirstLetter, showRating } from '../../utils';
import {Link} from 'react-router-dom';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import OfferLabel from '../offerLabel/offerLabel';

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

type CardProps = OfferSimple & {
  page?: 'cities' | 'near-places' | 'favorites';
  authorizationStatus: AuthorizationStatus;
};

function Card({id, title, type, price, previewImage, isPremium, isFavorite, rating, page = 'cities', authorizationStatus = AuthorizationStatus.Unknown}: CardProps): JSX.Element {
  const premiumIcon = isPremium ? <OfferLabel/> : '';
  return (
    <>
      {premiumIcon}
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className='place-card__image' src={previewImage} width={CardSettings[page].width} height={CardSettings[page].height} alt={title} />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <BookmarkButton isFavorite={isFavorite} authorizationStatus={authorizationStatus}/>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: showRating(rating)}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className='place-card__type'>{toUpFirstLetter(type)}</p>
      </div>
    </>
  );
}

export default Card;
