import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import {Provider} from 'react-redux';
import store from './redux/store';

import HomePage from './pages/HomePage';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import CartPage from './pages/CartPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import OrderDetailPage from './pages/OrderDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

// Create Material UI theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        fontFamily: '"Instrument Sans", sans-serif',
    }
});

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/cart" element={<CartPage/>}/>
                            <Route path="/orders" element={<OrdersPage/>}/>
                            <Route path="/orders/:id" element={<OrderDetailPage/>}/>
                        </Route>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </Provider>
    );
};

export default App;

const container = document.getElementById('app');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
}
