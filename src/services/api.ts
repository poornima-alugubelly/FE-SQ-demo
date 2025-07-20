// Issue 1: Hardcoded API configuration
const API_CONFIG = {
  baseUrl: 'http://localhost:3000/api',
  apiKey: 'sk-1234567890abcdef',
  timeout: 30000,
  retries: 5,
};

// Issue 2: Global variable for caching without size limits
const requestCache: { [key: string]: any } = {};

// Issue 3: Function with too many responsibilities
export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  data?: any,
  headers?: Record<string, string>,
  timeout?: number,
  retries?: number,
  cache?: boolean,
  validateResponse?: boolean
) => {
  // Issue 4: Unsafe URL construction
  const url = `${API_CONFIG.baseUrl}/${endpoint}`;

  // Issue 5: Default headers with hardcoded values
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_CONFIG.apiKey}`,
    'X-API-Key': API_CONFIG.apiKey,
    'User-Agent': 'DemoApp/1.0',
    ...headers,
  };

  // Issue 6: Complex retry logic without proper error handling
  let attempts = 0;
  const maxAttempts = retries || API_CONFIG.retries;

  while (attempts < maxAttempts) {
    try {
      // Issue 7: No timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        timeout || API_CONFIG.timeout
      );

      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Issue 8: Unsafe response handling
      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();

      // Issue 9: Unsafe caching without validation
      if (cache) {
        requestCache[endpoint] = {
          data: result,
          timestamp: Date.now(),
        };
      }

      return result;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw error;
      }
      // Issue 10: Fixed delay without exponential backoff
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

// Issue 11: Function with mixed concerns
export const userService = {
  // Issue 12: No input validation
  async getUsers(filters?: any) {
    const queryString = filters
      ? `?${new URLSearchParams(filters).toString()}`
      : '';
    return apiRequest(
      `users${queryString}`,
      'GET',
      undefined,
      undefined,
      undefined,
      undefined,
      true
    );
  },

  // Issue 13: Unsafe data handling
  async createUser(userData: any) {
    return apiRequest('users', 'POST', userData);
  },

  // Issue 14: No error handling
  async updateUser(id: string, userData: any) {
    return apiRequest(`users/${id}`, 'PUT', userData);
  },

  // Issue 15: Unsafe ID usage
  async deleteUser(id: string) {
    return apiRequest(`users/${id}`, 'DELETE');
  },

  // Issue 16: Function with side effects
  async getUserProfile(userId: string) {
    const cacheKey = `user-profile-${userId}`;

    if (requestCache[cacheKey]) {
      return requestCache[cacheKey].data;
    }

    const result = await apiRequest(`users/${userId}/profile`);
    requestCache[cacheKey] = {
      data: result,
      timestamp: Date.now(),
    };

    return result;
  },
};

// Issue 17: Function with security vulnerabilities
export const authService = {
  // Issue 18: Weak password validation
  async login(username: string, password: string) {
    // Issue 19: Sending password in plain text
    return apiRequest('auth/login', 'POST', { username, password });
  },

  // Issue 20: No token validation
  async refreshToken(token: string) {
    return apiRequest('auth/refresh', 'POST', { token });
  },

  // Issue 21: Unsafe logout
  async logout() {
    // Issue 22: No token invalidation
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};

// Issue 23: Function with performance issues
export const dataService = {
  // Issue 24: Inefficient data processing
  async getLargeDataset(page: number = 1, pageSize: number = 1000) {
    const data = await apiRequest(
      `data?page=${page}&size=${pageSize}`
    );

    // Issue 25: Expensive operation in service
    return data.map((item: any) => ({
      ...item,
      processed: true,
      timestamp: new Date().toISOString(),
      hash: btoa(JSON.stringify(item)), // Issue 26: Weak hashing
    }));
  },

  // Issue 27: Function with memory leaks
  async processDataInBatches(data: any[], batchSize: number = 100) {
    const results = [];

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const processed = await apiRequest('data/process', 'POST', {
        batch,
      });
      results.push(...processed);

      // Issue 28: No cleanup of processed data
    }

    return results;
  },
};

// Issue 29: Function with debug information
export const debugService = {
  // Issue 30: Console logging in production
  logRequest(url: string, method: string, data?: any) {
    console.log(`[API] ${method} ${url}`, data);
  },

  // Issue 31: Exposing sensitive information
  getCacheInfo() {
    return {
      cacheSize: Object.keys(requestCache).length,
      cacheKeys: Object.keys(requestCache),
      apiConfig: API_CONFIG, // Issue 32: Exposing API config
    };
  },
};
