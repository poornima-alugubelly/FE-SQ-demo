// Configuration file with various SonarQube issues

// Magic numbers - Code Smell
export const TIMEOUTS = {
  DEFAULT: 30000,
  SHORT: 5000,
  LONG: 60000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

// Unused constants - Code Smell
const UNUSED_CONFIG = 'This configuration is never used';
const DEBUG_MODE = true;

// Hardcoded URLs - Security Hotspot
export const ENDPOINTS = {
  API_BASE: 'https://api.example.com/v1',
  AUTH_SERVICE: 'https://auth.example.com',
  PAYMENT_SERVICE: 'https://payment.example.com',
  FILE_SERVICE: 'https://files.example.com',
  WEBSOCKET_URL: 'wss://ws.example.com',
};

// Magic strings - Code Smell
export const STATUS_CODES = {
  SUCCESS: '200',
  NOT_FOUND: '404',
  UNAUTHORIZED: '401',
  FORBIDDEN: '403',
  INTERNAL_ERROR: '500',
};

// Potential null pointer exception - Bug
export function getConfigValue(key: string): any {
  const config = {
    timeout: TIMEOUTS.DEFAULT,
    endpoint: ENDPOINTS.API_BASE,
  };

  return config[key];
}

// Inconsistent naming convention - Code Smell
export const api_url = ENDPOINTS.API_BASE; // Should be API_URL
export const timeout_ms = TIMEOUTS.DEFAULT; // Should be TIMEOUT_MS
export const maxRetries = TIMEOUTS.MAX_RETRIES; // Should be MAX_RETRIES

// Dead code - Code Smell
if (false) {
  console.log('This configuration will never be used');
}

// Unused function - Code Smell
export function unusedConfigFunction(): void {
  console.log('This configuration function is never called');
}

// Potential division by zero - Bug
export function calculateTimeout(
  baseTimeout: number,
  multiplier: number
): number {
  return baseTimeout / multiplier; // multiplier could be 0
}

// Magic number - Code Smell
export function getRetryDelay(attempt: number): number {
  return attempt * 1000; // Magic number 1000
}

// Inconsistent return types - Code Smell
export function getConfigType(type: string): any {
  if (type === 'string') {
    return 'config';
  } else if (type === 'number') {
    return 42;
  } else if (type === 'boolean') {
    return true;
  }
  // Missing return for other cases
}

// Unused variable - Code Smell
export function processConfig(config: any): void {
  const { name, value, type } = config;
  console.log(name, value); // type is unused
}

// Potential undefined access - Bug
export function accessConfigProperty(obj: any, prop: string): any {
  return obj[prop]; // obj could be undefined
}

// Complex nested conditions - Code Smell
export function validateConfig(config: any): boolean {
  if (config) {
    if (config.apiKey) {
      if (config.apiKey.length > 0) {
        if (config.timeout) {
          if (config.timeout > 0) {
            if (config.endpoint) {
              if (config.endpoint.startsWith('https://')) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Long function - Maintainability Issue
export function processConfiguration(
  config: any,
  environment: string,
  version: string,
  features: string[],
  settings: any
): any {
  // Step 1: Validate configuration
  if (!config || !environment || !version) {
    throw new Error('Invalid configuration parameters');
  }

  // Step 2: Apply environment-specific settings
  const envConfig = {
    development: {
      debug: true,
      logLevel: 'debug',
      cacheEnabled: false,
    },
    staging: {
      debug: false,
      logLevel: 'info',
      cacheEnabled: true,
    },
    production: {
      debug: false,
      logLevel: 'error',
      cacheEnabled: true,
    },
  };

  // Step 3: Process features
  const processedFeatures = features.map((feature) => {
    if (feature === 'auth') {
      return { name: feature, enabled: true, priority: 'high' };
    } else if (feature === 'payment') {
      return { name: feature, enabled: true, priority: 'medium' };
    } else if (feature === 'analytics') {
      return { name: feature, enabled: false, priority: 'low' };
    } else {
      return { name: feature, enabled: false, priority: 'unknown' };
    }
  });

  // Step 4: Apply settings
  const finalConfig = {
    ...config,
    environment,
    version,
    features: processedFeatures,
    settings: {
      ...envConfig[environment as keyof typeof envConfig],
      ...settings,
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      checksum: calculateChecksum(config),
    },
  };

  // Step 5: Validate final configuration
  if (!validateConfig(finalConfig)) {
    throw new Error('Final configuration validation failed');
  }

  return finalConfig;
}

// Helper function with magic numbers - Code Smell
function calculateChecksum(config: any): string {
  const str = JSON.stringify(config);
  let hash = 0;

  // Magic numbers - Code Smell
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return hash.toString(16);
}

// Potential memory leak - Bug
export function createConfigWatcher(): void {
  const interval = setInterval(() => {
    console.log('Checking configuration...');
  }, 5000);

  // Missing clearInterval - potential memory leak
}

// Potential race condition - Bug
let configVersion = 0;

export function getNextConfigVersion(): number {
  configVersion++; // Not atomic
  return configVersion;
}

// Unused parameter - Code Smell
export function logConfigChange(
  oldConfig: any,
  newConfig: any,
  timestamp: string,
  userId: string
): void {
  console.log(`Configuration changed at ${timestamp}`); // oldConfig, newConfig, and userId are unused
}

// Magic string - Code Smell
export function getEnvironmentName(env: string): string {
  if (env === 'dev') {
    return 'Development';
  } else if (env === 'staging') {
    return 'Staging';
  } else if (env === 'prod') {
    return 'Production';
  } else {
    return 'Unknown'; // Magic string
  }
}
