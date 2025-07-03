# Data Fetching Patterns

## Custom Hooks Guidelines

### Type Safety

All data fetching hooks should be properly typed:

```typescript
// ❌ Bad - Generic type without constraints
function useDataFetching<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
}

// ✅ Good - Type constraints and proper error typing
interface DataResponse {
  id: string;
  [key: string]: unknown;
}

function useDataFetching<T extends DataResponse>(url: string) {
  const [data, setData] = useState<T | null>(null);
}
```

### State Management

1. Use Combined State Objects:

```typescript
// ❌ Bad - Separate states
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);

// ✅ Good - Combined state
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const [state, setState] = useState<FetchState<T>>({
  data: null,
  loading: false,
  error: null,
});
```

### Error Handling

1. Proper Error Types:

```typescript
// ❌ Bad - Generic error handling
catch (err) {
  setError(err as Error);
}

// ✅ Good - Specific error handling
catch (err) {
  if (err instanceof Error) {
    setError(err);
  } else if (axios.isAxiosError(err)) {
    setError(new Error(err.response?.data?.message || 'Network error'));
  } else {
    setError(new Error('An unknown error occurred'));
  }
}
```

### Caching Strategy

1. Implementation:

```typescript
interface Cache<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

const cache = new Map<string, Cache<unknown>>();

function isCacheValid<T>(cached: Cache<T>): boolean {
  return Date.now() - cached.timestamp < cached.expiresIn;
}
```

2. Usage:

```typescript
const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (cached && isCacheValid(cached)) {
    return cached.data as T;
  }
  return null;
};
```

### Request Cancellation

Always implement request cancellation:

```typescript
// ✅ Good - Request cancellation
const useDataFetching = <T>(url: string) => {
  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          signal: abortController.signal,
        });
        // Handle response
      } catch (err) {
        if (!axios.isCancel(err)) {
          // Handle error
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);
};
```

### Race Condition Prevention

Handle race conditions in async operations:

```typescript
// ✅ Good - Race condition prevention
const useDataFetching = <T>(url: string) => {
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      if (mountedRef.current) {
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      if (mountedRef.current) {
        // Handle error
      }
    }
  };
};
```

### Retry Logic

Implement proper retry logic for failed requests:

```typescript
// ✅ Good - Retry logic
const fetchWithRetry = async <T>(
  url: string,
  options: {
    maxRetries: number;
    retryDelay: number;
  }
): Promise<T> => {
  let lastError: Error | null = null;

  for (let i = 0; i < options.maxRetries; i++) {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (err) {
      lastError =
        err instanceof Error ? err : new Error('Unknown error');
      await new Promise((resolve) =>
        setTimeout(resolve, options.retryDelay * Math.pow(2, i))
      );
    }
  }

  throw lastError;
};
```

### Performance Optimization

1. Request Deduplication:

```typescript
const pendingRequests = new Map<string, Promise<unknown>>();

const deduplicatedFetch = <T>(url: string): Promise<T> => {
  const pending = pendingRequests.get(url) as Promise<T>;
  if (pending) return pending;

  const promise = axios
    .get<T>(url)
    .then((response) => response.data)
    .finally(() => {
      pendingRequests.delete(url);
    });

  pendingRequests.set(url, promise);
  return promise;
};
```
