// Bug 1: No type definitions for input/output
export const formatData = (data) => {
  // Bug 2: Unsafe type assertion
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    // Bug 3: Potential undefined access
    value: item.details.value,
    // Bug 4: Unsafe date handling
    date: new Date(item.timestamp).toLocaleDateString(),
  }));
};

// Bug 5: Function with side effects
export const sortAndFilterData = (items, filterKey, sortKey) => {
  // Bug 6: Mutating input parameter
  items.sort((a, b) => a[sortKey] - b[sortKey]);

  // Bug 7: Unsafe type checking
  return items.filter((item) => item[filterKey] !== undefined);
};

// Bug 8: Recursive function without proper base case
export const deepClone = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) return obj;

  // Bug 9: No handling of special object types
  const clone = Array.isArray(obj) ? [] : {};

  // Bug 10: Unsafe object key access
  for (const key in obj) {
    clone[key] = deepClone(obj[key]);
  }

  return clone;
};

// Bug 11: Memory-inefficient caching
const memoCache = new Map();

// Bug 12: Memoization without proper cache management
export const memoizedTransform = (
  data: any,
  transformFn: (data: any) => any
) => {
  const cacheKey = JSON.stringify(data);

  if (memoCache.has(cacheKey)) {
    return memoCache.get(cacheKey);
  }

  const result = transformFn(data);
  memoCache.set(cacheKey, result);
  return result;
};

// Bug 13: Async function without proper error handling
export const asyncTransform = async (data: any) => {
  const result = await Promise.all(
    data.map(async (item) => {
      // Simulating async transformation
      const transformed = await new Promise((resolve) =>
        setTimeout(() => resolve(item), 100)
      );
      return transformed;
    })
  );

  return result;
};
