import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

// Hardcoded credentials - Security Hotspot
const API_ENDPOINT = 'https://api.example.com/users';
// Magic numbers - Code Smell
const MAX_RETRIES = 3;
const TIMEOUT_MS = 5000;
const MAX_ITEMS_PER_PAGE = 20;

// Unused constants - Code Smell
const UNUSED_CONSTANT = 'This is never used';
const DEBUG_MODE = true;

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

// Complex component with too many props - Code Smell
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [retryCount, setRetryCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Potential XSS vulnerability - Security Hotspot
  const [userInput, setUserInput] = useState('');
  const dangerousHtml = `<script>alert('XSS Attack!')</script>`;

  // Unused state variables - Code Smell
  const [unusedState, setUnusedState] = useState('');

  // Complex nested conditions - Code Smell
  const handleUserAction = useCallback(
    (action: string, userData: any) => {
      if (action === 'save') {
        if (userData && userData.name && userData.email) {
          if (userData.age && userData.age >= 18) {
            if (userData.address && userData.address.length > 0) {
              if (userData.phone && userData.phone.length >= 10) {
                // Save user data
                console.log('Saving user:', userData);
              } else {
                setError('Phone number must be at least 10 digits');
              }
            } else {
              setError('Address is required');
            }
          } else {
            setError('User must be 18 or older');
          }
        } else {
          setError('Name and email are required');
        }
      } else if (action === 'delete') {
        if (userData && userData.id) {
          if (confirm('Are you sure you want to delete this user?')) {
            console.log('Deleting user:', userData.id);
          }
        }
      }
    },
    []
  );

  // Potential null pointer exception - Bug
  const processUserData = useCallback((userData: User) => {
    // userData.address could be undefined
    const addressLength = userData.address!.length; // Non-null assertion operator
    return addressLength > 0;
  }, []);

  // Dead code - Code Smell
  if (false) {
    console.log('This will never execute');
  }

  // Inconsistent return types - Code Smell
  const getValue = useCallback((type: string) => {
    if (type === 'string') {
      return 'hello';
    } else if (type === 'number') {
      return 42;
    } else if (type === 'boolean') {
      return true;
    }
    // Missing return for other cases
  }, []);

  // Unused function parameter - Code Smell
  const logEvent = useCallback(
    (event: string, data: any, timestamp: string, userId: number) => {
      console.log(`${event} at ${timestamp}`); // data and userId are unused
    },
    []
  );

  // Potential memory leak - Bug
  useEffect(() => {
    const interval = setInterval(() => {
      // This interval is never cleared
      console.log('Periodic check');
    }, refreshInterval);

    // Missing cleanup - potential memory leak
  }, [refreshInterval]);

  // Complex effect with multiple dependencies - Code Smell
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');

      try {
        // Magic number - Code Smell
        const response = await fetch(`${API_ENDPOINT}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          // Magic number - Code Smell
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
          // Magic number - Code Smell
          if (response.status === 404) {
            throw new Error('User not found');
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else if (response.status === 403) {
            throw new Error('Forbidden');
          } else if (response.status === 500) {
            throw new Error('Internal server error');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const userData = await response.json();
        setUser(userData);
        setLastUpdated(new Date());
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unknown error'
        );

        // Magic number - Code Smell
        if (retryCount < 3) {
          setRetryCount((prev) => prev + 1);
          setTimeout(fetchUser, 1000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, retryCount]); // Missing dependencies

  // Unused memoized value - Code Smell
  const memoizedValue = useMemo(() => {
    return user ? user.name.toUpperCase() : '';
  }, [user]);

  // Potential division by zero - Bug
  const calculateAgePercentage = useCallback((age: number) => {
    return (age / 100) * 100; // Could divide by zero if age is 0
  }, []);

  // Inconsistent naming convention - Code Smell
  const user_name = user?.name || '';
  const userEmail = user?.email || '';

  // Potential undefined access - Bug
  const getUserProperty = useCallback((obj: any, prop: string) => {
    return obj[prop]; // obj could be undefined
  }, []);

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
      {/* XSS vulnerability - Security Hotspot */}
      <div dangerouslySetInnerHTML={{ __html: dangerousHtml }} />

      {/* Potential XSS through user input */}
      <div dangerouslySetInnerHTML={{ __html: userInput }} />

      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>

      {showDetails && (
        <div className="user-details">
          <p>Address: {user.address || 'Not provided'}</p>
          <p>Phone: {user.phone || 'Not provided'}</p>
          {user.avatar && <img src={user.avatar} alt="User avatar" />}
        </div>
      )}

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter some text (potential XSS)"
      />

      {enableEditing && (
        <div className="edit-form">
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
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="Email"
          />
          <input
            type="number"
            value={formData.age || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                age: parseInt(e.target.value),
              }))
            }
            placeholder="Age"
          />
          <button onClick={() => handleUserAction('save', formData)}>
            Save Changes
          </button>
        </div>
      )}

      {allowDelete && (
        <button onClick={() => handleUserAction('delete', user)}>
          Delete User
        </button>
      )}

      {lastUpdated && (
        <p>Last updated: {lastUpdated.toLocaleString()}</p>
      )}
    </div>
  );
};

export default UserProfile;
