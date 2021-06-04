import React , {useState, useEffect} from 'react'
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
/* API Logic with Token */
import { useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import {protectedResources } from "../authConfig";
import { callApiWithTokenForReports } from "../fetch";
/* end API Logic with Token */

function Reports() {
  const [report, setReport] = useState(null)
  const [newReport, setNewReport] = useState(null)
  /* API Logic with Token */
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
/* end API Logic with Token */

useEffect(() => {
  if (account && inProgress === "none" && !report) {
      instance.acquireTokenSilent({
          scopes: protectedResources.apiHello.scopes,
          account: account
      }).then((response) => {
          console.log(response,'response')
          callApiWithTokenForReports(response.accessToken, protectedResources.apiReportDmytro.endpoint)
              .then(response => setReport(response));
      }).catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
              if (account && inProgress === "none") {
                  instance.acquireTokenPopup({
                      scopes: protectedResources.apiReportDmytro.scopes,
                  }).then((response) => {
                      callApiWithTokenForReports(response.accessToken, protectedResources.apiReportDmytro.endpoint)
                          .then(response => setReport(response));
                  }).catch(error => console.log(error));
              }
          }
      });
  }
}, [account, inProgress, instance]);


useEffect(() => {
  if (account && inProgress === "none" && !newReport) {
      instance.acquireTokenSilent({
          scopes: protectedResources.apiHello.scopes,
          account: account
      }).then((response) => {
          console.log(response,'response')
          callApiWithTokenForReports(response.accessToken, protectedResources.apiReportNigel.endpoint)
              .then(response => setNewReport(response));
      }).catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
              if (account && inProgress === "none") {
                  instance.acquireTokenPopup({
                      scopes: protectedResources.apiReportNigel.scopes,
                  }).then((response) => {
                      callApiWithTokenForReports(response.accessToken, protectedResources.apiDashboard.endpoint)
                          .then(response => setNewReport(response));
                  }).catch(error => console.log(error));
              }
          }
      });
  }
}, [account, inProgress, instance]);

  return (
    <div className="App">
    
       <h2>POWER BI NEW REPORT _ </h2>
        {newReport && <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: newReport.id, 
            embedUrl: newReport.url,
            accessToken: newReport.token,    // Keep as empty string, null or undefined
            tokenType: models.TokenType.Embed
          }}
          cssClassName= {"report-style-class"}
          pageView={'fitToWidth'}
           />
        }


     <h2>POWER BI OLD  REPORT By NIGEL  </h2>

      {report && <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
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

export default Reports;