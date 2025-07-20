import { useState, useEffect, useCallback, useRef } from 'react';

// Issue 1: Global variable causing memory leaks
const globalDataStore: { [key: string]: any } = {};

// Issue 2: Interface with too many optional properties
interface UseDataOptions {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  cache?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  transform?: (data: any) => any;
  validate?: (data: any) => boolean;
  debounce?: number;
  throttle?: number;
}

// Issue 3: Hook with too many responsibilities
export const useData = (options: UseDataOptions = {}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Issue 4: Too many refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const lastRequestRef = useRef<Date | null>(null);

  // Issue 5: Function with too many parameters
  const fetchData = useCallback(
    async (
      url?: string,
      method?: string,
      requestData?: any,
      headers?: Record<string, string>,
      timeout?: number,
      retries?: number,
      cache?: boolean
    ) => {
      const targetUrl = url || options.url;
      if (!targetUrl) return;

      setLoading(true);
      setError(null);

      // Issue 6: Abort previous request without cleanup
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        // Issue 7: No input validation
        const response = await fetch(targetUrl, {
          method: method || options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
            ...options.headers,
          },
          body: requestData ? JSON.stringify(requestData) : undefined,
          signal: abortControllerRef.current.signal,
        });

        // Issue 8: Unsafe response handling
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${response.statusText}`
          );
        }

        const result = await response.json();

        // Issue 9: Unsafe data transformation
        const transformedData = options.transform
          ? options.transform(result)
          : result;

        // Issue 10: Unsafe validation
        if (options.validate && !options.validate(transformedData)) {
          throw new Error('Data validation failed');
        }

        setData(transformedData);
        setLastUpdated(new Date());

        // Issue 11: Global variable pollution
        if (cache || options.cache) {
          globalDataStore[targetUrl] = {
            data: transformedData,
            timestamp: Date.now(),
          };
        }

        // Issue 12: Side effect in callback
        if (options.onSuccess) {
          options.onSuccess(transformedData);
        }

        retryCountRef.current = 0;
      } catch (err) {
        // Issue 13: Generic error handling
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);

        // Issue 14: Complex retry logic
        if (
          retryCountRef.current < (retries || options.retries || 3)
        ) {
          retryCountRef.current++;
          setTimeout(() => {
            fetchData(
              url,
              method,
              requestData,
              headers,
              timeout,
              retries,
              cache
            );
          }, 1000 * retryCountRef.current);
        }

        if (options.onError) {
          options.onError(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  // Issue 15: Effect with complex dependencies
  useEffect(() => {
    if (options.url) {
      fetchData();
    }

    // Issue 16: Auto-refresh without proper cleanup
    if (options.autoRefresh && options.refreshInterval) {
      intervalRef.current = setInterval(() => {
        fetchData();
      }, options.refreshInterval);
    }

    // Issue 17: Missing cleanup
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    options.url,
    options.autoRefresh,
    options.refreshInterval,
    fetchData,
  ]);

  // Issue 18: Function with side effects
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Issue 19: Function that could be simplified
  const updateData = useCallback(
    (newData: any) => {
      setData(newData);
      setLastUpdated(new Date());

      // Issue 20: Side effect in callback
      if (options.url && globalDataStore[options.url]) {
        globalDataStore[options.url].data = newData;
        globalDataStore[options.url].timestamp = Date.now();
      }
    },
    [options.url]
  );

  // Issue 21: Function with performance issues
  const clearCache = useCallback(() => {
    Object.keys(globalDataStore).forEach((key) => {
      delete globalDataStore[key];
    });
  }, []);

  // Issue 22: Function with debug information
  const getDebugInfo = useCallback(() => {
    return {
      dataSize: data ? JSON.stringify(data).length : 0,
      cacheSize: Object.keys(globalDataStore).length,
      retryCount: retryCountRef.current,
      lastRequest: lastRequestRef.current,
      lastUpdated,
    };
  }, [data, lastUpdated]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    updateData,
    clearCache,
    getDebugInfo,
  };
};

// Issue 23: Hook with memory leaks
export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(
        `Error reading localStorage key "${key}":`,
        error
      );
      return initialValue;
    }
  });

  // Issue 24: Function with side effects
  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error setting localStorage key "${key}":`,
        error
      );
    }
  };

  return [storedValue, setValue];
};

// Issue 25: Hook with performance issues
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
