// Utility functions with various SonarQube issues

// Magic numbers - Code Smell
const DEFAULT_TIMEOUT = 30000;
const MAX_FILE_SIZE = 10485760;
const RETRY_ATTEMPTS = 5;

// Unused variables - Code Smell
const UNUSED_UTILITY = 'This utility is never used';
const DEBUG_MODE = true; // Set to false in production

// Potential SQL injection - Security Hotspot
export function buildQuery(
  tableName: string,
  whereClause: string
): string {
  return `SELECT * FROM ${tableName} WHERE ${whereClause}`;
}

// XSS vulnerability - Security Hotspot
export function renderUserContent(content: string): string {
  return `<div>${content}</div>`; // No sanitization
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
export function processData(
  data: any,
  filter: string,
  sortBy: string,
  limit: number,
  offset: number,
  includeDeleted: boolean,
  includeArchived: boolean,
  includeDrafts: boolean,
  includePrivate: boolean,
  includeSystem: boolean
): any {
  // Magic number - Code Smell
  if (limit > 1000) {
    limit = 1000;
  }

  // Unused variable - Code Smell
  const processedData = data.filter((item: any) => {
    if (filter && !item.name.includes(filter)) {
      return false;
    }
    if (!includeDeleted && item.deleted) {
      return false;
    }
    if (!includeArchived && item.archived) {
      return false;
    }
    if (!includeDrafts && item.draft) {
      return false;
    }
    if (!includePrivate && item.private) {
      return false;
    }
    if (!includeSystem && item.system) {
      return false;
    }
    return true;
  });

  // Dead code - Code Smell
  if (false) {
    console.log('This will never execute');
  }

  return processedData;
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
export function complexCalculation(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
): number {
  // Step 1: Validate inputs
  if (a < 0 || b < 0 || c < 0 || d < 0 || e < 0) {
    throw new Error('All inputs must be positive');
  }

  // Step 2: Perform initial calculations
  const step1 = a * b;
  const step2 = c * d;
  const step3 = e * 2;

  // Step 3: Apply business logic
  if (step1 > 100) {
    const adjustment1 = step1 * 0.1;
    const adjustment2 = adjustment1 + step2;
    const adjustment3 = adjustment2 / step3;

    // Step 4: More complex logic
    if (adjustment3 > 50) {
      const finalAdjustment = adjustment3 * 1.5;
      const result1 = finalAdjustment + step1;
      const result2 = result1 - step2;
      const result3 = result2 * step3;

      // Step 5: Final calculations
      if (result3 > 1000) {
        return result3 * 0.8;
      } else if (result3 > 500) {
        return result3 * 0.9;
      } else {
        return result3;
      }
    } else {
      return adjustment3;
    }
  } else {
    return step1 + step2 + step3;
  }
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
export function logMessage(
  message: string,
  level: string,
  timestamp: string,
  userId: string
): void {
  console.log(`${message} at ${timestamp}`); // level and userId are unused
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
let counter = 0;

export function incrementCounter(): number {
  counter++; // Not atomic
  return counter;
}

// Unused import simulation - Code Smell
export function unusedFunction(): void {
  // This function is exported but never used
  console.log('This function is never called');
}

// Potential infinite loop - Bug
export function processArray(arr: number[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      result.push(arr[i]);
      // Missing i++ could cause infinite loop if arr[i] is always > 0
    }
  }

  return result;
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
  console.log(name, age); // email is unused
}

// Potential undefined access - Bug
export function accessProperty(obj: any, prop: string): any {
  return obj[prop]; // obj could be undefined
}

// Magic string - Code Smell
export function getStatus(statusCode: number): string {
  if (statusCode === 200) {
    return 'OK';
  } else if (statusCode === 404) {
    return 'Not Found';
  } else if (statusCode === 500) {
    return 'Internal Server Error';
  } else {
    return 'Unknown'; // Magic string
  }
}
