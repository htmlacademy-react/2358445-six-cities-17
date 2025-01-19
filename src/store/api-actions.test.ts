import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {addReviewAction, checkAuthAction, fetchFavoriteListAction, fetchNearByAction, fetchOfferAction, fetchOffersAction, fetchReviewsAction, loginAction, logoutAction } from './api-actions';
import {APIRoute} from '../const';
import * as tokenStorage from '../services/token';
import {AppState, AuthData, ReviewData} from '../types';
import {AppThunkDispatch, extractActionsTypes, makeFakeOffer, makeFakeOfferFull, makeFakeReview, makeFakeUserData} from '../mocks';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ cards: { offers: [] }});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456a' };
      const fakeServerReplay = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const loginActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);

      expect(loginActionFulfilled.payload)
        .toEqual(fakeServerReplay);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled", when server response 200', async() => {
      const mockOffer = makeFakeOfferFull();
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(APIRoute.Offer + offerId).reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(APIRoute.Offer + offerId).reply(400);

      await store.dispatch(fetchOfferAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async() => {
      const mockReviews = [makeFakeReview()];
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(APIRoute.Comments + offerId).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(APIRoute.Comments + offerId).reply(400, []);

      await store.dispatch(fetchReviewsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearByAction', () => {
    it('should dispatch "fetchNearByAction.pending", "fetchNearByAction.fulfilled", when server response 200', async() => {
      const mockNearBy = [makeFakeOffer()];
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(APIRoute.Offer + offerId + APIRoute.NearBy).reply(200, mockNearBy);

      await store.dispatch(fetchNearByAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearByActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearByAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearByAction.pending.type,
        fetchNearByAction.fulfilled.type,
      ]);

      expect(fetchNearByActionFulfilled.payload)
        .toEqual(mockNearBy);
    });

    it('should dispatch "fetchNearByAction.pending", "fetchNearByAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(APIRoute.Offer + offerId + APIRoute.NearBy).reply(400, []);

      await store.dispatch(fetchNearByAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearByAction.pending.type,
        fetchNearByAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteListAction', () => {
    it('should dispatch "fetchFavoriteListAction.pending", "fetchFavoriteListAction.fulfilled", when server response 200', async() => {
      const mockNearBy = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockNearBy);

      await store.dispatch(fetchFavoriteListAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteListAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteListAction.pending.type,
        fetchFavoriteListAction.fulfilled.type,
      ]);

      expect(fetchFavoriteListActionFulfilled.payload)
        .toEqual(mockNearBy);
    });

    it('should dispatch "fetchFavoriteListAction.pending", "fetchFavoriteListAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoriteListAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteListAction.pending.type,
        fetchFavoriteListAction.rejected.type,
      ]);
    });
  });

  describe('addReviewAction', () => {
    it('should dispatch "addReviewAction.pending", "addReviewAction.fulfilled", when server response 200', async() => {
      const offerId = 'some-offer-id';
      const fakeReview: ReviewData = {
        offerId: offerId,
        comment: '123456a',
        rating: 4
      };
      const fakeServerReplay = makeFakeReview();

      mockAxiosAdapter.onPost(APIRoute.Comments + offerId).reply(200, fakeServerReplay);

      await store.dispatch(addReviewAction(fakeReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const addReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof addReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        addReviewAction.pending.type,
        addReviewAction.fulfilled.type,
      ]);

      expect(addReviewActionFulfilled.payload)
        .toEqual(fakeServerReplay);
    });

    it('should dispatch "addReviewAction.pending", "addReviewAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      const fakeReview: ReviewData = {
        offerId: offerId,
        comment: '123456a',
        rating: 4
      };
      mockAxiosAdapter.onPost(APIRoute.Comments + offerId).reply(400, []);

      await store.dispatch(addReviewAction(fakeReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addReviewAction.pending.type,
        addReviewAction.rejected.type,
      ]);
    });
  });
});
