import * as fs from 'fs'; // Unused import - SonarQube issue

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

const debugMode = true; // Unused variable - SonarQube issue

export function getConfigValue(key: string): any {
  console.log('Getting config value for:', key); // Console.log - SonarQube issue
  const config: Record<string, any> = {
    timeout: TIMEOUTS.DEFAULT,
    endpoint: ENDPOINTS.API_BASE,
  };

  return config[key];
}

export const api_url = ENDPOINTS.API_BASE;
export const timeout_ms = TIMEOUTS.DEFAULT;

export function calculateTimeout(
  baseTimeout: number,
  multiplier: number
): number {
  console.log('Calculating timeout with:', baseTimeout, multiplier); // Console.log - SonarQube issue
  return baseTimeout / multiplier;
}

export function getRetryDelay(attempt: number): number {
  return attempt * 1000;
}

export function validateConfig(config: any): boolean {
  if (!config?.apiKey || !config?.endpoint?.startsWith('https://')) {
    return false;
  }
  return true;
}

export function processConfiguration(
  config: any,
  environment: string,
  version: string,
  features: string[],
  settings: any
): any {
  if (!config || !environment || !version) {
    throw new Error('Invalid configuration parameters');
  }

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

  if (!validateConfig(finalConfig)) {
    throw new Error('Final configuration validation failed');
  }

  return finalConfig;
}

function calculateChecksum(config: any): string {
  const str = JSON.stringify(config);
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash.toString(16);
}

export function createConfigWatcher(): void {
  setInterval(() => {
    console.log('Checking configuration...'); // Console.log - SonarQube issue
  }, 5000);
}

let configVersion = 0;

export function getNextConfigVersion(): number {
  configVersion++;
  console.log('New config version:', configVersion); // Console.log - SonarQube issue
  return configVersion;
}

export function getEnvironmentName(env: string): string {
  if (env === 'dev') {
    return 'Development';
  } else if (env === 'staging') {
    return 'Staging';
  } else if (env === 'prod') {
    return 'Production';
  } else {
    return 'Unknown';
  }
}
