

## Scenario

1. The client React SPA uses **MSAL React** to sign-in and obtain a JWT access token from **Azure AD B2C**.
1. The access token is used as a bearer token to authorize the user to call the Node.js web API protected **Azure AD B2C**.
1. The protected web API responds with the claims in the **Access Token**.


## Contents

| File/folder         | Description                                         |
|---------------------|-----------------------------------------------------|
| `SPA/App.jsx`       | Main application logic resides here.                |
| `SPA/fetch.jsx`     | Provides a helper method for making fetch calls.    |
| `SPA/authConfig.js` | Contains authentication parameters for SPA project. |
| `API/config.js`     | Contains authentication parameters for API project. |
| `API/index.js`      | Main application logic of custom web API.           |


## SPA/authConfig.js and API/config.js

  Please always discuss with ##Srujan for the setting of SPA/authConfig.js and API/config.js. 

## Setup

### Step 1: Clone or download this repository

From your shell or command line:

```console
    git clone https://github.com/Envision-Sales/POC-PowerBI-Authentication
```

or download and extract the repository .zip file.

> :warning: To avoid path length limitations on Windows, we recommend cloning into a directory near the root of your drive.

### Step 2: Install project dependencies

- Setup the service app:

```console
    cd API
    npm install
```

- Setup the client app:

```console
    cd ..
    cd SPA
    npm install
```




