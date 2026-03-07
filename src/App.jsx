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
        // After login, send user exactly where they intended to go, or home!
        navigate(appState?.returnTo || '/');
    };

    return (
        <Auth0Provider
            domain={import.meta.env.REACT_APP_AUTH0_DOMAIN}
            clientId={import.meta.env.REACT_APP_AUTH0_CLIENT_ID}
            authorizationParams={{
                // Ask Auth0 to send the token payload to the /callback route
                redirect_uri: window.location.origin + '/callback',
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

                            {/* Auth0 explicitly catches tokens here gracefully */}
                            <Route path="/callback" element={<div className="page fade-in"><div className="loader-container"><div className="loader blue"></div></div></div>} />

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
