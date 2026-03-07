# Auth0 by Okta React Demo

This is a modern React application that demonstrates robust authentication and authorization utilizing **Auth0 by Okta**. Built with Vite for rapid development, this application showcases secure routing, RBAC (Role-Based Access Control), and an aesthetically pleasing custom vanilla CSS design.

## Features & Project Structure
- `src/App.jsx` - Stores the core `<Auth0Provider>` instance handling auth wrapper logics.
- `src/components/Navigation.jsx` - The navigation menu adapting dynamically to auth states from the `useAuth0()` hook.
- `src/components/ProtectedRoute.jsx` - Wrapper using `withAuthenticationRequired()` forcing normal logins.
- `src/components/RoleProtectedRoute.jsx` - Restricts routing dynamically against the Auth0 payload.
- `src/pages/Home.jsx` & `src/pages/About.jsx` - Publicly accessible pages.
- `src/pages/Protected.jsx` - Secured dashboard requiring an active session.
- `src/pages/Staff.jsx` - Heavily restricted page only for `staff` group/role members.

## Instructions: Getting Started

### 1. Configure Auth0 for the Application
To use this application, you must configure a Single-Page Application (SPA) integration in Auth0:
1. Log into your **Auth0 Dashboard**.
2. Navigate to **Applications** -> **Applications** -> **Create Application**.
3. Provide a name and select **Single Page Web Applications**.
4. In your Application Settings, set the **Allowed Callback URLs** to: `http://localhost:3000/login/callback`
5. Set the **Allowed Logout URLs** to: `http://localhost:3000`
6. Set the **Allowed Web Origins** to: `http://localhost:3000`
7. Save your integration to fetch your **Domain** and **Client ID**.

**To test the Staff Role in Auth0:**
Auth0 natively requires using an **Action** pipeline to inject standard Roles into your frontend React Token.
1. Navigate to **User Management** > **Roles** and click **Create Role**. Name it `staff`.
2. Navigate to **User Management** > **Users**, click your personal user account, tab over to **Roles**, and Assign the `staff` role to yourself.
3. Next, navigate to **Actions** > **Flows** on your left sidebar, and click **Login**.
4. Click the `+` icon on the right sidebar next to *Actions* and select **Build Custom**. Name it `Add Roles to Token` with Node18 runtime.
5. In the code editor that pops up, paste this exact script to pass your roles downstream:
   ```javascript
   exports.onExecutePostLogin = async (event, api) => {
     const namespace = 'https://myapp.org';
     
     if (event.authorization) {
       // Embed user roles into ID Token for the React frontend to view
       api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
       api.accessToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
     }
   };
   ```
6. Click **Deploy** in the top right, then drag your newly made Action directly into the Login flow visualizer box between Start and Complete and hit **Apply**. 

This completely satisfies `RoleProtectedRoute.jsx`'s check for the custom role claim.

### 2. Set up the environment variables
A `.env` file template is configured at the root. Fill out the values corresponding to your Auth0 environment:
```env
REACT_APP_AUTH0_DOMAIN=<Your_Auth0_Domain>
REACT_APP_AUTH0_CLIENT_ID=<Your_Auth0_Client_ID>
```

### 3. Install Dependencies
Open a terminal in the project root and run:
```bash
npm install
```

### 4. Run the Application Locally
Once dependencies are built, start the development server using Vite:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to interact with the application.

### 5. Build for Production
To bundle the application in optimized mode:
```bash
npm run build
```
This generates the `dist/` folder ready for static deployment.
