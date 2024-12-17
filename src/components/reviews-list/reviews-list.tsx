import {AuthorizationStatus} from '../../const';
import {Review} from '../../types';
import ReviewItem from '../review-item/review-item';
import ReviewsForm from '../reviews-form/reviews-form';

type ReviewsListProps = {
  reviews: Review[];
  authorizationStatus: AuthorizationStatus;
  offerId: string;
};

function ReviewsList({ reviews, offerId, authorizationStatus = AuthorizationStatus.Unknown }: ReviewsListProps): JSX.Element {
  const sortedReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  const reviewsList = sortedReviews.map((review) => (
    <ReviewItem
      key={review.id}
      comment={review.comment}
      date={review.date}
      rating={review.rating}
      user={review.user}
    />
  ));
  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.length}</span></h2>
      <ul className='reviews__list'>
        {reviewsList}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm offerId={offerId}/>}
    </section>
  );
}

export default ReviewsList;
