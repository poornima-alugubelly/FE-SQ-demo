import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';

// Issue 1: Complex interface with optional properties
interface DataItem {
  id: number;
  name: string;
  value?: number;
  category?: string;
  status?: 'active' | 'inactive';
  metadata?: {
    created?: Date;
    updated?: Date;
    tags?: string[];
  };
}

// Issue 2: Global variable that could cause memory leaks
const globalDataCache: DataItem[] = [];

// Issue 3: Function with too many responsibilities
const processData = (
  data: DataItem[],
  filter: string,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
) => {
  // Issue 4: Nested loops causing performance issues
  let filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category?.toLowerCase().includes(filter.toLowerCase())
  );

  // Issue 5: Complex sorting logic
  filteredData.sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'value') {
      const aVal = a.value || 0;
      const bVal = b.value || 0;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    } else if (sortBy === 'category') {
      const aCat = a.category || '';
      const bCat = b.category || '';
      return sortOrder === 'asc'
        ? aCat.localeCompare(bCat)
        : bCat.localeCompare(aCat);
    }
    return 0;
  });

  return filteredData;
};

// Issue 6: Component with too many props
interface DataTableProps {
  data: DataItem[];
  onRowClick?: (item: DataItem) => void;
  onRowEdit?: (item: DataItem) => void;
  onRowDelete?: (item: DataItem) => void;
  onBulkAction?: (items: DataItem[]) => void;
  showPagination?: boolean;
  pageSize?: number;
  showSearch?: boolean;
  showSorting?: boolean;
  showFilters?: boolean;
  theme?: 'light' | 'dark';
  customStyles?: React.CSSProperties;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  onRowClick,
  onRowEdit,
  onRowDelete,
  onBulkAction,
  showPagination = true,
  pageSize = 10,
  showSearch = true,
  showSorting = true,
  showFilters = true,
  theme = 'light',
  customStyles,
}) => {
  // Issue 7: Too many state variables
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [localData, setLocalData] = useState<DataItem[]>(data);

  // Issue 8: Effect with complex dependencies causing unnecessary re-renders
  useEffect(() => {
    // Issue 9: Expensive operation in effect
    const processedData = processData(
      localData,
      searchTerm,
      sortBy,
      sortOrder
    );
    setFilteredData(processedData);

    // Issue 10: Global cache pollution
    globalDataCache.push(...processedData);
  }, [localData, searchTerm, sortBy, sortOrder]);

  // Issue 11: Callback without proper dependencies
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset pagination
  }, []); // Missing dependencies

  // Issue 12: Complex event handler
  const handleRowClick = (item: DataItem) => {
    if (onRowClick) {
      onRowClick(item);
    }

    // Issue 13: Side effect in event handler
    console.log(`Row clicked: ${item.name}`);
  };

  // Issue 15: Function with multiple responsibilities
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }

    // Issue 16: Unnecessary state update
    setCurrentPage(1);
  };

  // Issue 17: Complex calculation in render
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Issue 18: Inline styles and hardcoded values
  const tableStyles = {
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
    ...customStyles,
  };

  // Issue 19: Complex conditional rendering
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        Data Table ({filteredData.length} items)
      </Typography>

      {/* Issue 20: Search input without debouncing */}
      {showSearch && (
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
          margin="normal"
          style={{ marginBottom: '20px' }}
        />
      )}

      {/* Issue 21: Table without proper accessibility */}
      <TableContainer component={Paper} style={tableStyles}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Issue 22: Hardcoded column headers */}
              <TableCell
                onClick={() => showSorting && handleSort('name')}
                style={{
                  cursor: showSorting ? 'pointer' : 'default',
                }}
              >
                Name{' '}
                {sortBy === 'name' &&
                  (sortOrder === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell
                onClick={() => showSorting && handleSort('value')}
                style={{
                  cursor: showSorting ? 'pointer' : 'default',
                }}
              >
                Value{' '}
                {sortBy === 'value' &&
                  (sortOrder === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell
                onClick={() => showSorting && handleSort('category')}
                style={{
                  cursor: showSorting ? 'pointer' : 'default',
                }}
              >
                Category{' '}
                {sortBy === 'category' &&
                  (sortOrder === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Issue 23: Missing key prop in map */}
            {currentData.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => handleRowClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value || 'N/A'}</TableCell>
                <TableCell>
                  {item.category || 'Uncategorized'}
                </TableCell>
                <TableCell>
                  {/* Issue 24: Inline event handlers */}
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowEdit?.(item);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowDelete?.(item);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Issue 25: Pagination without proper validation */}
      {showPagination && totalPages > 1 && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <span style={{ margin: '0 20px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Issue 26: Debug information in production */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            marginTop: '20px',
            fontSize: '12px',
            color: '#666',
          }}
        >
          Debug: Showing {currentData.length} of {filteredData.length}{' '}
          items
        </div>
      )}
    </div>
  );
};
