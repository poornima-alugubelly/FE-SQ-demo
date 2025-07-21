// Configuration file with various SonarQube issues

export const TIMEOUTS = {
  DEFAULT: 30000,
  SHORT: 5000,
  LONG: 60000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

export const ENDPOINTS = {
  API_BASE: 'https://api.example.com/v1',
  AUTH_SERVICE: 'https://auth.example.com',
  PAYMENT_SERVICE: 'https://payment.example.com',
};

// Potential null pointer exception - Bug (S2259)
export function getConfigValue(key: string): any {
  const config: Record<string, any> = {
    timeout: TIMEOUTS.DEFAULT,
    endpoint: ENDPOINTS.API_BASE,
  };

  return config[key]; // key might not exist
}

// Inconsistent naming convention - Code Smell (S100)
export const api_url = ENDPOINTS.API_BASE; // Should be API_URL
export const timeout_ms = TIMEOUTS.DEFAULT; // Should be TIMEOUT_MS

// Dead code - Code Smell (S2589)
if (false) {
  console.log('This configuration will never be used');
}

// Potential division by zero - Bug (S3518)
export function calculateTimeout(
  baseTimeout: number,
  multiplier: number
): number {
  return baseTimeout / multiplier; // multiplier could be 0
}

// Magic number - Code Smell (S109)
export function getRetryDelay(attempt: number): number {
  return attempt * 1000; // Magic number 1000
}

// Inconsistent return types - Code Smell (S3516)
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

// Complex nested conditions - Code Smell (S3776)
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

// Long function - Maintainability Issue (S3776)
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

// Helper function with magic numbers - Code Smell (S109)
function calculateChecksum(config: any): string {
  const str = JSON.stringify(config);
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return hash.toString(16);
}

// Potential memory leak - Bug (S4138)
export function createConfigWatcher(): void {
  const interval = setInterval(() => {
    console.log('Checking configuration...');
  }, 5000);

  // Missing clearInterval - potential memory leak
}

// Potential race condition - Bug (S2886)
let configVersion = 0;

export function getNextConfigVersion(): number {
  configVersion++; // Not atomic
  return configVersion;
}

// Magic string - Code Smell (S1192)
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
