import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';

// Bug 1: Props interface missing required validation
interface DashboardCardProps {
  title?: string;
  data: any; // Bug 2: Using 'any' type
  onUpdate?: (data: any) => void;
}

// Bug 3: Memoized component without proper dependency checks
export const DashboardCard = memo(
  ({
    title = 'Dashboard Item',
    data,
    onUpdate,
  }: DashboardCardProps) => {
    // Bug 4: Multiple state variables that could be combined
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [localData, setLocalData] = useState(data);

    // Bug 5: Theme context used without null check
    const themeContext = useTheme();

    // Bug 6: Effect with missing dependencies
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setLocalData(data);
          setError('');
        } catch (err) {
          // Bug 7: Error object type assertion without checking
          setError((err as Error).message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []); // Missing 'data' dependency

    // Bug 8: Event handler recreated on every render
    const handleUpdate = async () => {
      if (onUpdate) {
        // Bug 9: Unsafe type assertion
        onUpdate(localData as any);
      }
    };

    // Bug 10: Inline styles that should be themed
    return (
      <Card
        style={{
          backgroundColor: themeContext?.theme.background,
          margin: '1rem',
          minWidth: '300px',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            style={{ color: themeContext?.theme.primary }}
          >
            {title}
          </Typography>
          {isLoading && <Typography>Loading...</Typography>}
          {error && (
            // Bug 11: Error message displayed without sanitization
            <Typography
              color="error"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}
          {!isLoading && !error && (
            <Typography
              style={{ color: themeContext?.theme.secondary }}
            >
              {/* Bug 12: Potential undefined object access */}
              {localData?.value?.toString() || 'No data'}
            </Typography>
          )}
          <Button
            onClick={handleUpdate}
            // Bug 13: Inline styles and unsafe theme access
            style={{
              backgroundColor: themeContext?.theme.primary,
              color: themeContext?.theme.background,
              marginTop: '1rem',
            }}
          >
            Update
          </Button>
        </CardContent>
      </Card>
    );
  }
);
