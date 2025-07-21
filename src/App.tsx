import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Magic numbers - Code Smell
const MAX_RETRIES = 3;
const TIMEOUT_DELAY = 5000;
const MAX_ITEMS = 100;

// Unused variable - Code Smell
const UNUSED_CONSTANT = 'This is never used';

interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Optional but could be undefined
}

// Complex function with too many parameters - Code Smell
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
  // Magic number - Code Smell
  if (userAge < 18) {
    return false;
  }

  // Potential null pointer exception - Bug
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

  // Unused variable - Code Smell
  const processedData = JSON.stringify(user);

  return true;
}

// Duplicated code - Maintainability Issue
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateEmailAgain(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Long function - Maintainability Issue
function App() {
  const [count, setCount] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Potential XSS vulnerability - Security Hotspot
  const dangerousHtml = `<script>alert('XSS Attack!')</script>`;

  useEffect(() => {
    // Magic number - Code Smell
    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Complex nested conditions - Code Smell
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
              // Process user creation
              console.log('Creating user:', userData);
            } else {
              setError('Address is required');
            }
          } else {
            setError('User must be 18 or older');
          }
        } else {
          setError('Invalid email format');
        }
      } else {
        setError('Name and email are required');
      }
    } else if (action === 'update') {
      // Similar nested logic...
      if (userData && userData.id) {
        if (userData.name || userData.email) {
          if (!userData.email || validateEmail(userData.email)) {
            console.log('Updating user:', userData);
          } else {
            setError('Invalid email format');
          }
        } else {
          setError('At least one field must be provided');
        }
      } else {
        setError('User ID is required');
      }
    } else if (action === 'delete') {
      if (userId && userId > 0) {
        console.log('Deleting user:', userId);
      } else {
        setError('Valid user ID is required');
      }
    }
  };

  // Unused function parameter - Code Smell
  const unusedParameter = (
    param1: string,
    param2: string,
    param3: string
  ) => {
    console.log(param1, param3); // param2 is unused
  };

  // Potential null pointer exception - Bug
  const processUser = (user: User) => {
    // user.password could be undefined
    const passwordLength = user.password!.length; // Non-null assertion operator
    return passwordLength > 8;
  };

  // Dead code - Code Smell
  if (false) {
    console.log('This will never execute');
  }

  // Inconsistent return types - Code Smell
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

        {/* XSS vulnerability - Security Hotspot */}
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
