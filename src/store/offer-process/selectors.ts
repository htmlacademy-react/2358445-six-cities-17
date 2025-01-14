import {NameSpace} from '../../const';
import {AppState, OfferFull, Offers, Reviews} from '../../types';

export const selectNearByOffers = (state: Pick<AppState, NameSpace.Offer>): Offers => state[NameSpace.Offer].nearBy;
export const selectOffer = (state: Pick<AppState, NameSpace.Offer>): OfferFull | null => state[NameSpace.Offer].offer;
export const selectReviews = (state: Pick<AppState, NameSpace.Offer>): Reviews => state[NameSpace.Offer].reviews;
export const selectIsOfferDataLoading = (state: Pick<AppState, NameSpace.Offer>): boolean => state[NameSpace.Offer].isOfferDataLoading;
export const selectIsErrorInOfferDataLoading = (state: Pick<AppState, NameSpace.Offer>): boolean => state[NameSpace.Offer].isErrorInOfferDataLoading;
export const selectIsReviewsDataLoading = (state: Pick<AppState, NameSpace.Offer>): boolean => state[NameSpace.Offer].isReviewsDataLoading;
export const selectIsNearByDataLoading = (state: Pick<AppState, NameSpace.Offer>): boolean => state[NameSpace.Offer].isNearByDataLoading;
