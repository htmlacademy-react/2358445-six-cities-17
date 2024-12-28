import {NameSpace} from '../../const';
import {AppState, OfferFull, Offers, Reviews} from '../../types';

export const selectNearByOffers = (state: AppState): Offers => state[NameSpace.Offer].nearBy;
export const selectOffer = (state: AppState): OfferFull | null => state[NameSpace.Offer].offer;
export const selectReviews = (state: AppState): Reviews => state[NameSpace.Offer].reviews;
export const selectIsOfferDataLoading = (state: AppState): boolean => state[NameSpace.Offer].isOfferDataLoading;
export const selectIsErrorInOfferDataLoading = (state: AppState): boolean => state[NameSpace.Offer].isErrorInOfferDataLoading;
export const selectIsReviewsDataLoading = (state: AppState): boolean => state[NameSpace.Offer].isReviewsDataLoading;
export const selectIsNearByDataLoading = (state: AppState): boolean => state[NameSpace.Offer].isNearByDataLoading;
