const fs = require('fs');
const path = require('path');

function generateApiReport() {
  const apiCallsFile = 'cypress/reports/api-calls.json';
  
  if (!fs.existsSync(apiCallsFile)) {
    console.log('No API calls logged yet.');
    return;
  }

  const apiCalls = JSON.parse(fs.readFileSync(apiCallsFile, 'utf8'));
  
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>API Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .api-call { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
        .success { border-left: 5px solid #4CAF50; }
        .error { border-left: 5px solid #f44336; }
        .method { font-weight: bold; color: #2196F3; }
        .url { color: #666; word-break: break-all; }
        .status-200 { color: #4CAF50; }
        .status-400, .status-404, .status-500 { color: #f44336; }
        pre { background: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto; }
        .timestamp { color: #999; font-size: 12px; }
        .response-time { color: #FF9800; font-weight: bold; }
        h1 { color: #333; }
        .summary { background: #e3f2fd; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>API Test Report</h1>
    <div class="summary">
        <h3>Summary</h3>
        <p>Total API Calls: ${apiCalls.length}</p>
        <p>Success Rate: ${Math.round((apiCalls.filter(call => call.responseStatus < 400).length / apiCalls.length) * 100)}%</p>
        <p>Generated: ${new Date().toLocaleString()}</p>
    </div>
    
    ${apiCalls.map(call => `
        <div class="api-call ${call.responseStatus < 400 ? 'success' : 'error'}">
            <div class="timestamp">${new Date(call.timestamp).toLocaleString()}</div>
            <h3>${call.testName}</h3>
            <p><span class="method">${call.method}</span> <span class="url">${call.url}</span></p>
            <p>Status: <span class="status-${call.responseStatus}">${call.responseStatus}</span> | 
               Response Time: <span class="response-time">${call.responseTime}ms</span></p>
            
            <h4>Request Headers:</h4>
            <pre>${JSON.stringify(call.headers, null, 2)}</pre>
            
            <h4>Request Body:</h4>
            <pre>${JSON.stringify(call.requestBody, null, 2)}</pre>
            
            <h4>Response Headers:</h4>
            <pre>${JSON.stringify(call.responseHeaders, null, 2)}</pre>
            
            <h4>Response Body:</h4>
            <pre>${JSON.stringify(call.responseBody, null, 2)}</pre>
        </div>
    `).join('')}
</body>
</html>`;

  const reportPath = 'cypress/reports/api-report.html';
  fs.writeFileSync(reportPath, htmlContent);
  console.log(`API Report generated: ${reportPath}`);
}

generateApiReport();