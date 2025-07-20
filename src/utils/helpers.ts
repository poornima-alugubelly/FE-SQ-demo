// Issue 1: Unused imports
import React from 'react';

// Issue 2: Global variables that could cause side effects
let globalCounter = 0;
const globalConfig = {
  apiUrl: 'http://localhost:3000',
  timeout: 5000,
  retries: 3,
};

// Issue 3: Function with too many parameters
export const processData = (
  data: any,
  filter: string,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  page: number,
  pageSize: number,
  includeDeleted: boolean,
  format: 'json' | 'xml' | 'csv'
) => {
  // Issue 4: Complex nested logic
  let result = data;

  if (filter) {
    result = result.filter((item: any) => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(filter.toLowerCase());
      } else if (typeof item === 'object') {
        return Object.values(item).some((value: any) =>
          String(value).toLowerCase().includes(filter.toLowerCase())
        );
      }
      return false;
    });
  }

  if (sortBy) {
    result.sort((a: any, b: any) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else if (
        typeof aVal === 'number' &&
        typeof bVal === 'number'
      ) {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }

  if (page && pageSize) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    result = result.slice(start, end);
  }

  return result;
};

// Issue 5: Function with magic numbers
export const validateAge = (age: number) => {
  return age >= 18 && age <= 120; // Magic numbers
};

// Issue 6: Function that could be simplified
export const formatCurrency = (amount: number, currency: string) => {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  } else if (currency === 'EUR') {
    return `€${amount.toFixed(2)}`;
  } else if (currency === 'GBP') {
    return `£${amount.toFixed(2)}`;
  } else {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

// Issue 7: Unused function
export const unusedHelper = () => {
  console.log('This function is never used');
};

// Issue 8: Function with side effects
export const incrementCounter = () => {
  globalCounter++;
  return globalCounter;
};

// Issue 9: Function with unsafe type assertions
export const parseJson = (jsonString: string) => {
  try {
    return JSON.parse(jsonString) as any;
  } catch (error) {
    return null;
  }
};

// Issue 10: Function with hardcoded values
export const getApiEndpoint = (resource: string) => {
  return `${globalConfig.apiUrl}/api/v1/${resource}`;
};

// Issue 11: Function with complex conditional logic
export const determineUserRole = (
  permissions: string[],
  age: number,
  isActive: boolean
) => {
  if (permissions.includes('admin')) {
    return 'admin';
  } else if (permissions.includes('moderator') && age >= 18) {
    return 'moderator';
  } else if (permissions.includes('user') && isActive) {
    return 'user';
  } else if (age >= 13) {
    return 'guest';
  } else {
    return 'restricted';
  }
};

// Issue 12: Function with potential null reference
export const getNestedValue = (obj: any, path: string) => {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }

  return result;
};

// Issue 13: Function with console.log in production code
export const debugLog = (message: string, data?: any) => {
  console.log(`[DEBUG] ${message}`, data);
};

// Issue 14: Function with potential memory leak
export const createLargeArray = (size: number) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push({ id: i, data: 'some data'.repeat(100) });
  }
  return arr;
};

// Issue 15: Function with unsafe string concatenation
export const buildQueryString = (params: Record<string, any>) => {
  let queryString = '';
  for (const [key, value] of Object.entries(params)) {
    queryString += `${key}=${encodeURIComponent(value)}&`;
  }
  return queryString.slice(0, -1);
};
