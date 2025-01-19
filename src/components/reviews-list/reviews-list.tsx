import {memo, useMemo} from 'react';
import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {selectAuthorizationStatus} from '../../store/user-process/selectors';
import {Review} from '../../types';
import {sortReviews} from '../../utils';
import ReviewItem from '../review-item/review-item';
import ReviewsForm from '../reviews-form/reviews-form';

type ReviewsListProps = {
  reviews: Review[];
  offerId: string;
};

function ReviewsList({ reviews, offerId }: ReviewsListProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthorized = useMemo(() => authorizationStatus === AuthorizationStatus.Auth, [authorizationStatus]);
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
    <section className='offer__reviews reviews' data-testid='offer-reviews-container'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount' data-testid='offer-common-count'>{reviews.length}</span></h2>
      <ul className='reviews__list'>
        {reviewsList}
      </ul>
      {isAuthorized && <ReviewsForm offerId={offerId}/>}
    </section>
  );
}

export default memo(ReviewsList);
