/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1A_DIT01_SIGNUP_SIGNIN",
        forgotPassword: "B2C_1A_DIT01_PASSWORDRESET",
        editProfile: "B2C_1A_DIT01_PROFILEEDIT"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://apps4envisionb2cdev.b2clogin.com/apps4envisionb2cdev.onmicrosoft.com/B2C_1A_DIT01_SIGNUP_SIGNIN",
        },
        forgotPassword: {
            authority: "https://apps4envisionb2cdev.b2clogin.com/apps4envisionb2cdev.onmicrosoft.com/B2C_1A_DIT01_PASSWORDRESET",
        },
        editProfile: {
            authority: "https://apps4envisionb2cdev.b2clogin.com/apps4envisionb2cdev.onmicrosoft.com/B2C_1A_DIT01_PROFILEEDIT"
        }
    },
    authorityDomain: "apps4envisionb2cdev.b2clogin.com"
}


/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "0ab3bdad-6b2f-4378-9c2e-5a866eed35e1", // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["https://apps4envisionb2cdev.onmicrosoft.com/84fb5c0b-0971-4ffe-80d2-906982a4ee54/user_impersonation"],
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    apiHello: {
        endpoint: "http://localhost:5000/hello",
        scopes: ["https://apps4envisionb2cdev.onmicrosoft.com/84fb5c0b-0971-4ffe-80d2-906982a4ee54/user_impersonation"],
    },
    apiDashboard: {
        endpoint: "http://20.65.42.94:8080/v1/groups/47b7a5cd-3616-4924-bf70-d44bec06fff2/dashboards/0179a49f-c45b-43c1-85dd-4152ca33b2c8",
        scopes: ["https://apps4envisionb2cdev.onmicrosoft.com/84fb5c0b-0971-4ffe-80d2-906982a4ee54/user_impersonation"],
    },
}
