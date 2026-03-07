import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Staff = () => {
    const { user, isAuthenticated } = useAuth0();

    const auth0NamespaceURI = 'https://myapp.org/roles';
    const roles = user?.[auth0NamespaceURI] || [];

    return (
        <div className="page fade-in">
            <div className="content-box glass panel admin-panel">
                <div className="header-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <h2 className="title text-accent">Staff Portal</h2>
                </div>
                <p className="subtitle">System Administration & Secure Analytics</p>
                <div className="info-alert">
                    <strong>Access Granted:</strong> You hold the required <code>staff</code> role necessary to view this portal.
                </div>

                {isAuthenticated && user && (
                    <div className="user-profile mt-4">
                        <div className="profile-details-table">
                            <div className="table-row">
                                <span className="row-label">Staff Name</span>
                                <span className="row-value">{user.name}</span>
                            </div>
                            <div className="table-row">
                                <span className="row-label">Roles</span>
                                <span className="row-value">
                                    {roles.length > 0 ? roles.map(role => (
                                        <span key={role} className="role-chip">{role}</span>
                                    )) : <span className="role-chip">staff</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Staff;
