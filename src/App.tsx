import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const MAX_RETRIES = 3;
const TIMEOUT_DELAY = 5000;

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

function processUserData(
  userId: number,
  userName: string,
  userEmail: string,
  userAge: number,
  userAddress: string,
  userPhone: string,
  userPreferences: any,
  userSettings: any,
  userPermissions: any,
  userMetadata: any
) {
  if (userAge < 18) {
    return false;
  }

  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateEmailAgain(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function App() {
  const [count, setCount] = useState(0);
  const [userInput, setUserInput] = useState('');

  const dangerousHtml = `<script>alert('XSS Attack!')</script>`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (false) {
    console.log('This will never execute');
  }

  const getValue = (type: string) => {
    if (type === 'string') {
      return 'hello';
    } else if (type === 'number') {
      return 42;
    } else if (type === 'boolean') {
      return true;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div dangerouslySetInnerHTML={{ __html: dangerousHtml }} />
        <div dangerouslySetInnerHTML={{ __html: userInput }} />

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <p>Count: {count}</p>

        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter some text (potential XSS)"
        />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
