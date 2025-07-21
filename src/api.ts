// API service with various SonarQube issues

// Hardcoded credentials - Security Hotspot
const API_BASE_URL = 'https://api.example.com/v1';

// Magic numbers - Code Smell
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const MAX_FILE_SIZE = 10485760;

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

// Potential SQL injection - Security Hotspot
export function buildUserQuery(
  userId: number,
  filters: string
): string {
  return `SELECT * FROM users WHERE id = ${userId} AND ${filters}`;
}

// XSS vulnerability - Security Hotspot
export function renderUserContent(content: string): string {
  return `<div class="user-content">${content}</div>`; // No sanitization
}

// Potential null pointer exception - Bug
export function getNestedProperty(obj: any, path: string): any {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    result = result[key]; // Could be undefined
  }

  return result;
}

// Complex function with too many parameters - Code Smell
export async function fetchUsers(params: {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  filterBy: string;
  includeDeleted: boolean;
  includeArchived: boolean;
  includeDrafts: boolean;
  includePrivate: boolean;
  includeSystem: boolean;
}): Promise<ApiResponse<User[]>> {
  const {
    page,
    sortBy,
    sortOrder,
    filterBy,
    includeDeleted,
    includeArchived,
    includeDrafts,
    includePrivate,
    includeSystem,
  } = params;
  let { limit } = params;

  // Magic number - Code Smell
  if (limit > 1000) {
    limit = 1000;
  }

  // Unused variable - Code Smell
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    sortOrder,
    filterBy,
    includeDeleted: includeDeleted.toString(),
    includeArchived: includeArchived.toString(),
    includeDrafts: includeDrafts.toString(),
    includePrivate: includePrivate.toString(),
    includeSystem: includeSystem.toString(),
  });

  try {
    // Magic number - Code Smell
    const response = await fetch(
      `${API_BASE_URL}/users?${queryParams}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Magic number - Code Smell
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!response.ok) {
      // Magic number - Code Smell
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data: data.users,
      status: response.status,
      message: 'Success',
    };
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
}

// Duplicated code - Maintainability Issue
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateEmailAddress(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Long function - Maintainability Issue
export function processUserData(user: User): any {
  // Step 1: Validate user data
  if (!user.name || !user.email) {
    throw new Error('Name and email are required');
  }

  if (!validateEmail(user.email)) {
    throw new Error('Invalid email format');
  }

  // Step 2: Process user information
  const processedUser = {
    id: user.id,
    name: user.name.trim(),
    email: user.email.toLowerCase(),
    nameLength: user.name.length,
    emailLength: user.email.length,
    hasPassword: !!user.password,
    passwordStrength: user.password
      ? calculatePasswordStrength(user.password)
      : 0,
  };

  // Step 3: Apply business rules
  if (processedUser.nameLength < 2) {
    throw new Error('Name must be at least 2 characters long');
  }

  if (processedUser.nameLength > 50) {
    throw new Error('Name must be less than 50 characters long');
  }

  if (processedUser.emailLength > 100) {
    throw new Error('Email must be less than 100 characters long');
  }

  // Step 4: Calculate additional metrics
  const metrics = {
    nameComplexity: calculateNameComplexity(user.name),
    emailComplexity: calculateEmailComplexity(user.email),
    overallScore: calculateOverallScore(processedUser),
  };

  // Step 5: Apply final transformations
  const finalUser = {
    ...processedUser,
    metrics,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    version: 1,
  };

  return finalUser;
}

// Helper functions with magic numbers - Code Smell
function calculatePasswordStrength(password: string): number {
  let strength = 0;

  // Magic numbers - Code Smell
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return strength;
}

function calculateNameComplexity(name: string): number {
  // Magic numbers - Code Smell
  return (
    name.length * 0.5 + (name.match(/[A-Z]/g)?.length || 0) * 0.3
  );
}

function calculateEmailComplexity(email: string): number {
  // Magic numbers - Code Smell
  return email.length * 0.2 + (email.match(/\d/g)?.length || 0) * 0.1;
}

function calculateOverallScore(user: any): number {
  // Magic numbers - Code Smell
  return (
    user.nameLength * 0.3 +
    user.emailLength * 0.2 +
    user.passwordStrength * 0.5
  );
}

// Inconsistent return types - Code Smell
export function getValue(key: string): any {
  if (key === 'string') {
    return 'hello';
  } else if (key === 'number') {
    return 42;
  } else if (key === 'boolean') {
    return true;
  } else if (key === 'null') {
    return null;
  }
  // Missing return for other cases
}

// Unused function parameter - Code Smell
export function logApiCall(
  endpoint: string,
  method: string,
  data: any,
  timestamp: string,
  userId: number
): void {
  console.log(`${method} ${endpoint} at ${timestamp}`); // data and userId are unused
}

// Potential memory leak - Bug
export function createEventListeners(): void {
  const elements = document.querySelectorAll('.button');

  elements.forEach((element) => {
    element.addEventListener('click', () => {
      console.log('Button clicked');
    });
    // Missing removeEventListener - potential memory leak
  });
}

// Hardcoded file path - Security Hotspot
export function readConfigFile(): string {
  return '/etc/app/config.json'; // Hardcoded path
}

// Potential race condition - Bug
let requestId = 0;

export function getNextRequestId(): number {
  requestId++; // Not atomic
  return requestId;
}

// Unused function - Code Smell
export function unusedApiFunction(): void {
  // This function is exported but never used
  console.log('This API function is never called');
}

// Potential infinite loop - Bug
export function processArray(arr: number[]): number[] {
  return arr.map((item) => {
    if (item > 0) {
      if (item % 2 === 0) {
        if (item > 10) {
          if (item < 100) {
            return item * 2;
          } else {
            return item / 2;
          }
        } else {
          return item + 1;
        }
      } else {
        return item - 1;
      }
    } else {
      return 0;
    }
  });
}

// Inconsistent naming convention - Code Smell
export const API_URL = 'https://api.example.com';
export const apiKey = 'key123'; // Should be API_KEY
export const user_id = 'user123'; // Should be userId

// Potential division by zero - Bug
export function divide(a: number, b: number): number {
  return a / b; // No check for b === 0
}

// Unused variable in destructuring - Code Smell
export function destructureExample(obj: {
  name: string;
  age: number;
  email: string;
}): void {
  const { name, age, email } = obj;
  console.log(`Name: ${name}, Age: ${age}, Email: ${email}`);
}

// Potential undefined access - Bug
export function accessProperty(obj: any, prop: string): any {
  return obj[prop]; // obj could be undefined
}

// Magic string - Code Smell
export function getStatus(statusCode: number): string {
  if (statusCode >= 200 && statusCode < 300) {
    return 'success';
  } else if (statusCode >= 400 && statusCode < 500) {
    return 'client_error';
  } else if (statusCode >= 500) {
    return 'server_error';
  } else {
    return 'unknown'; // Magic string
  }
}

// Potential null pointer exception - Bug
export function processUser(user: User) {
  // user.password could be undefined
  const passwordLength = user.password!.length; // Non-null assertion operator
  return passwordLength > 8;
}
