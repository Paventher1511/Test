/**
 * Basic Usage Examples
 * 
 * This file demonstrates the most common usage patterns for the API client,
 * utility functions, and components.
 */

// Import required modules
import { APIClient } from 'your-package-name';
import { 
  formatData, 
  validateSchema, 
  transformData,
  debounce,
  groupBy
} from 'your-package-name/utils';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

/**
 * 1. API Client Setup and Basic Operations
 */
async function apiClientExamples() {
  console.log('=== API Client Examples ===');
  
  // Initialize the API client
  const client = new APIClient({
    apiKey: process.env.API_KEY,
    baseURL: process.env.API_BASE_URL || 'https://api.example.com/v1',
    timeout: 5000,
    retries: 3
  });

  try {
    // 1.1 Fetch all data with pagination
    console.log('1.1 Fetching paginated data...');
    const dataResponse = await client.getData({
      page: 1,
      limit: 10,
      sort: 'created_at',
      order: 'desc'
    });
    console.log(`Fetched ${dataResponse.data.length} items`);

    // 1.2 Get specific item by ID
    if (dataResponse.data.length > 0) {
      const firstItemId = dataResponse.data[0].id;
      console.log('1.2 Fetching specific item...');
      const item = await client.getData(firstItemId);
      console.log(`Item details:`, item.name);
    }

    // 1.3 Create new data
    console.log('1.3 Creating new item...');
    const newItem = {
      name: 'Example Item',
      description: 'Created via API example',
      category: 'demo',
      tags: ['example', 'api', 'demo']
    };

    const createdItem = await client.createData(newItem);
    console.log(`Created item with ID: ${createdItem.id}`);

    // 1.4 Update the created item
    console.log('1.4 Updating item...');
    const updatedItem = await client.updateData(createdItem.id, {
      description: 'Updated via API example',
      status: 'active'
    });
    console.log(`Updated item: ${updatedItem.name}`);

    // 1.5 Batch operations
    console.log('1.5 Batch create items...');
    const batchItems = [
      { name: 'Batch Item 1', category: 'batch' },
      { name: 'Batch Item 2', category: 'batch' },
      { name: 'Batch Item 3', category: 'batch' }
    ];

    const batchResult = await client.batchCreate(batchItems);
    console.log(`Batch created ${batchResult.created} items`);

    // 1.6 Search functionality
    console.log('1.6 Searching items...');
    const searchResults = await client.search({
      q: 'example',
      filters: { category: 'demo' },
      facets: ['category', 'tags']
    });
    console.log(`Search found ${searchResults.total} items`);

    // 1.7 Clean up - delete the created item
    console.log('1.7 Cleaning up...');
    await client.deleteData(createdItem.id);
    console.log('Cleanup completed');

  } catch (error) {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

/**
 * 2. Data Processing and Validation Examples
 */
function dataProcessingExamples() {
  console.log('\n=== Data Processing Examples ===');

  // 2.1 Data validation
  console.log('2.1 Data validation...');
  const userData = {
    username: 'johndoe',
    email: 'john@example.com',
    age: 25,
    profile: {
      bio: 'Software developer',
      website: 'https://johndoe.com'
    }
  };

  const userSchema = {
    username: {
      required: true,
      type: 'string',
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/
    },
    email: {
      required: true,
      type: 'email'
    },
    age: {
      required: false,
      type: 'number',
      min: 13,
      max: 120
    },
    profile: {
      type: 'object',
      properties: {
        bio: { type: 'string', maxLength: 500 },
        website: { type: 'url' }
      }
    }
  };

  const validation = validateSchema(userData, userSchema);
  if (validation.isValid) {
    console.log('✅ User data is valid');
  } else {
    console.log('❌ Validation errors:', validation.errors);
  }

  // 2.2 Data formatting
  console.log('2.2 Data formatting...');
  const rawData = {
    date: new Date(),
    price: 19.99,
    name: 'Product Name',
    description: 'This is a product description'
  };

  const formattedData = formatData(rawData, {
    dateFormat: 'YYYY-MM-DD',
    currency: 'USD',
    locale: 'en-US'
  });
  console.log('Formatted data:', formattedData);

  // 2.3 Data transformation
  console.log('2.3 Data transformation...');
  const transformations = [
    // Normalize names
    data => ({
      ...data,
      name: data.name ? data.name.trim().toLowerCase() : ''
    }),
    // Add computed fields
    data => ({
      ...data,
      slug: data.name.replace(/\s+/g, '-'),
      timestamp: Date.now()
    }),
    // Clean up
    data => {
      const { name, slug, timestamp, description } = data;
      return { name, slug, timestamp, description };
    }
  ];

  const transformedData = transformData(rawData, transformations);
  console.log('Transformed data:', transformedData);

  // 2.4 Array grouping
  console.log('2.4 Array grouping...');
  const items = [
    { name: 'Item 1', category: 'electronics', price: 100 },
    { name: 'Item 2', category: 'books', price: 20 },
    { name: 'Item 3', category: 'electronics', price: 150 },
    { name: 'Item 4', category: 'books', price: 15 },
    { name: 'Item 5', category: 'clothing', price: 50 }
  ];

  const groupedByCategory = groupBy(items, 'category');
  console.log('Grouped by category:', Object.keys(groupedByCategory));

  const groupedByPriceRange = groupBy(items, item => 
    item.price < 50 ? 'low' : item.price < 100 ? 'medium' : 'high'
  );
  console.log('Grouped by price range:', Object.keys(groupedByPriceRange));
}

/**
 * 3. Utility Functions Examples
 */
function utilityFunctionExamples() {
  console.log('\n=== Utility Functions Examples ===');

  // 3.1 Debounce example
  console.log('3.1 Debounce function...');
  let searchCount = 0;
  const search = (query) => {
    searchCount++;
    console.log(`Search #${searchCount}: ${query}`);
  };

  const debouncedSearch = debounce(search, 300);
  
  // Simulate rapid calls
  debouncedSearch('a');
  debouncedSearch('ap');
  debouncedSearch('app');
  debouncedSearch('apple'); // Only this should execute after 300ms

  // 3.2 Error handling wrapper
  console.log('3.2 Error handling...');
  const withErrorHandling = (fn) => {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        console.error(`Error in ${fn.name}:`, error.message);
        return null;
      }
    };
  };

  const safeApiCall = withErrorHandling(async (id) => {
    if (!id) throw new Error('ID is required');
    return { id, data: 'mock data' };
  });

  // Test error handling
  safeApiCall(123).then(result => console.log('Safe call result:', result));
  safeApiCall(null).then(result => console.log('Safe call with error:', result));
}

