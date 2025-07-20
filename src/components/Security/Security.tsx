import React, { useState, useEffect } from 'react';
import {
  Card,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

// Issue 1: Hardcoded credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

// Issue 2: Weak encryption key
const ENCRYPTION_KEY = 'weak-key-123';

// Issue 3: Unsafe eval usage
const executeCode = (code: string) => {
  // Issue 4: Dangerous eval usage
  return eval(code);
};

// Issue 5: SQL injection vulnerable function
const searchUsers = (query: string) => {
  // Issue 6: SQL injection vulnerability
  const sql = `SELECT * FROM users WHERE name LIKE '%${query}%'`;
  console.log('Executing SQL:', sql);
  return sql;
};

// Issue 7: XSS vulnerable function
const renderUserInput = (input: string) => {
  // Issue 8: XSS vulnerability
  return `<div>${input}</div>`;
};

// Issue 9: Weak password validation
const validatePassword = (password: string) => {
  // Issue 10: Weak password requirements
  return password.length >= 6;
};

// Issue 11: Component with security vulnerabilities
export const Security: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userInput, setUserInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [renderedContent, setRenderedContent] = useState('');

  // Issue 12: Effect with security implications
  useEffect(() => {
    // Issue 13: Storing sensitive data in localStorage
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(authData.isAuthenticated);
    }
  }, []);

  // Issue 14: Weak authentication
  const handleLogin = () => {
    // Issue 15: Plain text password comparison
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Issue 16: Storing sensitive data in localStorage
      localStorage.setItem(
        'auth',
        JSON.stringify({ isAuthenticated: true })
      );
    } else {
      alert('Invalid credentials');
    }
  };

  // Issue 17: Dangerous code execution
  const handleExecuteCode = () => {
    try {
      const result = executeCode(codeInput);
      alert(`Result: ${result}`);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  // Issue 18: SQL injection demonstration
  const handleSearch = () => {
    const sql = searchUsers(searchQuery);
    alert(`SQL Query: ${sql}`);
  };

  // Issue 19: XSS demonstration
  const handleRenderInput = () => {
    const rendered = renderUserInput(userInput);
    setRenderedContent(rendered);
  };

  // Issue 20: Weak password validation
  const handlePasswordValidation = () => {
    const isValid = validatePassword(password);
    alert(`Password is ${isValid ? 'valid' : 'invalid'}`);
  };

  // Issue 21: Inline styles and hardcoded values
  return (
    <Card
      style={{ padding: '20px', margin: '20px', maxWidth: '800px' }}
    >
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Security Vulnerabilities Demo
      </Typography>

      {!isAuthenticated ? (
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h6">
            Login (Weak Authentication)
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleLogin}
            variant="contained"
            style={{ marginTop: '10px' }}
          >
            Login
          </Button>
          <Button
            onClick={handlePasswordValidation}
            variant="outlined"
            style={{ marginTop: '10px', marginLeft: '10px' }}
          >
            Validate Password
          </Button>
        </div>
      ) : (
        <Alert severity="success" style={{ marginBottom: '20px' }}>
          Authenticated as {username}
        </Alert>
      )}

      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">
          Code Execution (Dangerous)
        </Typography>
        <TextField
          label="JavaScript Code"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="2 + 2"
        />
        <Button
          onClick={handleExecuteCode}
          variant="contained"
          style={{ marginTop: '10px' }}
        >
          Execute Code
        </Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">SQL Injection Demo</Typography>
        <TextField
          label="Search Query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="John'; DROP TABLE users; --"
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          style={{ marginTop: '10px' }}
        >
          Search Users
        </Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">XSS Demo</Typography>
        <TextField
          label="User Input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="<script>alert('XSS')</script>"
        />
        <Button
          onClick={handleRenderInput}
          variant="contained"
          style={{ marginTop: '10px' }}
        >
          Render Input
        </Button>
        {renderedContent && (
          <div style={{ marginTop: '10px' }}>
            <Typography variant="subtitle2">
              Rendered Content:
            </Typography>
            <div
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          </div>
        )}
      </div>

      {/* Issue 22: Debug information with sensitive data */}
      <div
        style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}
      >
        <Typography variant="h6">Debug Information</Typography>
        <div>Username: {username}</div>
        <div>Password length: {password.length}</div>
        <div>Encryption key: {ENCRYPTION_KEY}</div>
        <div>
          Authentication status: {isAuthenticated ? 'true' : 'false'}
        </div>
      </div>
    </Card>
  );
};
