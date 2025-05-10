import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                loading: true
            };

        case actionTypes.AUTH_LOADED_USER:
        case actionTypes.AUTH_LOGIN_SUCCESS:
        case actionTypes.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                isAuthenticated: true,
                error: null
            };

        case actionTypes.AUTH_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                isAuthenticated: false,
                error: null
            };

        default:
            return state;
    }
};

export default authReducer;
