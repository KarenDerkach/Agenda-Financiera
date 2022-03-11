import {combineReducers} from 'redux';
import { cityReducer, allCityReducer, deleteReducer } from './cityReducer';
import { addCheqReducer } from './cheqReducer';
import { eventReducer } from './eventReducer';
import {StoreState} from '../../tools/interface';

export const reducers = combineReducers <StoreState>({
	city: cityReducer,
	allCities: allCityReducer,
	deleteCity:deleteReducer,
	stateCheq: addCheqReducer,
	stateEvent: eventReducer
});