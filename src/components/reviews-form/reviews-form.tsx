import {STARS_COUNT, RATING_VALUES} from '../../const';
import {ChangeEvent, FormEvent, Fragment, useState} from 'react';

type ReviewsFormProps = {
  offerId: string;
};

function ReviewsForm({offerId}: ReviewsFormProps): JSX.Element {
  const defaultTextUnderForm = <>To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b></>;
  const [textUnderForm, setTextUnderForm] = useState(defaultTextUnderForm);
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
    ratingDisabled: false,
    reviewDisabled: false,
    submitDisabled: true,
    offerId: offerId
  });
  const reviewCondition: boolean = (formData.review.length >= 50 && formData.review.length < 300);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, 'rating': +evt.target.value }));
    if (reviewCondition) {
      setFormData((prevState) => ({ ...prevState, 'submitDisabled': false }));
    }
    if (+evt.target.value) {
      if (reviewCondition) {
        setTextUnderForm(defaultTextUnderForm);
      } else {
        setTextUnderForm(<>Error is detected! Your text lenght is incorrect</>);
      }
    } else {
      setTextUnderForm(<>Error is detected! You didn&apos;t set rating</>);
      setFormData((prevState) => ({ ...prevState, 'submitDisabled': true }));
    }
  };
  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({ ...prevState, 'review': evt.target.value }));
    if (formData.rating) {
      setFormData((prevState) => ({ ...prevState, 'submitDisabled': false }));
    }
    if (reviewCondition) {
      if (formData.rating) {
        setTextUnderForm(defaultTextUnderForm);
      } else {
        setTextUnderForm(<>Error is detected! You didn&apos;t set rating</>);
      }
    } else {
      setTextUnderForm(<>Error is detected! Your text lenght is incorrect</>);
      setFormData((prevState) => ({ ...prevState, 'submitDisabled': true }));
    }
  };
  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      setFormData({
        rating: 0,
        review: '',
        ratingDisabled: true,
        reviewDisabled: true,
        submitDisabled: true,
        offerId: offerId
      });
    }}
    >
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        {RATING_VALUES.map((value: string, key: number)=> (
          <Fragment key={`rating_${value}`}>
            <input className='form__rating-input visually-hidden' name='rating' value={STARS_COUNT - key} id={`${STARS_COUNT - key}-stars`} type='radio' checked={formData.rating === STARS_COUNT - key} onChange={handleRatingChange} disabled={formData.ratingDisabled}/>
            <label htmlFor={`${STARS_COUNT - key}-stars`} className='reviews__rating-label form__rating-label' title={value}>
              <svg className='form__star-image' width='37' height='33'>
                <use xlinkHref='#icon-star'></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea className='reviews__textarea form__textarea' id='review' name='review' placeholder='Tell how was your stay, what you like and what can be improved' onChange={handleTextareaChange} value={formData.review} disabled={formData.reviewDisabled}></textarea>
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          {textUnderForm}.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled={formData.submitDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
