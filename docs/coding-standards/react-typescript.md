# React and TypeScript Coding Standards

## Type Safety

### Props and State

- Always define explicit interfaces for component props
- Avoid using `any` type; use proper type definitions
- Use discriminated unions for complex state
- Props should be as specific as possible

```typescript
// ❌ Bad
interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

// ✅ Good
interface Props<T> {
  data: T;
  onUpdate: (data: T) => void;
}
```

### Context Usage

- Always provide default values for contexts
- Use type guards for undefined context values
- Wrap context values in useMemo to prevent unnecessary rerenders
- Define explicit types for context values

```typescript
// ❌ Bad
export const ThemeContext = createContext(undefined);

// ✅ Good
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

const defaultTheme: ThemeContextType = {
  isDarkMode: false,
  toggleTheme: () => {},
  theme: {
    /* ... */
  },
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultTheme);
```

## Performance

### Component Optimization

- Use React.memo() for components that receive stable props
- Memoize callback functions with useCallback
- Memoize complex calculations with useMemo
- Avoid inline object creation in render

```typescript
// ❌ Bad
<Component style={{ margin: '1rem' }} />;

// ✅ Good
const styles = { margin: '1rem' };
<Component style={styles} />;
```

### State Management

- Combine related state variables
- Use reducers for complex state logic
- Avoid redundant state updates
- Consider using context for global state

```typescript
// ❌ Bad
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<Data | null>(null);

// ✅ Good
interface State {
  isLoading: boolean;
  error: string | null;
  data: Data | null;
}

const [state, setState] = useState<State>({
  isLoading: false,
  error: null,
  data: null,
});
```

## Error Handling

### Type-Safe Error Handling

- Use type predicates for error checking
- Implement proper error boundaries
- Avoid swallowing errors
- Provide meaningful error messages

```typescript
// ❌ Bad
catch (err) {
  setError(err.message);
}

// ✅ Good
catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('An unexpected error occurred');
  }
}
```

## Component Structure

### File Organization

- One component per file
- Group related components in directories
- Use index files for exports
- Keep components focused and small

### Naming Conventions

- Use PascalCase for component names
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants
- Prefix custom hooks with "use"

## Testing

### Component Testing

- Test component behavior, not implementation
- Use React Testing Library
- Write accessible tests
- Test error states and loading states

```typescript
// ✅ Good Test Example
describe('DashboardCard', () => {
  it('should display loading state', () => {
    render(<DashboardCard isLoading data={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```
