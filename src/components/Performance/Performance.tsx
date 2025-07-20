import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  Card,
  Button,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';

// Issue 1: Global variable causing memory leaks
const globalData: number[] = [];

// Issue 2: Expensive calculation function
const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// Issue 3: Inefficient sorting algorithm
const bubbleSort = (arr: number[]): number[] => {
  const result = [...arr];
  for (const i of Array.from(
    { length: result.length },
    (_, index) => index
  )) {
    for (let j = 0; j < result.length - 1; j++) {
      if (result[j] > result[j + 1]) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }
  return result;
};

// Issue 4: Function with too many responsibilities
const processLargeDataset = (data: number[], operation: string) => {
  let result: number[] = [];

  // Issue 5: Inefficient array operations
  if (operation === 'sort') {
    result = bubbleSort(data);
  } else if (operation === 'filter') {
    result = data.filter((item) => item % 2 === 0);
  } else if (operation === 'map') {
    result = data.map((item) => item * 2);
  } else if (operation === 'reduce') {
    const sum = data.reduce((acc, item) => acc + item, 0);
    result = [sum];
  }

  // Issue 6: Global variable pollution
  globalData.push(...result);

  return result;
};

// Issue 7: Component with performance issues
export const Performance: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [processedData, setProcessedData] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [operation, setOperation] = useState('sort');
  const [fibonacciInput, setFibonacciInput] = useState(30);
  const [fibonacciResult, setFibonacciResult] = useState<
    number | null
  >(null);

  // Issue 8: Effect without cleanup causing memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Issue 9: Missing cleanup
    // return () => clearInterval(interval);
  }, []);

  // Issue 10: Expensive calculation in render
  const expensiveCalculation = useMemo(() => {
    // Issue 11: Unnecessary expensive operation
    return data.reduce((acc, item) => acc + Math.pow(item, 2), 0);
  }, [data]);

  // Issue 12: Callback without proper dependencies
  const generateData = useCallback((size: number) => {
    const newData: number[] = [];
    for (let i = 0; i < size; i++) {
      newData.push(Math.floor(Math.random() * 1000));
    }
    setData(newData);
  }, []); // Missing dependencies

  // Issue 13: Complex event handler
  const handleProcessData = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      // Issue 14: Blocking operation in main thread
      const result = processLargeDataset(data, operation);
      setProcessedData(result);

      // Issue 15: Simulated progress without real progress tracking
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Issue 16: Expensive operation in event handler
  const handleCalculateFibonacci = () => {
    // Issue 17: Blocking operation
    const result = fibonacci(fibonacciInput);
    setFibonacciResult(result);
  };

  // Issue 18: Inline styles and hardcoded values
  return (
    <Card
      style={{ padding: '20px', margin: '20px', maxWidth: '800px' }}
    >
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Performance Demo
      </Typography>

      <Box style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Data Generation</Typography>
        <Button
          onClick={() => generateData(1000)}
          variant="contained"
          style={{ marginRight: '10px' }}
        >
          Generate 1000 Items
        </Button>
        <Button
          onClick={() => generateData(10000)}
          variant="contained"
          style={{ marginRight: '10px' }}
        >
          Generate 10000 Items
        </Button>
        <Typography>
          Current data size: {data.length} items
        </Typography>
      </Box>

      <Box style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Data Processing</Typography>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="sort">Sort</option>
          <option value="filter">Filter Even Numbers</option>
          <option value="map">Double Values</option>
          <option value="reduce">Sum All Values</option>
        </select>

        <Button
          onClick={handleProcessData}
          disabled={isProcessing || data.length === 0}
          variant="contained"
        >
          {isProcessing ? 'Processing...' : 'Process Data'}
        </Button>

        {isProcessing && (
          <Box style={{ marginTop: '10px' }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography>{progress}% complete</Typography>
          </Box>
        )}

        {processedData.length > 0 && (
          <Typography style={{ marginTop: '10px' }}>
            Processed {processedData.length} items
          </Typography>
        )}
      </Box>

      <Box style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Fibonacci Calculator</Typography>
        <input
          type="number"
          value={fibonacciInput}
          onChange={(e) =>
            setFibonacciInput(parseInt(e.target.value) || 0)
          }
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <Button
          onClick={handleCalculateFibonacci}
          variant="contained"
        >
          Calculate Fibonacci
        </Button>
        {fibonacciResult !== null && (
          <Typography style={{ marginTop: '10px' }}>
            Fibonacci({fibonacciInput}) = {fibonacciResult}
          </Typography>
        )}
      </Box>

      {/* Issue 19: Expensive calculation displayed */}
      <Box style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Expensive Calculation</Typography>
        <Typography>
          Sum of squares: {expensiveCalculation}
        </Typography>
      </Box>

      {/* Issue 20: Debug information exposed */}
      <Box
        style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}
      >
        <Typography variant="h6">Debug Information</Typography>
        <div>Global data size: {globalData.length}</div>
        <div>
          Memory usage:{' '}
          {Math.round(
            (performance as any).memory?.usedJSHeapSize /
              1024 /
              1024 || 0
          )}{' '}
          MB
        </div>
        <div>Current progress: {progress}%</div>
        <div>Data sample: {data.slice(0, 5).join(', ')}...</div>
      </Box>
    </Card>
  );
};
