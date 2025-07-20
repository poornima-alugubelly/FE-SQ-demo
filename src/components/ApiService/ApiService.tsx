import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';

// Issue 1: Hardcoded API endpoints
const API_BASE_URL = 'http://localhost:3000/api';
const API_KEY = 'sk-1234567890abcdef'; // Issue 2: Hardcoded API key

// Issue 3: Global variable for caching without size limits
const apiCache: { [key: string]: any } = {};

// Issue 4: Function with too many parameters and responsibilities
const makeApiCall = async (
  endpoint: string,
  method: string,
  data?: any,
  headers?: any,
  timeout?: number,
  retries?: number,
  cache?: boolean
) => {
  // Issue 5: Unsafe URL construction
  const url = `${API_BASE_URL}/${endpoint}`;

  // Issue 6: Default headers with hardcoded values
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
    'X-API-Key': API_KEY,
    ...headers,
  };

  // Issue 7: Complex retry logic without proper error handling
  let attempts = 0;
  const maxAttempts = retries || 3;

  while (attempts < maxAttempts) {
    try {
      // Issue 8: No timeout handling
      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: data ? JSON.stringify(data) : undefined,
      });

      // Issue 9: Unsafe response handling
      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();

      // Issue 10: Unsafe caching without validation
      if (cache) {
        apiCache[endpoint] = result;
      }

      return result;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw error;
      }
      // Issue 11: Fixed delay without exponential backoff
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

// Issue 12: Component with mixed concerns
export const ApiService: React.FC = () => {
  const [endpoint, setEndpoint] = useState('');
  const [method, setMethod] = useState('GET');
  const [requestData, setRequestData] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Issue 13: Effect without cleanup
  useEffect(() => {
    // Issue 14: Direct DOM manipulation
    const element = document.getElementById('api-service');
    if (element) {
      element.style.border = '1px solid #ccc';
    }
  }, []);

  // Issue 15: Complex event handler with multiple responsibilities
  const handleApiCall = async () => {
    setLoading(true);
    setError(null);

    try {
      // Issue 16: Unsafe JSON parsing
      const data = requestData ? JSON.parse(requestData) : undefined;

      // Issue 17: No input validation
      const result = await makeApiCall(
        endpoint,
        method,
        data,
        {},
        5000,
        3,
        true
      );

      // Issue 18: Unsafe state update
      setResponse(result);

      // Issue 19: Console logging in production
      console.log('API call successful:', result);
    } catch (err) {
      // Issue 20: Generic error handling
      setError(
        err instanceof Error ? err.message : 'Unknown error occurred'
      );
      console.error('API call failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Issue 21: Function that could be simplified
  const handleClearCache = () => {
    // Issue 22: Unsafe object manipulation
    Object.keys(apiCache).forEach((key) => {
      delete apiCache[key];
    });

    // Issue 23: Direct state manipulation
    setResponse(null);
    setError(null);
  };

  // Issue 24: Inline styles and hardcoded values
  return (
    <Card
      style={{ padding: '20px', margin: '20px', maxWidth: '800px' }}
    >
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        API Service Tester
      </Typography>

      {/* Issue 25: Form without proper validation */}
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="/users"
        />

        <TextField
          select
          label="Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          fullWidth
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </TextField>

        <TextField
          label="Request Data (JSON)"
          value={requestData}
          onChange={(e) => setRequestData(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          placeholder='{"key": "value"}'
        />
      </div>

      {/* Issue 26: Buttons without proper disabled states */}
      <div style={{ marginBottom: '20px' }}>
        <Button
          variant="contained"
          onClick={handleApiCall}
          disabled={loading || !endpoint}
          style={{ marginRight: '10px' }}
        >
          {loading ? <CircularProgress size={20} /> : 'Make API Call'}
        </Button>

        <Button
          variant="outlined"
          onClick={handleClearCache}
          style={{ marginRight: '10px' }}
        >
          Clear Cache
        </Button>
      </div>

      {/* Issue 27: Error display without sanitization */}
      {error && (
        <Alert severity="error" style={{ marginBottom: '20px' }}>
          <div dangerouslySetInnerHTML={{ __html: error }} />
        </Alert>
      )}

      {/* Issue 28: Response display without proper formatting */}
      {response && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Response:
          </Typography>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px',
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {/* Issue 29: Debug information exposed in production */}
      <div
        style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}
      >
        <div>Cache size: {Object.keys(apiCache).length} entries</div>
        <div>API Base URL: {API_BASE_URL}</div>
        <div>Current method: {method}</div>
      </div>
    </Card>
  );
};
