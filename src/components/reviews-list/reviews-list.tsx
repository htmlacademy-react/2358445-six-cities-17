import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {Review} from '../../types';
import {sortReviews} from '../../utils';
import ReviewItem from '../review-item/review-item';
import ReviewsForm from '../reviews-form/reviews-form';

type ReviewsListProps = {
  reviews: Review[];
  offerId: string;
};

function ReviewsList({ reviews, offerId }: ReviewsListProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  let reviewsList;
  if (reviews.length) {
    const sortedReviews = sortReviews(reviews);
    reviewsList = sortedReviews.map((review) => (
      <ReviewItem
        key={review.id}
        comment={review.comment}
        date={review.date}
        rating={review.rating}
        user={review.user}
      />
    ));
  }

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
