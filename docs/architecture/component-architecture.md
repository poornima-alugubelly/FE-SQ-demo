# Component Architecture Guidelines

## Component Organization

### Directory Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   ├── features/         # Feature-specific components
│   └── layouts/          # Layout components
├── hooks/                # Custom hooks
├── contexts/             # React contexts
├── services/             # API services
├── utils/                # Utility functions
└── types/                # TypeScript types
```

## Component Patterns

### Compound Components

Use compound components for complex UI elements:

```typescript
// ✅ Good - Compound component pattern
const Card = {
  Root: styled(MUICard)({
    /* styles */
  }),
  Header: styled(CardHeader)({
    /* styles */
  }),
  Content: styled(CardContent)({
    /* styles */
  }),
  Actions: styled(CardActions)({
    /* styles */
  }),
};

// Usage
<Card.Root>
  <Card.Header title="Dashboard" />
  <Card.Content>
    <DashboardContent />
  </Card.Content>
  <Card.Actions>
    <Button>Action</Button>
  </Card.Actions>
</Card.Root>;
```

### Component Composition

Prefer composition over inheritance:

```typescript
// ❌ Bad - Inheritance
class SpecialButton extends Button {
  render() {
    return <button className="special">{this.props.children}</button>;
  }
}

// ✅ Good - Composition
const SpecialButton = ({ children, ...props }) => (
  <Button className="special" {...props}>
    {children}
  </Button>
);
```

### Higher-Order Components (HOCs)

Use HOCs for cross-cutting concerns:

```typescript
// ✅ Good - HOC pattern
const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback: React.ReactNode
) => {
  return class WithErrorBoundary extends React.Component<
    P,
    { hasError: boolean }
  > {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return fallback;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};
```

## State Management

### Local vs Global State

Guidelines for state placement:

1. Local State:

- UI state (loading, error, validation)
- Form state
- Component-specific data

2. Context State:

- Theme
- User preferences
- Authentication
- Shared UI state

3. Redux State:

- Application-wide data
- Complex state interactions
- Server cache
- Performance-critical state

### Context Optimization

```typescript
// ✅ Good - Split context by concern
const ThemeContext = createContext<Theme>(defaultTheme);
const AuthContext = createContext<Auth>(defaultAuth);

// ✅ Good - Context provider composition
const AppProviders: FC = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <FeatureProvider>{children}</FeatureProvider>
    </AuthProvider>
  </ThemeProvider>
);
```

## Performance Patterns

### Code Splitting

Use React.lazy and Suspense:

```typescript
// ✅ Good - Code splitting
const DashboardPage = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardPage />
    </Suspense>
  );
}
```

### Render Optimization

Implement proper memoization:

```typescript
// ✅ Good - Memoization patterns
const MemoizedComponent = React.memo(
  ({ data }) => <div>{data.map(renderItem)}</div>,
  (prev, next) => prev.data === next.data
);

const useCallback = (callback, deps) => {
  return React.useCallback(callback, deps);
};

const useMemoizedValue = (value, deps) => {
  return React.useMemo(() => value, deps);
};
```

## Testing Patterns

### Component Testing

Follow these testing patterns:

```typescript
// ✅ Good - Component test structure
describe('Component', () => {
  it('renders without crashing', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const onClickMock = jest.fn();
    render(<Component onClick={onClickMock} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
```

### Integration Testing

Test component integration:

```typescript
// ✅ Good - Integration test
describe('Feature', () => {
  it('works end-to-end', async () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <Feature />
        </AuthProvider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });
});
```
