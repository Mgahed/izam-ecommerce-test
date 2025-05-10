import { useSelector, useDispatch } from 'react-redux';
import { login, register, logout } from '../actions/authActions';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error, isAuthenticated } = useSelector(state => state.auth);

    // Login function
    const loginUser = async (email, password) => {
        try {
            return await dispatch(login(email, password));
        } catch (error) {
            throw error;
        }
    };

    // Register function
    const registerUser = async (name, email, password, password_confirmation) => {
        try {
            return await dispatch(register(name, email, password, password_confirmation));
        } catch (error) {
            throw error;
        }
    };

    // Logout function
    const logoutUser = () => {
        dispatch(logout());
    };

    // Return the same interface as the previous useAuth context
    return {
        user,
        loading,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        isAuthenticated,
        error
    };
};
