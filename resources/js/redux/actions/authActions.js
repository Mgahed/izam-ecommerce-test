import * as actionTypes from './actionTypes';
import AuthService from '../../services/auth';

// Load user from localStorage
export const loadUser = () => dispatch => {
    dispatch({ type: actionTypes.AUTH_LOADING });

    try {
        const user = AuthService.getCurrentUser();

        if (user) {
            dispatch({
                type: actionTypes.AUTH_LOADED_USER,
                payload: user
            });
        } else {
            dispatch({ type: actionTypes.AUTH_LOGOUT });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.AUTH_ERROR,
            payload: error.message
        });
    }
};

// Login user
export const login = (email, password) => async dispatch => {
    dispatch({ type: actionTypes.AUTH_LOADING });

    try {
        const data = await AuthService.login(email, password);

        dispatch({
            type: actionTypes.AUTH_LOGIN_SUCCESS,
            payload: data.user
        });

        return data;
    } catch (error) {
        dispatch({
            type: actionTypes.AUTH_ERROR,
            payload: error.response?.data?.message || 'Login failed'
        });

        throw error;
    }
};

// Register user
export const register = (name, email, password, password_confirmation) => async dispatch => {
    dispatch({ type: actionTypes.AUTH_LOADING });

    try {
        const data = await AuthService.register(name, email, password, password_confirmation);

        dispatch({
            type: actionTypes.AUTH_REGISTER_SUCCESS,
            payload: data.user
        });

        return data;
    } catch (error) {
        dispatch({
            type: actionTypes.AUTH_ERROR,
            payload: error.response?.data?.message || 'Registration failed'
        });

        throw error;
    }
};

// Logout user
export const logout = () => async dispatch => {
    try {
        await AuthService.logout();

        dispatch({
            type: actionTypes.AUTH_LOGOUT
        });
    } catch (error) {
        console.error('Logout error', error);

        // Still logout even if API call fails
        dispatch({
            type: actionTypes.AUTH_LOGOUT
        });
    }
};
