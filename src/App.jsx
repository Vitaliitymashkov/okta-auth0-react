import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import Navigation from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleProtectedRoute } from './components/RoleProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Protected from './pages/Protected';
import Staff from './pages/Staff';

const Auth0ProviderWithRedirectCallback = ({ children }) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={import.meta.env.REACT_APP_AUTH0_DOMAIN}
            clientId={import.meta.env.REACT_APP_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

function App() {
    return (
        <Router>
            <Auth0ProviderWithRedirectCallback>
                <div className="app-container">
                    <Navigation />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />

                            {/* Protected Routes directly guarded by ProtectedRoute component */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/protected" element={<Protected />} />
                            </Route>

                            {/* Role-Based Protected Routes wrapper */}
                            <Route element={<RoleProtectedRoute requiredRole="staff" />}>
                                <Route path="/staff" element={<Staff />} />
                            </Route>
                        </Routes>
                    </main>
                </div>
            </Auth0ProviderWithRedirectCallback>
        </Router>
    );
}

export default App;
