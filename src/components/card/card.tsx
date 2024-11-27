import {SettingsType} from '../../const';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';

const CardSettings: SettingsType = {
  'cities': {
    width: 260,
    height: 200
  },
  'favorites': {
    width: 150,
    height: 110
  },
};

type CardProps = {
  page?: 'cities' | 'favorites';
};

function Card({page = 'cities'}: CardProps): JSX.Element {
  return (
    <article className={`${page}__card place-card`}>
      <div className='place-card__mark'>
        <span>Premium</span>
      </div>
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <a href='#'>
          <img className='place-card__image' src='img/apartment-01.jpg' width={CardSettings[page].width} height={CardSettings[page].height} alt='Place image' />
        </a>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;120</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <BookmarkButton/>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: '80%'}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='#'>Beautiful &amp; luxurious apartment at great location</a>
        </h2>
        <p className='place-card__type'>Apartment</p>
      </div>
    </article>
  );
}

export default Card;
