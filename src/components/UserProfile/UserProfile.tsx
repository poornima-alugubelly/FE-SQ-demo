import React, { useState, useEffect } from 'react';
import {
  Card,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

// Issue 1: Missing interface definition
interface UserData {
  name: string;
  email: string;
  password: string; // Issue 2: Password in plain text
  age: number;
}

// Issue 3: Global variable that could cause side effects
let globalUserCount = 0;

// Issue 4: Function with too many parameters
const validateUserData = (
  name: string,
  email: string,
  password: string,
  age: number,
  phone: string,
  address: string,
  city: string
) => {
  // Issue 5: Magic numbers
  if (age < 18 || age > 120) {
    return false;
  }
  return true;
};

// Issue 6: Unused function
const unusedFunction = () => {
  console.log('This function is never called');
};

export const UserProfile: React.FC = () => {
  // Issue 7: State with any type
  const [userData, setUserData] = useState<any>({
    name: '',
    email: '',
    password: '',
    age: 0,
  });

  // Issue 8: State that could be derived
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  // Issue 9: Effect with missing dependencies
  useEffect(() => {
    // Issue 10: Direct DOM manipulation
    const element = document.getElementById('user-profile');
    if (element) {
      element.style.backgroundColor = '#f0f0f0';
    }
  }, []); // Missing dependencies

  // Issue 11: Function that could be simplified
  const handleInputChange = (field: string, value: any) => {
    // Issue 12: Unsafe type assertion
    const newData = { ...userData, [field]: value as string };
    setUserData(newData);

    // Issue 13: Complex conditional logic
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(value));
    }

    // Issue 14: Redundant validation
    if (field === 'name' && value.length > 0) {
      setIsValid(true);
    } else if (field === 'name' && value.length === 0) {
      setIsValid(false);
    }
  };

  // Issue 15: Async function without error handling
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Issue 17: Sending password in plain text
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
    } catch (error) {
      console.error('Error saving user:', error); //Improved error handling
    }
    // Issue 19: Console.log in production code
    console.log('User saved successfully');
  };

  // Issue 21: Inline styles instead of styled components
  return (
    <Card
      style={{ padding: '20px', margin: '20px', maxWidth: '500px' }}
    >
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        User Profile
      </Typography>

      {/* Issue 22: Missing accessibility attributes */}
      <TextField
        label="Name"
        value={userData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Issue 23: Potential XSS vulnerability */}
      <TextField
        label="Email"
        value={userData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        fullWidth
        margin="normal"
        error={!isValidEmail && userData.email.length > 0}
        helperText={
          !isValidEmail && userData.email.length > 0
            ? 'Invalid email format'
            : ''
        }
      />

      {/* Issue 24: Password field without proper security */}
      <TextField
        label="Password"
        type="password"
        value={userData.password}
        onChange={(e) =>
          handleInputChange('password', e.target.value)
        }
        fullWidth
        margin="normal"
      />

      {/* Issue 25: Number input without validation */}
      <TextField
        label="Age"
        type="number"
        value={userData.age}
        onChange={(e) =>
          handleInputChange('age', parseInt(e.target.value))
        }
        fullWidth
        margin="normal"
      />

      {/* Issue 26: Conditional rendering that could be simplified */}
      {isValid ? (
        <Alert severity="success" style={{ marginTop: '10px' }}>
          Form is valid
        </Alert>
      ) : (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          Form is invalid
        </Alert>
      )}

      {/* Issue 27: Button without proper disabled state */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: '20px' }}
        fullWidth
      >
        Save Profile
      </Button>

      {/* Issue 28: Debug information exposed in production */}
      <div
        style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}
      >
        Debug: {JSON.stringify(userData)}
      </div>
    </Card>
  );
};
