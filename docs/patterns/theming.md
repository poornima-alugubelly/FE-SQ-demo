# Theming System Guidelines

## Theme Structure

Our application uses a consistent theming system based on Material-UI with custom extensions. All components must follow these theming guidelines to maintain visual consistency.

### Theme Interface

```typescript
interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
}
```

### Theme Usage

#### Component Styling

Always use theme values instead of hardcoded colors or spacing:

```typescript
// ❌ Bad
const styles = {
  backgroundColor: '#ffffff',
  margin: '1rem',
};

// ✅ Good
const styles = {
  backgroundColor: theme.background,
  margin: theme.spacing.medium,
};
```

#### Theme Context Usage

Components should access theme through the ThemeContext using our custom hook:

```typescript
// ❌ Bad - Direct context usage without error handling
const theme = useContext(ThemeContext);

// ✅ Good - Using our typed hook with error handling
const { theme, isDarkMode } = useTheme();
```

### Performance Considerations

1. Theme Object Stability

- Theme objects should be memoized
- Prevent unnecessary re-renders
- Use stable references for theme values

```typescript
// ❌ Bad - New object on every render
const theme = {
  primary: isDarkMode ? '#000' : '#fff',
};

// ✅ Good - Memoized theme object
const theme = useMemo(
  () => ({
    primary: isDarkMode ? '#000' : '#fff',
  }),
  [isDarkMode]
);
```

2. Context Optimization

- Minimize theme context updates
- Split theme into logical sub-contexts if needed
- Use selective context consumption

### Dark Mode Implementation

The dark mode toggle should:

1. Persist user preference
2. Respect system preferences
3. Update smoothly without flickering
4. Maintain accessibility standards

```typescript
// Example dark mode implementation
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved
      ? JSON.parse(saved)
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};
```

## Component Guidelines

### Material-UI Integration

1. Use MUI's styling solution:

```typescript
// ✅ Good - Using MUI's styling
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.background,
  margin: theme.spacing.medium,
}));
```

2. Theme Extension:

```typescript
// Extend MUI theme
declare module '@mui/material/styles' {
  interface Theme {
    custom: CustomTheme;
  }
  interface ThemeOptions {
    custom?: CustomTheme;
  }
}
```

### Accessibility Requirements

1. Color Contrast

- Maintain WCAG 2.1 AA standard
- Test all color combinations
- Provide sufficient contrast in both modes

2. Focus Indicators

- Visible focus indicators in all themes
- Consistent focus styles
- High contrast focus indicators

```typescript
// ✅ Good - Accessible focus styles
const StyledButton = styled(Button)(({ theme }) => ({
  '&:focus-visible': {
    outline: `3px solid ${theme.primary}`,
    outlineOffset: '2px',
  },
}));
```
