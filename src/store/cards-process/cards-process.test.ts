import {CITIES, FIRST_CITY, SortType} from '../../const';
import { makeFakeOffer } from '../../mocks';
import {CardsProcessType} from '../../types';
import {fetchFavoriteListAction, fetchOffersAction} from '../api-actions';
import {cardsProcess, changeCity, changeSort} from './cards-process';

describe('CardProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: CardsProcessType = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };

    const result = cardsProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: CardsProcessType = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };

    const result = cardsProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city and sort with "changeCity" action', () => {
    const initialState: CardsProcessType = {
      city: FIRST_CITY,
      sort: SortType.PRICE_HIGH_TO_LOW,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };
    const expectedState: CardsProcessType = {
      city: CITIES[1],
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };

    const result = cardsProcess.reducer(initialState, changeCity(CITIES[1]));

    expect(result).toEqual(expectedState);
  });

  it('should change sort with "changeSort" action', () => {
    const initialState: CardsProcessType = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };
    const expectedSort = SortType.PRICE_HIGH_TO_LOW;

    const result = cardsProcess.reducer(initialState, changeSort(SortType.PRICE_HIGH_TO_LOW));

    expect(result.sort).toBe(expectedSort);
  });

  it('should set "isOffersDataLoading" to "true", "isErrorInOffersDataLoading" to "false" with "fetchOffersAction.pending"', () => {
    const expectedState = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: true,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };

    const result = cardsProcess.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offer, "isOffersDataLoading" to "false", "isErrorInOffersDataLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const expectedState = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [mockOffer],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };

    const result = cardsProcess.reducer(
      undefined,
      fetchOffersAction.fulfilled(
        [mockOffer], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "false", "isErrorInOffersDataLoading" to "true" with "fetchOffersAction.rejected', () => {
    const expectedState = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: true,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };

    const result = cardsProcess.reducer(
      undefined,
      fetchOffersAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoriteListDataLoading" to "true", "isErrorInFavoriteListDataLoading" to "false" with "fetchFavoriteListAction.pending"', () => {
    const expectedState = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: true,
      isErrorInFavoriteListDataLoading: false
    };

    const result = cardsProcess.reducer(undefined, fetchFavoriteListAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "favorites" to array with offer, "isFavoriteListDataLoading" to "false", "isErrorInFavoriteListDataLoading" to "false" with "fetchFavoriteListAction.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const expectedState = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [mockOffer],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: false
    };

    const result = cardsProcess.reducer(
      undefined,
      fetchFavoriteListAction.fulfilled(
        [mockOffer], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoriteListDataLoading" to "false", "isErrorInFavoriteListDataLoading" to "true" with "fetchFavoriteListAction.rejected', () => {
    const expectedState = {
      city: FIRST_CITY,
      sort: SortType.POPULAR,
      offers: [],
      isOffersDataLoading: false,
      isErrorInOffersDataLoading: false,
      favorites: [],
      isFavoriteListDataLoading: false,
      isErrorInFavoriteListDataLoading: true
    };

    const result = cardsProcess.reducer(
      undefined,
      fetchFavoriteListAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});
