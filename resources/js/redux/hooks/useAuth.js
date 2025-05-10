import { useSelector, useDispatch } from 'react-redux';
import { login, register, logout } from '../slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error, isAuthenticated } = useSelector(state => state.auth);

    // Login function
    const loginUser = async (email, password) => {
        try {
            const resultAction = await dispatch(login({ email, password }));
            if (login.fulfilled.match(resultAction)) {
                return resultAction.payload;
            } else {
                throw new Error(resultAction.payload || 'Login failed');
            }
        } catch (error) {
            throw error;
        }
    };

    // Register function
    const registerUser = async (name, email, password, password_confirmation) => {
        try {
            const resultAction = await dispatch(register({ name, email, password, password_confirmation }));
            if (register.fulfilled.match(resultAction)) {
                return resultAction.payload;
            } else {
                throw new Error(resultAction.payload || 'Registration failed');
            }
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
