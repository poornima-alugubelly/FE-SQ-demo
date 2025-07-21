import React, { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address?: string;
  phone?: string;
  avatar?: string;
}

interface UserProfileProps {
  userId: number;
  showDetails?: boolean;
  enableEditing?: boolean;
  allowDelete?: boolean;
  refreshInterval?: number;
  maxRetries?: number;
  timeout?: number;
  pageSize?: number;
  sortBy?: string;
  filterBy?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  showDetails = false,
  enableEditing = false,
  allowDelete = false,
  refreshInterval = 30000,
  maxRetries = 3,
  timeout = 5000,
  pageSize = 20,
  sortBy = 'name',
  filterBy = '',
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<Partial<User>>({});
  const [retryCount, setRetryCount] = useState(0);
  useState<Date | null>(null);

  const [userInput, setUserInput] = useState('');
  const dangerousHtml = `<script>alert('XSS Attack!')</script>`;

  const handleUserAction = useCallback(
    (action: string, userData: any) => {
      if (action === 'save') {
        const isValid =
          userData &&
          userData.name &&
          userData.email &&
          userData.age >= 18 &&
          userData.address &&
          userData.address.length > 0 &&
          userData.phone &&
          userData.phone.length >= 10;
        if (isValid) {
          console.log('Saving user:', userData);
        } else {
          if (!userData.name || !userData.email) {
            setError('Name and email are required');
          } else if (userData.age < 18) {
            setError('User must be 18 or older');
          } else if (
            !userData.address ||
            userData.address.length === 0
          ) {
            setError('Address is required');
          } else if (!userData.phone || userData.phone.length < 10) {
            setError('Phone number must be at least 10 digits');
          }
        }
      } else if (action === 'delete') {
        if (
          userData?.id &&
          confirm('Are you sure you want to delete this user?')
        ) {
          console.log('Deleting user:', userData.id);
        }
      }
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Periodic check');
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(timeout),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(`Failed to fetch user: ${error}`);
        if (retryCount < maxRetries) {
          setRetryCount((prev) => prev + 1);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, timeout, retryCount, maxRetries]);

  const handleSave = useCallback(() => {
    if (user) {
      handleUserAction('save', { ...user, ...formData });
    }
  }, [user, formData, handleUserAction]);

  const handleDelete = useCallback(() => {
    if (user) {
      handleUserAction('delete', user);
    }
  }, [user, handleUserAction]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-profile">
      <div dangerouslySetInnerHTML={{ __html: dangerousHtml }} />
      <div dangerouslySetInnerHTML={{ __html: userInput }} />

      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>

      {showDetails && (
        <div>
          <p>Address: {user.address || 'Not provided'}</p>
          <p>Phone: {user.phone || 'Not provided'}</p>
        </div>
      )}

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter some text (potential XSS)"
      />

      {enableEditing && (
        <div>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Name"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}

      {allowDelete && (
        <button onClick={handleDelete}>Delete User</button>
      )}
    </div>
  );
};
