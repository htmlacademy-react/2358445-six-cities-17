import {STARS_COUNT, RATING_VALUES} from '../../const';
import { ChangeEvent, FormEvent, Fragment, useState } from 'react';

type ReviewsFormProps = {
  offerId: string;
  onAddReview: (offerId: string, rating: number, review: string) => void;
};

function ReviewsForm({offerId, onAddReview}: ReviewsFormProps): JSX.Element {

  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });
  const handleFieldChange = (evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: (name === 'rating' ? +value : value)});
  };
  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      onAddReview(offerId, formData.rating, formData.review);
    }}
    >
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        {RATING_VALUES.map((value: string, key: number)=> (
          <Fragment key={`rating_${value}`}>
            <input className='form__rating-input visually-hidden' name='rating' value={STARS_COUNT - key} id={`${STARS_COUNT - key}-stars`} type='radio' onChange={handleFieldChange}/>
            <label htmlFor={`${STARS_COUNT - key}-stars`} className='reviews__rating-label form__rating-label' title={value}>
              <svg className='form__star-image' width='37' height='33'>
                <use xlinkHref='#icon-star'></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea className='reviews__textarea form__textarea' id='review' name='review' placeholder='Tell how was your stay, what you like and what can be improved' onChange={handleFieldChange} value={formData.review}></textarea>
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit'>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
