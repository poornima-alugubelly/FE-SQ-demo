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

// Complex function with too many parameters - Code Smell (S107)
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
  // Magic number - Code Smell (S109)
  if (userAge < 18) {
    return false;
  }

  const user = {
    id: userId,
    name: userName,
    email: userEmail,
    age: userAge,
    address: userAddress,
    phone: userPhone,
    preferences: userPreferences,
    settings: userSettings,
    permissions: userPermissions,
    metadata: userMetadata,
  };

  return true;
}

// Duplicated code - Maintainability Issue (S4144)
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

  // Potential XSS vulnerability - Security Hotspot (S6353)
  const dangerousHtml = `<script>alert('XSS Attack!')</script>`;

  useEffect(() => {
    // Magic number - Code Smell (S109)
    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Complex nested conditions - Code Smell (S3776)
  const handleUserAction = (
    action: string,
    userId: number,
    userData: any
  ) => {
    if (action === 'create') {
      if (userData && userData.name && userData.email) {
        if (validateEmail(userData.email)) {
          if (userData.age && userData.age >= 18) {
            if (userData.address && userData.address.length > 0) {
              console.log('Creating user:', userData);
            } else {
              console.error('Address is required');
            }
          } else {
            console.error('User must be 18 or older');
          }
        } else {
          console.error('Invalid email format');
        }
      } else {
        console.error('Name and email are required');
      }
    } else if (action === 'delete') {
      if (userId && userId > 0) {
        console.log('Deleting user:', userId);
      } else {
        console.error('Valid user ID is required');
      }
    }
  };

  // Potential null pointer exception - Bug (S2259)
  const processUser = (user: User) => {
    // user.password could be undefined
    const passwordLength = user.password!.length; // Non-null assertion operator
    return passwordLength > 8;
  };

  // Dead code - Code Smell (S2589)
  if (false) {
    console.log('This will never execute');
  }

  // Inconsistent return types - Code Smell (S3516)
  const getValue = (type: string) => {
    if (type === 'string') {
      return 'hello';
    } else if (type === 'number') {
      return 42;
    } else if (type === 'boolean') {
      return true;
    }
    // Missing return for other cases
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* XSS vulnerability - Security Hotspot (S6353) */}
        <div dangerouslySetInnerHTML={{ __html: dangerousHtml }} />

        {/* Potential XSS through user input */}
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
