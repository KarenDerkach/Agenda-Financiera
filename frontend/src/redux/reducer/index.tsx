import {combineReducers} from 'redux';
import { cityReducer } from './cityReducer';
import { addCheqReducer } from './cheqReducer';
import { eventReducer } from './eventReducer';
import { userReducer } from './userReducer';
import {StoreState} from '../../tools/interface';

export const reducers = combineReducers <StoreState>({
	city: cityReducer,
	stateCheq: addCheqReducer,
	stateEvent: eventReducer,
	stateUser: userReducer
});


// const userInfoFromStorage = localStorage.getItem("token") || "";
// const info = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : '';

// export const initialState = {
//   stateUser: { userInfo: info },
// };