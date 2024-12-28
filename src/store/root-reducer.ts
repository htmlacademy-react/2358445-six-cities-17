import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {offerProcess} from './offer-process/offer-process';
import {cardsProcess} from './cards-process/cards-process';

export const rootReducer = combineReducers({
  [NameSpace.Cards]: cardsProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
