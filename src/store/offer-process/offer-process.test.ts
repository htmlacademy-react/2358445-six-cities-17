import {makeFakeOffer, makeFakeOfferFull, makeFakeReview} from '../../mocks';
import {Offer, OfferProcessType, Review, Reviews} from '../../types';
import {addReviewAction, fetchNearByAction, fetchOfferAction, fetchReviewsAction} from '../api-actions';
import {offerProcess} from './offer-process';

describe('OfferProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferDataLoading" to "true", "isErrorInOfferDataLoading" to "false" with "fetchOfferAction.pending"', () => {
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: true,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(undefined, fetchOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to OfferFull, "isOfferDataLoading" to "false", "isErrorInOfferDataLoading" to "false" with "fetchOfferAction.fulfilled"', () => {
    const mockOffer = makeFakeOfferFull();
    const expectedState: OfferProcessType = {
      offer: mockOffer,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(
      undefined,
      fetchOfferAction.fulfilled(
        mockOffer, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferDataLoading" to "false", "isErrorInOfferDataLoading" to "true" with "fetchOfferAction.rejected', () => {
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: true,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(
      undefined,
      fetchOfferAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "true", "isErrorInReviewsDataLoading" to "false" with "fetchReviewsAction.pending"', () => {
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: true,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(undefined, fetchReviewsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with review, "isReviewsDataLoading" to "false", "isErrorInReviewsDataLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
    const mockReviews:Reviews = Array<Review>(12).fill(makeFakeReview());
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: mockReviews,
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(
      undefined,
      fetchReviewsAction.fulfilled(
        mockReviews, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "false", "isErrorInReviewsDataLoading" to "true" with "fetchReviewsAction.rejected', () => {
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: true,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(
      undefined,
      fetchReviewsAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isNearByDataLoading" to "true", "isErrorInNearByDataLoading" to "false" with "fetchNearByAction.pending"', () => {
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: true,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(undefined, fetchNearByAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "nearBy" to array with offer, "isNearByDataLoading" to "false", "isErrorInNearByDataLoading" to "false" with "fetchNearByAction.fulfilled"', () => {
    const mockNearBy = Array<Offer>(12).fill(makeFakeOffer());
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: mockNearBy,
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(
      undefined,
      fetchNearByAction.fulfilled(
        mockNearBy, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isNearByDataLoading" to "false", "isErrorInNearByDataLoading" to "true" with "fetchNearByAction.rejected', () => {
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: true
    };

    const result = offerProcess.reducer(
      undefined,
      fetchNearByAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isAddReviewDataLoading" to "true", "isErrorInAddReviewDataLoading" to "false" with "addReviewAction.pending"', () => {
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: true,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(undefined, addReviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with added review, "isAddReviewDataLoading" to "false", "isErrorInAddReviewDataLoading" to "false" with "addReviewAction.fulfilled"', () => {
    const addedReview = makeFakeReview();
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [addedReview],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: false,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(
      undefined,
      addReviewAction.fulfilled(
        addedReview, '', {
          offerId: 'some offer id',
          comment: 'some text',
          rating: 4
        })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isAddReviewDataLoading" to "false", "isErrorInAddReviewDataLoading" to "true" with "addReviewAction.rejected', () => {
    const expectedState: OfferProcessType = {
      offer: null,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
      reviews: [],
      isReviewsDataLoading: false,
      isErrorInReviewsDataLoading: false,
      isAddReviewLoading: false,
      isErrorInAddReviewLoading: true,
      nearBy: [],
      isNearByDataLoading: false,
      isErrorInNearByDataLoading: false
    };

    const result = offerProcess.reducer(
      undefined,
      addReviewAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});
