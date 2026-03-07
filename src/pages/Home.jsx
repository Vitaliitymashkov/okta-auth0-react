import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <div className="page fade-in">
            <div className="hero">
                <h1 className="hero-title">Welcome to the <span className="gradient-text">Auth0 Integrations Example</span></h1>
                <p className="hero-subtitle">
                    A secure, dynamic, and aesthetic React app demonstrating modern web authentication flows.
                </p>

                <div className="status-card">
                    <h2>Authentication Status</h2>
                    {isLoading ? (
                        <div className="status">
                            <div className="indicator pulse bg-yellow"></div>
                            <span>Checking authentication...</span>
                        </div>
                    ) : isAuthenticated ? (
                        <div className="status success">
                            <div className="indicator pulse bg-green"></div>
                            <span>You are securely logged in.</span>
                        </div>
                    ) : (
                        <div className="status warning">
                            <div className="indicator pulse bg-yellow"></div>
                            <span>You are currently a guest. Please log in to access protected content.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
