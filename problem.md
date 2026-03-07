Problem Description

I want to build a simple React application that demonstrates authentication and authorization using Okta Identity.

The application should include a navigation menu and several pages with different access levels.

Requirements

Create a simple React application with a navigation menu.

The app must include the following pages:

Home – accessible to everyone

About – accessible to everyone

Staff – accessible only to authenticated users with a specific role or group

Protected – accessible only to authenticated users

Integrate the application with Okta Identity for authentication.

Okta Configuration

I already have an Okta account and an application created in Okta.

The following credentials exist but should not be hardcoded in the source code:

Client ID

Client Secret

Okta Domain

Application Name

Instead, they should be stored in an environment configuration file such as .env.

Leave these fields empty in the example configuration so I can fill them in myself.

Example:

REACT_APP_OKTA_CLIENT_ID=
REACT_APP_OKTA_CLIENT_SECRET=
REACT_APP_OKTA_DOMAIN=
REACT_APP_OKTA_APP_NAME=
Authentication Requirements

Use the Okta React SDK (or recommended official libraries).

Implement login and logout functionality.

Protect routes using authentication guards.

The Protected page should require a logged-in user.

The Staff page should require a specific role or group (e.g., staff).

Deliverables

Provide:

The React project structure.

The code for the navigation menu and pages.

The Okta integration setup.

Instructions on how to:

configure Okta for the application

set up the .env file

install dependencies

run the application locally

build the project using npm build (or npm run build)

Explain how the authentication flow works.

The solution should use modern React (functional components and hooks).