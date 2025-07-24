# Components Documentation

## Overview

This document provides comprehensive documentation for all UI components available in the project, including props, usage examples, styling options, and accessibility features.

## Table of Contents

- [Getting Started](#getting-started)
- [Layout Components](#layout-components)
- [Form Components](#form-components)
- [Data Display Components](#data-display-components)
- [Navigation Components](#navigation-components)
- [Feedback Components](#feedback-components)
- [Media Components](#media-components)
- [Utility Components](#utility-components)
- [Theming and Styling](#theming-and-styling)
- [Accessibility](#accessibility)

## Getting Started

### Installation

```bash
npm install your-component-library
```

### Basic Usage

```jsx
import { Button, Modal, DataTable } from 'your-component-library';
import 'your-component-library/dist/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary" size="large">
        Click me
      </Button>
    </div>
  );
}
```

### TypeScript Support

All components are fully typed with comprehensive TypeScript definitions:

```typescript
import { ButtonProps, ModalProps } from 'your-component-library';
```

## Layout Components

### `<Container>`

A responsive container component that centers content and applies consistent max-width constraints.

**Props:**
- `maxWidth` (string): Maximum width ('sm', 'md', 'lg', 'xl', 'full') (default: 'lg')
- `padding` (string|object): Padding values
- `center` (boolean): Center the container (default: true)
- `fluid` (boolean): Remove max-width constraints (default: false)
- `className` (string): Additional CSS classes
- `children` (ReactNode): Container content

**Example:**
```jsx
import { Container } from 'your-component-library';

function Layout() {
  return (
    <Container maxWidth="xl" padding="2rem">
      <h1>Welcome to our app</h1>
      <p>This content is contained and centered.</p>
    </Container>
  );
}
```

### `<Grid>`

A flexible grid system based on CSS Grid with responsive breakpoints.

**Props:**
- `columns` (number|object): Number of columns or responsive object
- `gap` (string|number): Gap between grid items
- `rows` (number|string): Number or size of rows
- `alignItems` (string): Vertical alignment
- `justifyContent` (string): Horizontal alignment
- `children` (ReactNode): Grid items

**Example:**
```jsx
import { Grid, GridItem } from 'your-component-library';

function ResponsiveLayout() {
  return (
    <Grid 
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} 
      gap="1rem"
    >
      <GridItem>Item 1</GridItem>
      <GridItem span={2}>Item 2 (spans 2 columns)</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
    </Grid>
  );
}
```

### `<Flex>`

A flexbox layout component with intuitive props.

**Props:**
- `direction` (string): Flex direction ('row', 'column', 'row-reverse', 'column-reverse')
- `wrap` (boolean|string): Flex wrap behavior
- `align` (string): Align items
- `justify` (string): Justify content
- `gap` (string|number): Gap between items
- `children` (ReactNode): Flex items

**Example:**
```jsx
import { Flex } from 'your-component-library';

function Header() {
  return (
    <Flex justify="space-between" align="center" padding="1rem">
      <div>Logo</div>
      <nav>Navigation</nav>
      <div>User Menu</div>
    </Flex>
  );
}
```

## Form Components

### `<Input>`

A versatile input component with validation and styling options.

**Props:**
- `type` (string): Input type ('text', 'email', 'password', 'number', etc.)
- `value` (string): Input value
- `onChange` (Function): Change handler
- `placeholder` (string): Placeholder text
- `disabled` (boolean): Disable input
- `required` (boolean): Mark as required
- `error` (string): Error message
- `helperText` (string): Helper text
- `startIcon` (ReactNode): Icon at start
- `endIcon` (ReactNode): Icon at end
- `size` (string): Size variant ('small', 'medium', 'large')
- `variant` (string): Style variant ('outlined', 'filled', 'standard')

**Example:**
```jsx
import { Input } from 'your-component-library';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <form>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
        startIcon={<EmailIcon />}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
        helperText="Password must be at least 8 characters"
      />
    </form>
  );
}
```

### `<Button>`

A customizable button component with multiple variants and states.

**Props:**
- `variant` (string): Button style ('primary', 'secondary', 'outline', 'ghost', 'danger')
- `size` (string): Button size ('small', 'medium', 'large')
- `disabled` (boolean): Disable button
- `loading` (boolean): Show loading state
- `fullWidth` (boolean): Full width button
- `startIcon` (ReactNode): Icon before text
- `endIcon` (ReactNode): Icon after text
- `onClick` (Function): Click handler
- `type` (string): Button type ('button', 'submit', 'reset')
- `children` (ReactNode): Button content

**Example:**
```jsx
import { Button } from 'your-component-library';

function ActionButtons() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleSubmit} loading={loading}>
        Submit
      </Button>
      <Button variant="outline" startIcon={<SaveIcon />}>
        Save Draft
      </Button>
      <Button variant="danger" size="small">
        Delete
      </Button>
    </div>
  );
}
```

### `<Select>`

A dropdown select component with search and multi-select capabilities.

**Props:**
- `options` (Array): Array of option objects
- `value` (any): Selected value(s)
- `onChange` (Function): Change handler
- `multiple` (boolean): Allow multiple selections
- `searchable` (boolean): Enable search/filter
- `placeholder` (string): Placeholder text
- `disabled` (boolean): Disable select
- `error` (string): Error message
- `loading` (boolean): Show loading state
- `clearable` (boolean): Allow clearing selection

**Example:**
```jsx
import { Select } from 'your-component-library';

function UserRoleSelect() {
  const [selectedRole, setSelectedRole] = useState('');

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Administrator' },
    { value: 'moderator', label: 'Moderator' }
  ];

  return (
    <Select
      options={roleOptions}
      value={selectedRole}
      onChange={setSelectedRole}
      placeholder="Select a role"
      searchable
      clearable
    />
  );
}
```

### `<FormField>`

A wrapper component that provides consistent layout and validation for form fields.

**Props:**
- `label` (string): Field label
- `required` (boolean): Mark as required
- `error` (string): Error message
- `helperText` (string): Helper text
- `children` (ReactNode): Form control
- `layout` (string): Layout style ('vertical', 'horizontal')

**Example:**
```jsx
import { FormField, Input, Select } from 'your-component-library';

function UserForm() {
  return (
    <form>
      <FormField
        label="Full Name"
        required
        helperText="Enter your first and last name"
      >
        <Input placeholder="John Doe" />
      </FormField>
      
      <FormField label="Country" required>
        <Select
          options={countryOptions}
          placeholder="Select your country"
        />
      </FormField>
    </form>
  );
}
```

## Data Display Components

### `<DataTable>`

A powerful table component with sorting, filtering, pagination, and selection.

**Props:**
- `data` (Array): Array of row objects
- `columns` (Array): Column definitions
- `sortable` (boolean): Enable sorting
- `filterable` (boolean): Enable filtering
- `pagination` (boolean|object): Pagination configuration
- `selection` (boolean|object): Row selection configuration
- `loading` (boolean): Show loading state
- `empty` (ReactNode): Empty state content
- `onRowClick` (Function): Row click handler
- `onSelectionChange` (Function): Selection change handler

**Column Definition:**
```typescript
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: object) => ReactNode;
  headerRender?: () => ReactNode;
}
```

**Example:**
```jsx
import { DataTable } from 'your-component-library';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: 80,
      sortable: true
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div>
          <strong>{value}</strong>
          <br />
          <small>{row.email}</small>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      filterable: true,
      render: (value) => (
        <Badge variant={value === 'admin' ? 'primary' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'lastActive',
      label: 'Last Active',
      sortable: true,
      render: (value) => formatRelativeTime(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      width: 120,
      render: (_, row) => (
        <ButtonGroup>
          <Button size="small" onClick={() => editUser(row.id)}>
            Edit
          </Button>
          <Button 
            size="small" 
            variant="danger" 
            onClick={() => deleteUser(row.id)}
          >
            Delete
          </Button>
        </ButtonGroup>
      )
    }
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      sortable
      filterable
      pagination={{
        pageSize: 10,
        showSizeChanger: true
      }}
      selection={{
        multiple: true,
        selectedRows,
        onChange: setSelectedRows
      }}
      onRowClick={(row) => console.log('Clicked:', row)}
    />
  );
}
```

### `<Card>`

A versatile card component for content organization.

**Props:**
- `variant` (string): Card style ('elevated', 'outlined', 'filled')
- `padding` (string|number): Card padding
- `hoverable` (boolean): Add hover effects
- `clickable` (boolean): Make card clickable
- `loading` (boolean): Show loading state
- `header` (ReactNode): Card header content
- `footer` (ReactNode): Card footer content
- `children` (ReactNode): Card body content

**Example:**
```jsx
import { Card, Button } from 'your-component-library';

function ProductCard({ product }) {
  return (
    <Card
      variant="elevated"
      hoverable
      header={
        <img 
          src={product.image} 
          alt={product.name}
          style={{ width: '100%', height: 200, objectFit: 'cover' }}
        />
      }
      footer={
        <Button fullWidth variant="primary">
          Add to Cart - ${product.price}
        </Button>
      }
    >
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div>
        <Badge>{product.category}</Badge>
        <Rating value={product.rating} readonly />
      </div>
    </Card>
  );
}
```

### `<Badge>`

A small status indicator component.

**Props:**
- `variant` (string): Badge style ('primary', 'secondary', 'success', 'warning', 'danger')
- `size` (string): Badge size ('small', 'medium', 'large')
- `dot` (boolean): Show as dot indicator
- `count` (number): Numeric count to display
- `max` (number): Maximum count before showing "+"
- `children` (ReactNode): Badge content

**Example:**
```jsx
import { Badge } from 'your-component-library';

function StatusBadges() {
  return (
    <div>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger" count={5} />
      <Badge dot variant="primary">
        Notifications
      </Badge>
    </div>
  );
}
```

## Navigation Components

### `<Navbar>`

A responsive navigation bar with dropdown support.

**Props:**
- `brand` (ReactNode): Brand/logo content
- `items` (Array): Navigation items
- `position` (string): Position ('fixed', 'sticky', 'static')
- `theme` (string): Color theme ('light', 'dark')
- `collapsible` (boolean): Enable mobile collapse
- `actions` (ReactNode): Action buttons/content

**Example:**
```jsx
import { Navbar } from 'your-component-library';

function AppNavbar() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    {
      label: 'Services',
      items: [
        { label: 'Consulting', href: '/consulting' },
        { label: 'Support', href: '/support' }
      ]
    },
    { label: 'About', href: '/about' }
  ];

  return (
    <Navbar
      brand={<img src="/logo.png" alt="Company" />}
      items={navItems}
      position="sticky"
      theme="dark"
      actions={
        <div>
          <Button variant="outline">Login</Button>
          <Button variant="primary">Sign Up</Button>
        </div>
      }
    />
  );
}
```

### `<Breadcrumb>`

A breadcrumb navigation component.

**Props:**
- `items` (Array): Breadcrumb items
- `separator` (ReactNode): Custom separator
- `maxItems` (number): Maximum items before collapse

**Example:**
```jsx
import { Breadcrumb } from 'your-component-library';

function PageBreadcrumb() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Smartphones' } // Current page (no href)
  ];

  return <Breadcrumb items={items} />;
}
```

### `<Tabs>`

A tab navigation component with keyboard support.

**Props:**
- `items` (Array): Tab items
- `activeTab` (string): Active tab key
- `onChange` (Function): Tab change handler
- `variant` (string): Tab style ('line', 'card', 'pill')
- `position` (string): Tab position ('top', 'bottom', 'left', 'right')

**Example:**
```jsx
import { Tabs } from 'your-component-library';

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabItems = [
    {
      key: 'profile',
      label: 'Profile',
      content: <ProfileForm />
    },
    {
      key: 'security',
      label: 'Security',
      content: <SecuritySettings />
    },
    {
      key: 'notifications',
      label: 'Notifications',
      content: <NotificationSettings />
    }
  ];

  return (
    <Tabs
      items={tabItems}
      activeTab={activeTab}
      onChange={setActiveTab}
      variant="line"
    />
  );
}
```

## Feedback Components

### `<Modal>`

A modal dialog component with customizable content and actions.

**Props:**
- `open` (boolean): Modal visibility
- `onClose` (Function): Close handler
- `title` (string): Modal title
- `size` (string): Modal size ('small', 'medium', 'large', 'fullscreen')
- `closable` (boolean): Show close button
- `maskClosable` (boolean): Close on mask click
- `footer` (ReactNode): Custom footer content
- `children` (ReactNode): Modal content

**Example:**
```jsx
import { Modal, Button } from 'your-component-library';

function ConfirmationModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Delete Item
      </Button>
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Deletion"
        size="small"
        footer={
          <div>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>
    </>
  );
}
```

### `<Alert>`

An alert component for displaying important messages.

**Props:**
- `type` (string): Alert type ('info', 'success', 'warning', 'error')
- `title` (string): Alert title
- `closable` (boolean): Show close button
- `onClose` (Function): Close handler
- `icon` (boolean|ReactNode): Show icon or custom icon
- `actions` (ReactNode): Action buttons
- `children` (ReactNode): Alert content

**Example:**
```jsx
import { Alert } from 'your-component-library';

function NotificationAlerts() {
  return (
    <div>
      <Alert type="success" title="Success!" closable>
        Your changes have been saved successfully.
      </Alert>
      
      <Alert 
        type="error" 
        title="Error occurred"
        actions={
          <Button size="small" variant="outline">
            Retry
          </Button>
        }
      >
        Failed to save changes. Please try again.
      </Alert>
    </div>
  );
}
```

### `<Toast>`

A toast notification system.

**Usage:**
```jsx
import { toast } from 'your-component-library';

function ToastExamples() {
  const showToasts = () => {
    toast.success('Operation completed successfully!');
    toast.error('Something went wrong');
    toast.warning('Please check your input');
    toast.info('New updates available');
    
    // Custom toast with options
    toast.custom(
      <div>
        <strong>Custom Toast</strong>
        <p>With custom content</p>
      </div>,
      {
        duration: 5000,
        position: 'top-right'
      }
    );
  };

  return (
    <Button onClick={showToasts}>
      Show Toasts
    </Button>
  );
}
```

### `<LoadingSpinner>`

A loading indicator component.

**Props:**
- `size` (string|number): Spinner size
- `color` (string): Spinner color
- `overlay` (boolean): Show as overlay
- `text` (string): Loading text
- `variant` (string): Spinner style ('circle', 'dots', 'bars')

**Example:**
```jsx
import { LoadingSpinner } from 'your-component-library';

function LoadingStates() {
  return (
    <div>
      <LoadingSpinner size="small" />
      <LoadingSpinner size="large" text="Loading..." />
      <LoadingSpinner overlay variant="dots" />
    </div>
  );
}
```

## Media Components

### `<Image>`

An enhanced image component with lazy loading and error handling.

**Props:**
- `src` (string): Image source
- `alt` (string): Alt text
- `lazy` (boolean): Enable lazy loading
- `placeholder` (ReactNode): Loading placeholder
- `fallback` (ReactNode): Error fallback
- `aspectRatio` (string): Aspect ratio ('1:1', '16:9', '4:3', etc.)
- `objectFit` (string): Object fit behavior

**Example:**
```jsx
import { Image } from 'your-component-library';

function PhotoGallery() {
  return (
    <div>
      <Image
        src="/hero-image.jpg"
        alt="Hero image"
        aspectRatio="16:9"
        lazy
        placeholder={<LoadingSpinner />}
        fallback={<div>Failed to load image</div>}
      />
    </div>
  );
}
```

### `<Avatar>`

A user avatar component with fallbacks.

**Props:**
- `src` (string): Avatar image source
- `name` (string): User name for initials fallback
- `size` (string|number): Avatar size
- `shape` (string): Avatar shape ('circle', 'square')
- `status` (string): Online status indicator
- `badge` (ReactNode): Badge overlay

**Example:**
```jsx
import { Avatar } from 'your-component-library';

function UserProfile() {
  return (
    <div>
      <Avatar
        src="/user-avatar.jpg"
        name="John Doe"
        size="large"
        status="online"
        badge={<Badge count={3} />}
      />
    </div>
  );
}
```

## Utility Components

### `<Portal>`

Renders children in a different part of the DOM.

**Props:**
- `container` (Element): Target container
- `children` (ReactNode): Content to portal

**Example:**
```jsx
import { Portal } from 'your-component-library';

function FloatingButton() {
  return (
    <Portal container={document.body}>
      <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Button variant="primary" shape="circle">
          +
        </Button>
      </div>
    </Portal>
  );
}
```

### `<ErrorBoundary>`

Catches and displays JavaScript errors in component tree.

**Props:**
- `fallback` (ReactNode): Error fallback UI
- `onError` (Function): Error handler
- `children` (ReactNode): Protected content

**Example:**
```jsx
import { ErrorBoundary } from 'your-component-library';

function App() {
  return (
    <ErrorBoundary
      fallback={
        <div>
          <h2>Something went wrong</h2>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error('Error caught:', error, errorInfo);
        // Send to error reporting service
      }}
    >
      <MainApp />
    </ErrorBoundary>
  );
}
```

## Theming and Styling

### Theme Provider

Wrap your app with the theme provider to enable theming:

```jsx
import { ThemeProvider, createTheme } from 'your-component-library';

const theme = createTheme({
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem'
    }
  },
  spacing: {
    unit: 8, // 8px base unit
    small: 1, // 8px
    medium: 2, // 16px
    large: 3 // 24px
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Custom Styling

Components accept custom styles through the `style` and `className` props:

```jsx
<Button
  className="custom-button"
  style={{ marginTop: '1rem' }}
>
  Styled Button
</Button>
```

### CSS-in-JS Support

Components work with popular CSS-in-JS libraries:

```jsx
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 12px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;
```

## Accessibility

All components are built with accessibility in mind and include:

- **ARIA attributes**: Proper ARIA labels, roles, and states
- **Keyboard navigation**: Full keyboard support where applicable
- **Focus management**: Logical focus order and visible focus indicators
- **Screen reader support**: Semantic HTML and descriptive text
- **Color contrast**: WCAG AA compliant color combinations

### Accessibility Props

Many components accept accessibility-related props:

```jsx
<Button
  aria-label="Close dialog"
  aria-describedby="close-help-text"
>
  ×
</Button>

<Input
  aria-label="Search"
  aria-describedby="search-help"
  role="searchbox"
/>
```

### Testing Accessibility

Use the included accessibility testing utilities:

```jsx
import { checkA11y } from 'your-component-library/testing';

test('component is accessible', async () => {
  const { container } = render(<MyComponent />);
  await checkA11y(container);
});
```

## Best Practices

1. **Performance**: Use React.memo for expensive components
2. **Props**: Use TypeScript for better development experience
3. **Testing**: Write comprehensive tests for component behavior
4. **Styling**: Use the theme system for consistent design
5. **Accessibility**: Always test with screen readers and keyboard navigation

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)