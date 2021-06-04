/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export const callApiWithToken = async(accessToken, apiEndpoint) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    console.log(apiEndpoint,'apiEndpoint')

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(apiEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}


/* This is just an POC code , please refactored it correctly when we need to do actual implementation */

export const callApiWithTokenForReports = async(accessToken, apiEndpoint) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("vnd.insightlens.io.clientid", '10eee1c1-5349-4596-b54f-a4f6639c2395');
    headers.append("vnd.insightlens.io.tenantid", 'c2fe5db4-d460-45c4-ac74-7b583a75ae26');

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(apiEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}