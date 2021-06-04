import React , {useState, useEffect} from 'react'
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
/* API Logic with Token */
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedResources } from "../authConfig";
import { callApiWithTokenForReports } from "../fetch";
/* end API Logic with Token */

function Dashboards() {
    /* API Logic with Token */
        const { instance, accounts, inProgress } = useMsal();
        const account = useAccount(accounts[0] || {});
    /* end API Logic with Token */
  const [report, setReport] = useState(null)

/* Token code added in the existing API Call created by NIGel */

  useEffect(() => {
    if (account && inProgress === "none" && !report) {
        instance.acquireTokenSilent({
            scopes: protectedResources.apiHello.scopes,
            account: account
        }).then((response) => {
            console.log(response,'response')
            callApiWithTokenForReports(response.accessToken, protectedResources.apiDashboard.endpoint)
                .then(response => setReport(response));
        }).catch((error) => {
            // in case if silent token acquisition fails, fallback to an interactive method
            if (error instanceof InteractionRequiredAuthError) {
                if (account && inProgress === "none") {
                    instance.acquireTokenPopup({
                        scopes: protectedResources.apiHello.scopes,
                    }).then((response) => {
                        callApiWithTokenForReports(response.accessToken, protectedResources.apiDashboard.endpoint)
                            .then(response => setReport(response));
                    }).catch(error => console.log(error));
                }
            }
        });
    }
}, [account, inProgress, instance]);

 
  /* useEffect(() => {
      fetch("http://20.65.42.94:8080/v1/groups/47b7a5cd-3616-4924-bf70-d44bec06fff2/dashboards/0179a49f-c45b-43c1-85dd-4152ca33b2c8",{
      headers: {
        method: 'GET',
        'vnd.insightlens.io.clientid': '10eee1c1-5349-4596-b54f-a4f6639c2395',
        'vnd.insightlens.io.tenantid': 'c2fe5db4-d460-45c4-ac74-7b583a75ae26'
      },    
    }).then(res => res.json())
      .then(
        (result) => {
          setReport(result);
        },
        (error) => {
          
        }
      )
  }, [])*/

 
  return (
    <div className="App">
      {report && <PowerBIEmbed
          embedConfig = {{
            type: 'dashboard',   // Supported types: report, dashboard, tile, visual and qna
            id: report.id, 
            embedUrl: report.url,
            accessToken: report.token,    // Keep as empty string, null or undefined
            tokenType: models.TokenType.Embed
          }}
          cssClassName= {"report-style-class"}
          pageView={'fitToWidth'}
        />
    }
    </div>
  );
}

export default Dashboards;