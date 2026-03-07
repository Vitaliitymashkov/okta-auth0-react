import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Protected = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div className="loader-container"><div className="loader blue small"></div></div>;
    }

    return (
        <div className="page fade-in">
            <div className="content-box glass panel">
                <h2 className="title">Protected Dashboard</h2>
                <p className="subtitle">Welcome to the secure area! Only active users can see this content.</p>

                {isAuthenticated && user && (
                    <div className="user-profile">
                        <h3 className="profile-heading">Your Profile Details</h3>
                        <div className="profile-details-table">
                            <div className="table-row">
                                <span className="row-label">Name</span>
                                <span className="row-value">{user.name}</span>
                            </div>
                            <div className="table-row">
                                <span className="row-label">Email</span>
                                <span className="row-value">{user.email}</span>
                            </div>
                            <div className="table-row">
                                <span className="row-label">User ID</span>
                                <span className="row-value mono-badge">{user.sub}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Protected;
