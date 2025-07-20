import React, { useState, useEffect } from 'react';
import {
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

// Issue 1: Weak password validation
const validatePassword = (password: string) => {
  // Issue 2: Simple regex that can be bypassed
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

// Issue 3: Weak email validation
const validateEmail = (email: string) => {
  // Issue 4: Basic regex that doesn't catch all edge cases
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Issue 5: Function with too many responsibilities
const validateForm = (formData: any) => {
  const errors: { [key: string]: string } = {};

  // Issue 6: Inconsistent validation logic
  if (!formData.name || formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.password =
      'Password must be at least 8 characters with letters and numbers';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Issue 7: Magic numbers in validation
  if (formData.age && (formData.age < 18 || formData.age > 120)) {
    errors.age = 'Age must be between 18 and 120';
  }

  return errors;
};

// Issue 8: Component with too many state variables
export const FormValidation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phone: '',
    address: '',
    terms: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Issue 9: Effect with complex dependencies
  useEffect(() => {
    // Issue 10: Validation on every render
    const newErrors = validateForm(formData);
    setErrors(newErrors);
  }, [formData]);

  // Issue 11: Complex event handler
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Issue 12: Async function without proper error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Issue 13: Simulated API call without timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Issue 14: No server-side validation
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      // Issue 15: Generic error handling
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Issue 16: Function that could be simplified
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      phone: '',
      address: '',
      terms: false,
      newsletter: false,
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  // Issue 17: Inline styles and hardcoded values
  return (
    <Card
      style={{ padding: '20px', margin: '20px', maxWidth: '600px' }}
    >
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Form Validation Demo
      </Typography>

      {isSubmitted && (
        <Alert severity="success" style={{ marginBottom: '20px' }}>
          Form submitted successfully!
        </Alert>
      )}

      {/* Issue 18: Form without proper accessibility */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={touched.name && !!errors.name}
          helperText={touched.name && errors.name}
          fullWidth
          required
        />

        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          fullWidth
          required
        />

        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            handleInputChange('password', e.target.value)
          }
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          fullWidth
          required
        />

        <TextField
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            handleInputChange('confirmPassword', e.target.value)
          }
          error={touched.confirmPassword && !!errors.confirmPassword}
          helperText={
            touched.confirmPassword && errors.confirmPassword
          }
          fullWidth
          required
        />

        <TextField
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          error={touched.age && !!errors.age}
          helperText={touched.age && errors.age}
          fullWidth
        />

        <TextField
          label="Phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          fullWidth
        />

        <TextField
          label="Address"
          value={formData.address}
          onChange={(e) =>
            handleInputChange('address', e.target.value)
          }
          multiline
          rows={3}
          fullWidth
        />

        {/* Issue 19: Checkbox without proper accessibility */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.terms}
              onChange={(e) =>
                handleInputChange('terms', e.target.checked)
              }
              required
            />
          }
          label="I agree to the terms and conditions"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.newsletter}
              onChange={(e) =>
                handleInputChange('newsletter', e.target.checked)
              }
            />
          }
          label="Subscribe to newsletter"
        />

        {/* Issue 20: Buttons without proper disabled states */}
        <div
          style={{ display: 'flex', gap: '10px', marginTop: '20px' }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            style={{ flex: 1 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={handleReset}
            style={{ flex: 1 }}
          >
            Reset
          </Button>
        </div>
      </form>

      {/* Issue 21: Debug information exposed in production */}
      <div
        style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}
      >
        <div>Form errors: {Object.keys(errors).length}</div>
        <div>Touched fields: {Object.keys(touched).length}</div>
        <div>Form data: {JSON.stringify(formData, null, 2)}</div>
      </div>
    </Card>
  );
};
