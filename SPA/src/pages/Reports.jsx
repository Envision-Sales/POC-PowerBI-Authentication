import React , {useState, useEffect} from 'react'
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

function Reports() {
  const [report, setReport] = useState(null)
 
  useEffect(() => {
    fetch("http://20.65.42.94:8080/v1/groups/47b7a5cd-3616-4924-bf70-d44bec06fff2/reports/a322c914-0bce-46ac-a6d6-d2955a25d13f",{
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
  }, [])

 

  console.log(report,'report')

  return (
    <div className="App">
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