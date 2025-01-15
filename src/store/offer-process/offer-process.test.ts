import {OfferProcessType} from '../../types';
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
});
