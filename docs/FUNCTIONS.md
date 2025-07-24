# Functions Documentation

## Overview

This document provides detailed documentation for all utility functions, helper methods, and standalone functions available in the project.

## Table of Contents

- [Data Processing Functions](#data-processing-functions)
- [Validation Functions](#validation-functions)
- [Transformation Functions](#transformation-functions)
- [Utility Functions](#utility-functions)
- [Math and Calculation Functions](#math-and-calculation-functions)
- [Date and Time Functions](#date-and-time-functions)
- [String Manipulation Functions](#string-manipulation-functions)
- [Array and Object Functions](#array-and-object-functions)

## Data Processing Functions

### `processData(data, options)`

Processes raw data according to specified options and transformations.

**Parameters:**
- `data` (Array|Object): The raw data to process
- `options` (Object): Processing options
  - `normalize` (boolean): Normalize data values (default: false)
  - `sort` (string): Sort field
  - `filter` (Function): Filter function
  - `transform` (Function): Transform function

**Returns:**
- `Array|Object`: Processed data

**Example:**
```javascript
import { processData } from './utils/data';

const rawData = [
  { name: 'John', age: 30, score: 85 },
  { name: 'Jane', age: 25, score: 92 },
  { name: 'Bob', age: 35, score: 78 }
];

const processed = processData(rawData, {
  normalize: true,
  sort: 'score',
  filter: item => item.age >= 25,
  transform: item => ({
    ...item,
    grade: item.score >= 90 ? 'A' : item.score >= 80 ? 'B' : 'C'
  })
});

console.log(processed);
// [
//   { name: 'Jane', age: 25, score: 92, grade: 'A' },
//   { name: 'John', age: 30, score: 85, grade: 'B' },
//   { name: 'Bob', age: 35, score: 78, grade: 'C' }
// ]
```

### `aggregateData(data, groupBy, aggregations)`

Aggregates data by specified fields with various aggregation functions.

**Parameters:**
- `data` (Array): Array of objects to aggregate
- `groupBy` (string|Array): Field(s) to group by
- `aggregations` (Object): Aggregation functions
  - `sum` (Array): Fields to sum
  - `avg` (Array): Fields to average
  - `count` (boolean): Include count
  - `min` (Array): Fields to find minimum
  - `max` (Array): Fields to find maximum

**Returns:**
- `Array`: Aggregated data

**Example:**
```javascript
import { aggregateData } from './utils/data';

const salesData = [
  { region: 'North', product: 'A', sales: 100, units: 10 },
  { region: 'North', product: 'B', sales: 150, units: 15 },
  { region: 'South', product: 'A', sales: 200, units: 20 },
  { region: 'South', product: 'B', sales: 120, units: 12 }
];

const aggregated = aggregateData(salesData, 'region', {
  sum: ['sales', 'units'],
  avg: ['sales'],
  count: true
});

console.log(aggregated);
// [
//   { 
//     region: 'North', 
//     sales_sum: 250, 
//     units_sum: 25, 
//     sales_avg: 125, 
//     count: 2 
//   },
//   { 
//     region: 'South', 
//     sales_sum: 320, 
//     units_sum: 32, 
//     sales_avg: 160, 
//     count: 2 
//   }
// ]
```

## Validation Functions

### `validateSchema(data, schema)`

Validates data against a comprehensive schema with detailed error reporting.

**Parameters:**
- `data` (Object): Data to validate
- `schema` (Object): Validation schema definition

**Schema Options:**
- `type` (string): Data type ('string', 'number', 'boolean', 'array', 'object', 'email', 'url', 'date')
- `required` (boolean): Whether field is required
- `minLength`/`maxLength` (number): String length constraints
- `min`/`max` (number): Numeric value constraints
- `pattern` (RegExp): Regular expression pattern
- `enum` (Array): Allowed values
- `custom` (Function): Custom validation function

**Returns:**
- `Object`: Validation result
  - `isValid` (boolean): Overall validation status
  - `errors` (Array): Detailed error messages
  - `warnings` (Array): Non-critical warnings

**Example:**
```javascript
import { validateSchema } from './utils/validation';

const userSchema = {
  username: {
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/
  },
  email: {
    type: 'email',
    required: true
  },
  age: {
    type: 'number',
    required: false,
    min: 13,
    max: 120
  },
  role: {
    type: 'string',
    enum: ['user', 'admin', 'moderator'],
    required: true
  },
  profile: {
    type: 'object',
    properties: {
      bio: { type: 'string', maxLength: 500 },
      website: { type: 'url', required: false }
    }
  }
};

const userData = {
  username: 'john_doe',
  email: 'john@example.com',
  age: 25,
  role: 'user',
  profile: {
    bio: 'Software developer',
    website: 'https://johndoe.com'
  }
};

const result = validateSchema(userData, userSchema);
console.log(result);
// {
//   isValid: true,
//   errors: [],
//   warnings: []
// }
```

### `sanitizeInput(input, options)`

Sanitizes user input to prevent security issues and ensure data consistency.

**Parameters:**
- `input` (any): Input to sanitize
- `options` (Object): Sanitization options
  - `trimWhitespace` (boolean): Remove leading/trailing whitespace
  - `removeHtml` (boolean): Strip HTML tags
  - `escapeHtml` (boolean): Escape HTML entities
  - `maxLength` (number): Maximum string length
  - `allowedChars` (RegExp): Allowed character pattern

**Returns:**
- `any`: Sanitized input

**Example:**
```javascript
import { sanitizeInput } from './utils/validation';

const userInput = '  <script>alert("xss")</script>Hello World!  ';

const sanitized = sanitizeInput(userInput, {
  trimWhitespace: true,
  removeHtml: true,
  maxLength: 100
});

console.log(sanitized); // "Hello World!"
```

## Transformation Functions

### `transformData(data, transformations)`

Applies a series of transformations to data using a pipeline approach.

**Parameters:**
- `data` (any): Data to transform
- `transformations` (Array): Array of transformation functions or objects

**Returns:**
- `any`: Transformed data

**Example:**
```javascript
import { transformData } from './utils/transform';

const rawData = {
  firstName: 'john',
  lastName: 'doe',
  email: 'JOHN.DOE@EXAMPLE.COM',
  birthDate: '1990-01-01'
};

const transformations = [
  // Capitalize names
  data => ({
    ...data,
    firstName: data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1),
    lastName: data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1)
  }),
  // Normalize email
  data => ({
    ...data,
    email: data.email.toLowerCase()
  }),
  // Add computed fields
  data => ({
    ...data,
    fullName: `${data.firstName} ${data.lastName}`,
    age: new Date().getFullYear() - new Date(data.birthDate).getFullYear()
  })
];

const transformed = transformData(rawData, transformations);
console.log(transformed);
// {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@example.com',
//   birthDate: '1990-01-01',
//   fullName: 'John Doe',
//   age: 34
// }
```

### `mapDataStructure(data, mapping)`

Maps data from one structure to another using field mapping definitions.

**Parameters:**
- `data` (Object|Array): Source data
- `mapping` (Object): Field mapping configuration

**Returns:**
- `Object|Array`: Mapped data structure

**Example:**
```javascript
import { mapDataStructure } from './utils/transform';

const apiData = {
  user_id: '123',
  first_name: 'John',
  last_name: 'Doe',
  email_address: 'john@example.com',
  created_timestamp: '2023-01-01T00:00:00Z'
};

const mapping = {
  id: 'user_id',
  name: data => `${data.first_name} ${data.last_name}`,
  email: 'email_address',
  createdAt: data => new Date(data.created_timestamp)
};

const mapped = mapDataStructure(apiData, mapping);
console.log(mapped);
// {
//   id: '123',
//   name: 'John Doe',
//   email: 'john@example.com',
//   createdAt: Date object
// }
```

## Utility Functions

### `debounce(func, delay, options)`

Creates a debounced version of a function that delays execution until after a specified delay.

**Parameters:**
- `func` (Function): Function to debounce
- `delay` (number): Delay in milliseconds
- `options` (Object): Debounce options
  - `leading` (boolean): Execute on leading edge
  - `trailing` (boolean): Execute on trailing edge
  - `maxWait` (number): Maximum delay

**Returns:**
- `Function`: Debounced function

**Example:**
```javascript
import { debounce } from './utils/common';

const searchAPI = (query) => {
  console.log('Searching for:', query);
  // API call logic
};

const debouncedSearch = debounce(searchAPI, 300, {
  leading: false,
  trailing: true
});

// Usage in a search input handler
document.getElementById('search').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### `throttle(func, limit)`

Creates a throttled version of a function that limits execution frequency.

**Parameters:**
- `func` (Function): Function to throttle
- `limit` (number): Time limit in milliseconds

**Returns:**
- `Function`: Throttled function

**Example:**
```javascript
import { throttle } from './utils/common';

const handleScroll = () => {
  console.log('Scroll position:', window.scrollY);
};

const throttledScroll = throttle(handleScroll, 100);

window.addEventListener('scroll', throttledScroll);
```

### `memoize(func, keyGenerator)`

Creates a memoized version of a function that caches results based on arguments.

**Parameters:**
- `func` (Function): Function to memoize
- `keyGenerator` (Function): Optional key generator for cache keys

**Returns:**
- `Function`: Memoized function with cache methods

**Example:**
```javascript
import { memoize } from './utils/common';

const expensiveCalculation = (n) => {
  console.log('Computing for:', n);
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += Math.random();
  }
  return result;
};

const memoizedCalc = memoize(expensiveCalculation);

console.log(memoizedCalc(100)); // Computes and caches
console.log(memoizedCalc(100)); // Returns cached result
console.log(memoizedCalc.cache.size); // 1

// Clear cache
memoizedCalc.cache.clear();
```

## Math and Calculation Functions

### `calculatePercentage(value, total, precision)`

Calculates percentage with specified precision.

**Parameters:**
- `value` (number): The value
- `total` (number): The total
- `precision` (number): Decimal places (default: 2)

**Returns:**
- `number`: Percentage value

**Example:**
```javascript
import { calculatePercentage } from './utils/math';

const percentage = calculatePercentage(75, 300, 1);
console.log(percentage); // 25.0
```

### `roundToDecimal(number, decimals)`

Rounds a number to specified decimal places.

**Parameters:**
- `number` (number): Number to round
- `decimals` (number): Number of decimal places

**Returns:**
- `number`: Rounded number

### `generateRange(start, end, step)`

Generates an array of numbers within a range.

**Parameters:**
- `start` (number): Start value
- `end` (number): End value
- `step` (number): Step increment (default: 1)

**Returns:**
- `Array<number>`: Array of numbers

**Example:**
```javascript
import { generateRange } from './utils/math';

const range = generateRange(1, 10, 2);
console.log(range); // [1, 3, 5, 7, 9]
```

## Date and Time Functions

### `formatDate(date, format, locale)`

Formats a date according to specified format and locale.

**Parameters:**
- `date` (Date|string): Date to format
- `format` (string): Format string ('ISO', 'US', 'EU', or custom)
- `locale` (string): Locale code (default: 'en-US')

**Returns:**
- `string`: Formatted date string

**Example:**
```javascript
import { formatDate } from './utils/date';

const date = new Date('2023-12-25');

console.log(formatDate(date, 'US')); // "12/25/2023"
console.log(formatDate(date, 'EU')); // "25/12/2023"
console.log(formatDate(date, 'ISO')); // "2023-12-25"
console.log(formatDate(date, 'MMM DD, YYYY')); // "Dec 25, 2023"
```

### `getRelativeTime(date, baseDate)`

Gets relative time string (e.g., "2 hours ago", "in 3 days").

**Parameters:**
- `date` (Date|string): Target date
- `baseDate` (Date): Base date for comparison (default: now)

**Returns:**
- `string`: Relative time string

**Example:**
```javascript
import { getRelativeTime } from './utils/date';

const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

console.log(getRelativeTime(pastDate)); // "2 hours ago"
console.log(getRelativeTime(futureDate)); // "in 3 days"
```

## String Manipulation Functions

### `slugify(text, options)`

Converts text to URL-friendly slug.

**Parameters:**
- `text` (string): Text to slugify
- `options` (Object): Slugify options
  - `separator` (string): Separator character (default: '-')
  - `lowercase` (boolean): Convert to lowercase (default: true)
  - `maxLength` (number): Maximum length

**Returns:**
- `string`: Slugified text

**Example:**
```javascript
import { slugify } from './utils/string';

const title = "How to Build Amazing APIs in 2023!";
const slug = slugify(title);
console.log(slug); // "how-to-build-amazing-apis-in-2023"
```

### `truncateText(text, length, options)`

Truncates text to specified length with ellipsis.

**Parameters:**
- `text` (string): Text to truncate
- `length` (number): Maximum length
- `options` (Object): Truncation options
  - `ellipsis` (string): Ellipsis character (default: '...')
  - `wordBoundary` (boolean): Respect word boundaries

**Returns:**
- `string`: Truncated text

**Example:**
```javascript
import { truncateText } from './utils/string';

const longText = "This is a very long text that needs to be truncated";
const truncated = truncateText(longText, 30, { wordBoundary: true });
console.log(truncated); // "This is a very long text..."
```

## Array and Object Functions

### `groupBy(array, keyOrFunc)`

Groups array items by a key or function result.

**Parameters:**
- `array` (Array): Array to group
- `keyOrFunc` (string|Function): Grouping key or function

**Returns:**
- `Object`: Grouped object

**Example:**
```javascript
import { groupBy } from './utils/array';

const users = [
  { name: 'John', role: 'admin', age: 30 },
  { name: 'Jane', role: 'user', age: 25 },
  { name: 'Bob', role: 'admin', age: 35 }
];

const byRole = groupBy(users, 'role');
console.log(byRole);
// {
//   admin: [{ name: 'John', role: 'admin', age: 30 }, { name: 'Bob', role: 'admin', age: 35 }],
//   user: [{ name: 'Jane', role: 'user', age: 25 }]
// }

const byAgeGroup = groupBy(users, user => user.age < 30 ? 'young' : 'mature');
console.log(byAgeGroup);
// {
//   young: [{ name: 'Jane', role: 'user', age: 25 }],
//   mature: [{ name: 'John', role: 'admin', age: 30 }, { name: 'Bob', role: 'admin', age: 35 }]
// }
```

### `deepMerge(...objects)`

Deeply merges multiple objects.

**Parameters:**
- `...objects` (Object): Objects to merge

**Returns:**
- `Object`: Merged object

**Example:**
```javascript
import { deepMerge } from './utils/object';

const obj1 = {
  a: 1,
  b: { c: 2, d: 3 },
  e: [1, 2]
};

const obj2 = {
  b: { d: 4, f: 5 },
  e: [3, 4],
  g: 6
};

const merged = deepMerge(obj1, obj2);
console.log(merged);
// {
//   a: 1,
//   b: { c: 2, d: 4, f: 5 },
//   e: [3, 4],
//   g: 6
// }
```

### `pick(object, keys)`

Creates new object with only specified keys.

**Parameters:**
- `object` (Object): Source object
- `keys` (Array<string>): Keys to pick

**Returns:**
- `Object`: New object with picked keys

**Example:**
```javascript
import { pick } from './utils/object';

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret',
  role: 'admin'
};

const publicUser = pick(user, ['id', 'name', 'email']);
console.log(publicUser);
// { id: 1, name: 'John', email: 'john@example.com' }
```

## Error Handling

All functions include comprehensive error handling and will throw descriptive errors for invalid inputs:

```javascript
import { validateSchema } from './utils/validation';

try {
  const result = validateSchema(invalidData, schema);
} catch (error) {
  if (error.name === 'ValidationError') {
    console.log('Validation failed:', error.details);
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## Performance Notes

- Functions like `memoize` and `debounce` should be created once and reused
- Use `throttle` for high-frequency events like scroll or resize
- `deepMerge` can be expensive for large objects - consider shallow merge alternatives
- `groupBy` creates new arrays for each group - consider memory usage for large datasets

## TypeScript Support

All functions include comprehensive TypeScript definitions:

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

function validateSchema<T>(
  data: T, 
  schema: ValidationSchema<T>
): ValidationResult;
```