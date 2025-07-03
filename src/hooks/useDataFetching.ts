import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Bug 1: Generic type parameter without constraints
export function useDataFetching<T>(url: string) {
  // Bug 2: Multiple state variables that could be combined into one
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bug 3: Cache implementation with potential memory leak
  const cache: { [key: string]: T } = {};

  // Bug 4: Callback without proper dependency array
  const fetchData = useCallback(async () => {
    // Bug 5: No request cancellation on unmount
    setLoading(true);
    try {
      // Bug 6: Not checking cache before fetching
      const response = await axios.get(url);
      // Bug 7: Unsafe type assertion
      const result = response.data as T;

      // Bug 8: Cache mutation without proper state management
      cache[url] = result;
      setData(result);
      setError(null);
    } catch (err) {
      // Bug 9: Error handling without proper type checking
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [url]); // Bug 10: Missing cache dependency

  // Bug 11: Effect with race condition potential
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Bug 12: Returned object creates new reference on every render
  return {
    data,
    loading,
    error,
    refetch: fetchData,
    // Bug 13: Unsafe direct cache access
    getCached: (key: string) => cache[key],
  };
}
