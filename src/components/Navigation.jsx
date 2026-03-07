import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navigation = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
    const location = useLocation();

    const handleLogin = async () => loginWithRedirect();
    const handleLogout = () => logout({ logoutParams: { returnTo: window.location.origin } });

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Protected', path: '/protected' },
        { name: 'Staff', path: '/staff' }
    ];

    if (isLoading) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link to="/" className="brand-logo">
                        <span className="gradient-text">Auth0</span>App
                    </Link>
                </div>
                <ul className="nav-menu">
                    {navLinks.map((link) => (
                        <li key={link.path} className="nav-item">
                            <Link
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="nav-actions" style={{ gap: '1rem' }}>
                    {isAuthenticated ? (
                        <button className="btn btn-secondary" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-secondary" onClick={handleLogin}>
                                Log In
                            </button>
                            <button className="btn btn-primary" onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })}>
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
