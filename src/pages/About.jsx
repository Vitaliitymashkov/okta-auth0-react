import React from 'react';

const About = () => {
    return (
        <div className="page fade-in">
            <div className="content-box">
                <h2>About This Project</h2>
                <p>This is a modern React application utilizing Auth0 by Okta for basic authentication and Role-Based Access Control (RBAC).</p>
                <p>It consists of the following routes and access rules:</p>
                <ul className="feature-list">
                    <li><strong>Home & About:</strong> Completely public routes.</li>
                    <li><strong>Protected:</strong> Accessible to any authenticated user. Handled via <code>withAuthenticationRequired</code> wrapper.</li>
                    <li><strong>Staff:</strong> Accessible only to authenticated users who also possess the <code>staff</code> role. Intercepted and verified via custom <code>RoleProtectedRoute</code> which checks token Actions namespace values.</li>
                </ul>
            </div>
        </div>
    );
};

export default About;
