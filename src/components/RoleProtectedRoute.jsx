import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';

const RoleProtectedOutlet = ({ requiredRole }) => {
    const { user } = useAuth0();

    // Auth0 Roles custom claim. It depends on Action Rule namespace setup in Auth0
    // e.g. https://your-namespace.com/roles
    const auth0NamespaceURI = 'https://My-App-02-vibe.org/roles';
    const roles = user?.[auth0NamespaceURI] || [];

    if (roles.includes(requiredRole)) {
        return <Outlet />;
    }

    return (
        <div className="access-denied-container fade-in">
            <div className="error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3>Access Denied</h3>
            <p>You do not have the required role (<span className="mono-badge">{requiredRole}</span>) to view this page.</p>
            <p className="hint-text">Contact your administrator or create a Login Action in Auth0 to add Roles to your token payload.</p>
        </div>
    );
};

export const RoleProtectedRoute = ({ requiredRole }) => {
    const ProtectedComponent = withAuthenticationRequired(() => <RoleProtectedOutlet requiredRole={requiredRole} />, {
        onRedirecting: () => (
            <div className="loader-container">
                <div className="loader purple"></div>
            </div>
        ),
    });

    return <ProtectedComponent />;
};
