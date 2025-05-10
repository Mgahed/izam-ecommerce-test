import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // Corrected import
import rootReducer from './reducers'; // This will point to reducers/index.js
import { loadCart } from './actions/cartActions';
import { loadUser } from './actions/authActions';

const initialState = {};

const middleware = [thunk];

// Enable Redux DevTools Extension
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extensionP options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);

const store = createStore(
    rootReducer,
    initialState,
    enhancer
);

// Load cart and user from local storage on store initialization
store.dispatch(loadCart());
store.dispatch(loadUser());

export default store;
