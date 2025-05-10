import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    // Add other reducers here as your application grows
});

export default rootReducer;
