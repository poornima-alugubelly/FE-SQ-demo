// Utility functions with various SonarQube issues

// Hardcoded credentials - Security Hotspot (S6582)
const SECRET_KEY = 'my-super-secret-key-12345';
const DB_CONNECTION_STRING =
  'mongodb://admin:password123@localhost:27017/db';

// Magic numbers - Code Smell (S109)
const DEFAULT_TIMEOUT = 30000;
const MAX_FILE_SIZE = 10485760;

// Potential SQL injection - Security Hotspot (S5146)
export function buildQuery(
  tableName: string,
  whereClause: string
): string {
  return `SELECT * FROM ${tableName} WHERE ${whereClause}`;
}

// XSS vulnerability - Security Hotspot (S6353)
export function renderUserContent(content: string): string {
  return `<div>${content}</div>`; // No sanitization
}

// Potential null pointer exception - Bug (S2259)
export function getNestedProperty(obj: any, path: string): any {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    result = result[key]; // Could be undefined
  }

  return result;
}

// Complex function with too many parameters - Code Smell (S107)
export async function fetchUsers(
  page: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
  filterBy: string,
  includeDeleted: boolean,
  includeArchived: boolean,
  includeDrafts: boolean,
  includePrivate: boolean,
  includeSystem: boolean
): Promise<any> {
  // Magic number - Code Smell (S109)
  if (limit > 1000) {
    limit = 1000;
  }

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
    // Magic number - Code Smell (S109)
    const response = await fetch(
      `https://api.example.com/users?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!response.ok) {
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

// Duplicated code - Maintainability Issue (S4144)
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateEmailAddress(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Long function - Maintainability Issue (S3776)
export function processUserData(user: any): any {
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

// Helper functions with magic numbers - Code Smell (S109)
function calculatePasswordStrength(password: string): number {
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return strength;
}

function calculateNameComplexity(name: string): number {
  return (
    name.length * 0.5 + (name.match(/[A-Z]/g)?.length || 0) * 0.3
  );
}

function calculateEmailComplexity(email: string): number {
  return (
    email.length * 0.2 + (email.match(/[0-9]/g)?.length || 0) * 0.1
  );
}

function calculateOverallScore(user: any): number {
  return (
    user.nameLength * 0.3 +
    user.emailLength * 0.2 +
    user.passwordStrength * 0.5
  );
}

// Inconsistent return types - Code Smell (S3516)
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

// Potential memory leak - Bug (S4138)
export function createEventListeners(): void {
  const elements = document.querySelectorAll('.button');

  elements.forEach((element) => {
    element.addEventListener('click', () => {
      console.log('Button clicked');
    });
    // Missing removeEventListener - potential memory leak
  });
}

// Hardcoded file path - Security Hotspot (S1075)
export function readConfigFile(): string {
  return '/etc/app/config.json'; // Hardcoded path
}

// Potential race condition - Bug (S2886)
let counter = 0;

export function incrementCounter(): number {
  counter++; // Not atomic
  return counter;
}

// Potential division by zero - Bug (S3518)
export function divide(a: number, b: number): number {
  return a / b; // No check for b === 0
}

// Dead code - Code Smell (S2589)
if (false) {
  console.log('This will never execute');
}

// Potential null pointer exception - Bug (S2259)
export function processUser(user: any) {
  // user.password could be undefined
  const passwordLength = user.password!.length; // Non-null assertion operator
  return passwordLength > 8;
}
