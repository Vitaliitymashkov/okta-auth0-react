import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';

const ProtectedOutlet = () => {
    return <Outlet />;
};

export const ProtectedRoute = () => {
    const ProtectedComponent = withAuthenticationRequired(ProtectedOutlet, {
        onRedirecting: () => (
            <div className="loader-container">
                <div className="loader blue"></div>
            </div>
        ),
    });

    return <ProtectedComponent />;
};