/**
 * 4. Advanced Usage Patterns
 */
async function advancedUsageExamples() {
  console.log('\n=== Advanced Usage Examples ===');

  // 4.1 Retry mechanism with exponential backoff
  console.log('4.1 Retry mechanism...');
  const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  const unreliableOperation = () => {
    if (Math.random() > 0.7) {
      return Promise.resolve('Success!');
    }
    return Promise.reject(new Error('Random failure'));
  };

  try {
    const result = await retryWithBackoff(unreliableOperation, 3, 500);
    console.log('Operation succeeded:', result);
  } catch (error) {
    console.log('Operation failed after retries:', error.message);
  }

  // 4.2 Concurrent API calls with Promise.all
  console.log('4.2 Concurrent API calls...');
  const client = new APIClient({
    apiKey: process.env.API_KEY,
    baseURL: process.env.API_BASE_URL
  });

  const concurrentCalls = async () => {
    const startTime = Date.now();
    
    try {
      const [users, products, analytics] = await Promise.all([
        client.getData('users'),
        client.getData('products'), 
        client.getAnalytics()
      ]);

      const endTime = Date.now();
      console.log(`Fetched data from 3 endpoints in ${endTime - startTime}ms`);
      console.log(`Users: ${users.data?.length || 0}`);
      console.log(`Products: ${products.data?.length || 0}`);
      console.log(`Analytics: ${analytics.total_items || 0} total items`);
      
    } catch (error) {
      console.error('Concurrent calls failed:', error.message);
    }
  };

  // 4.3 Rate limiting
  console.log('4.3 Rate limiting...');
  const createRateLimiter = (requestsPerSecond) => {
    const queue = [];
    const interval = 1000 / requestsPerSecond;
    let lastRequestTime = 0;

    return async (fn) => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      
      if (timeSinceLastRequest < interval) {
        await new Promise(resolve => 
          setTimeout(resolve, interval - timeSinceLastRequest)
        );
      }
      
      lastRequestTime = Date.now();
      return fn();
    };
  };

  const rateLimitedCall = createRateLimiter(2); // 2 requests per second

  // Make several rate-limited calls
  const rateLimitedOperations = async () => {
    const operations = Array.from({ length: 5 }, (_, i) => 
      rateLimitedCall(async () => {
        console.log(`Rate limited operation ${i + 1} at ${new Date().toISOString()}`);
        return `Result ${i + 1}`;
      })
    );

    const results = await Promise.all(operations);
    console.log('All rate limited operations completed');
  };

  await Promise.all([
    concurrentCalls(),
    rateLimitedOperations()
  ]);
}

/**
 * 5. Performance Monitoring and Metrics
 */
function performanceExamples() {
  console.log('\n=== Performance Examples ===');

  // 5.1 Simple performance timer
  const createTimer = (name) => {
    const start = Date.now();
    return () => {
      const end = Date.now();
      console.log(`${name} took ${end - start}ms`);
      return end - start;
    };
  };

  // 5.2 Memory usage tracking
  const trackMemoryUsage = (label) => {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const usage = process.memoryUsage();
      console.log(`${label} - Memory usage:`, {
        rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`
      });
    }
  };

  // 5.3 Performance test
  const performanceTest = () => {
    trackMemoryUsage('Before operations');
    
    const timer = createTimer('Large array processing');
    
    // Simulate heavy processing
    const largeArray = Array.from({ length: 100000 }, (_, i) => ({
      id: i,
      value: Math.random(),
      category: i % 10
    }));

    const processed = largeArray
      .filter(item => item.value > 0.5)
      .map(item => ({ ...item, processed: true }))
      .reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});

    timer();
    trackMemoryUsage('After operations');
    
    console.log(`Processed ${Object.keys(processed).length} categories`);
  };

  performanceTest();
}

/**
 * Main execution function
 */
async function runAllExamples() {
  console.log('🚀 Starting Basic Usage Examples\n');

  try {
    await apiClientExamples();
    dataProcessingExamples();
    utilityFunctionExamples();
    await advancedUsageExamples();
    performanceExamples();
    
    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('\n❌ Examples failed:', error.message);
    process.exit(1);
  }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples();
}

// Export functions for use in other files
export {
  apiClientExamples,
  dataProcessingExamples,
  utilityFunctionExamples,
  advancedUsageExamples,
  performanceExamples,
  runAllExamples
};