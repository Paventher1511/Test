# Getting Started Guide

## Welcome

Welcome to the project! This guide will help you get up and running quickly with our APIs, functions, and components.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### For JavaScript/Node.js Projects
- **Node.js** (version 16.0 or higher)
- **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
- A code editor (we recommend VS Code)

### For Python Projects
- **Python** (version 3.8 or higher)
- **pip** (latest version)
- **Virtual environment** (recommended)

### For Other Languages
- Check the specific language requirements in the relevant documentation

## Quick Installation

### JavaScript/TypeScript

```bash
# Using npm
npm install your-package-name

# Using yarn
yarn add your-package-name

# Using pnpm
pnpm add your-package-name
```

### Python

```bash
# Using pip
pip install your-package-name

# Using pip with virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install your-package-name
```

### CDN (Browser)

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/your-package-name@latest/dist/index.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/your-package-name@1.0.0/dist/index.js"></script>

<!-- CSS (if applicable) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/your-package-name@latest/dist/styles.css">
```

## Project Setup

### 1. Create a New Project

```bash
# Create project directory
mkdir my-awesome-project
cd my-awesome-project

# Initialize package.json (Node.js)
npm init -y

# Or initialize Python project
python -m venv venv
source venv/bin/activate
pip install --upgrade pip
```

### 2. Install Dependencies

```bash
# Core package
npm install your-package-name

# Development dependencies (optional)
npm install --save-dev @types/your-package-name typescript

# Additional utilities
npm install axios dotenv
```

### 3. Environment Setup

Create a `.env` file in your project root:

```bash
# API Configuration
API_KEY=your_api_key_here
API_BASE_URL=https://api.example.com/v1

# Environment
NODE_ENV=development

# Optional: Database configuration
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
```

### 4. TypeScript Configuration (Optional)

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Your First Application

### JavaScript/Node.js Example

Create `src/index.js`:

```javascript
// Import the main API client
import { APIClient } from 'your-package-name';
import { formatData, validateSchema } from 'your-package-name/utils';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  // Initialize the API client
  const client = new APIClient({
    apiKey: process.env.API_KEY,
    baseURL: process.env.API_BASE_URL || 'https://api.example.com/v1'
  });

  try {
    // Fetch some data
    console.log('Fetching data...');
    const data = await client.getData();
    
    // Format the data
    const formattedData = formatData(data, {
      dateFormat: 'YYYY-MM-DD',
      currency: 'USD'
    });

    console.log('Formatted data:', formattedData);

    // Create new data
    const newItem = {
      name: 'Test Item',
      description: 'This is a test item',
      category: 'example'
    };

    // Validate before creating
    const validation = validateSchema(newItem, {
      name: { required: true, type: 'string', minLength: 3 },
      description: { required: true, type: 'string' },
      category: { required: true, type: 'string' }
    });

    if (validation.isValid) {
      const created = await client.createData(newItem);
      console.log('Created item:', created);
    } else {
      console.error('Validation failed:', validation.errors);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the application
main().catch(console.error);
```

### React Application Example

Create `src/App.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import {
  APIClient,
  Button,
  DataTable,
  Modal,
  Input,
  Alert,
  LoadingSpinner
} from 'your-package-name';

// Initialize API client
const client = new APIClient({
  apiKey: process.env.REACT_APP_API_KEY,
  baseURL: process.env.REACT_APP_API_URL
});

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await client.getData();
      setData(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await client.createData(formData);
      setShowCreateModal(false);
      loadData(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await client.deleteData(id);
        loadData(); // Refresh data
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Table columns configuration
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'description', label: 'Description' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button
          size="small"
          variant="danger"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </Button>
      )
    }
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <LoadingSpinner size="large" text="Loading data..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Application</h1>
      
      {error && (
        <Alert type="error" closable onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Item
        </Button>
        <Button
          variant="outline"
          onClick={loadData}
          style={{ marginLeft: '0.5rem' }}
        >
          Refresh
        </Button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        sortable
        pagination={{ pageSize: 10 }}
      />

      <CreateItemModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}

// Create Item Modal Component
function CreateItemModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', description: '' });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Item"
      footer={
        <div>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!formData.name.trim()}
          >
            Create
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <Input
            placeholder="Item name"
            value={formData.name}
            onChange={(e) => setFormData({
              ...formData,
              name: e.target.value
            })}
            required
          />
        </div>
        <div>
          <Input
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({
              ...formData,
              description: e.target.value
            })}
            multiline
            rows={3}
          />
        </div>
      </form>
    </Modal>
  );
}

export default App;
```

### Python Example

Create `main.py`:

```python
#!/usr/bin/env python3
"""
Simple example application using the Python client
"""

import os
import asyncio
from your_package_name import APIClient
from your_package_name.utils import format_data, validate_schema

async def main():
    # Initialize client
    client = APIClient(
        api_key=os.getenv('API_KEY'),
        base_url=os.getenv('API_BASE_URL', 'https://api.example.com/v1')
    )
    
    try:
        # Fetch data
        print("Fetching data...")
        data = await client.get_data()
        
        # Format data
        formatted = format_data(data, {
            'date_format': '%Y-%m-%d',
            'currency': 'USD'
        })
        
        print(f"Formatted data: {formatted}")
        
        # Create new item
        new_item = {
            'name': 'Test Item',
            'description': 'This is a test item',
            'category': 'example'
        }
        
        # Validate
        schema = {
            'name': {'required': True, 'type': 'string', 'min_length': 3},
            'description': {'required': True, 'type': 'string'},
            'category': {'required': True, 'type': 'string'}
        }
        
        validation = validate_schema(new_item, schema)
        
        if validation['is_valid']:
            created = await client.create_data(new_item)
            print(f"Created item: {created}")
        else:
            print(f"Validation failed: {validation['errors']}")
            
    except Exception as error:
        print(f"Error: {error}")
    
    finally:
        await client.close()

if __name__ == '__main__':
    asyncio.run(main())
```

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.{js,ts}",
    "lint:fix": "eslint src/**/*.{js,ts} --fix",
    "format": "prettier --write src/**/*.{js,ts,json}"
  }
}
```

## Development Tools Setup

### VS Code Extensions (Recommended)

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-python.python",
    "ms-vscode.vscode-json"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "javascript.preferences.importModuleSpecifier": "relative"
}
```

### Git Configuration

Create `.gitignore`:

```gitignore
# Dependencies
node_modules/
__pycache__/
*.pyc

# Environment variables
.env
.env.local
.env.production

# Build outputs
dist/
build/
*.log

# IDE
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
*.coverage

# Temporary files
*.tmp
*.temp
```

## Testing Your Setup

### Run Basic Tests

```bash
# Test API connectivity
node -e "
const { APIClient } = require('your-package-name');
const client = new APIClient({ apiKey: 'test' });
console.log('API client created successfully!');
"

# Test utility functions
node -e "
const { formatData } = require('your-package-name/utils');
const result = formatData({ date: new Date() });
console.log('Utils working:', result);
"
```

### Health Check Endpoint

```javascript
// health-check.js
import { APIClient } from 'your-package-name';

const client = new APIClient({
  apiKey: process.env.API_KEY,
  baseURL: process.env.API_BASE_URL
});

async function healthCheck() {
  try {
    const health = await client.getHealth();
    console.log('✅ API is healthy:', health);
    process.exit(0);
  } catch (error) {
    console.error('❌ API health check failed:', error.message);
    process.exit(1);
  }
}

healthCheck();
```

## Common Issues and Solutions

### 1. API Key Issues

**Problem**: `401 Unauthorized` errors

**Solution**:
```bash
# Check if API key is set
echo $API_KEY

# Verify API key format
node -e "console.log('API Key length:', process.env.API_KEY?.length)"
```

### 2. Network Issues

**Problem**: Connection timeouts

**Solution**:
```javascript
const client = new APIClient({
  apiKey: process.env.API_KEY,
  timeout: 10000, // Increase timeout
  retries: 3,     // Add retries
  retryDelay: 1000
});
```

### 3. Module Import Issues

**Problem**: `Cannot resolve module` errors

**Solution**:
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use specific import paths
import { APIClient } from 'your-package-name/dist/api';
```

### 4. TypeScript Issues

**Problem**: Type definition errors

**Solution**:
```bash
# Install type definitions
npm install --save-dev @types/your-package-name

# Or create custom types
echo 'declare module "your-package-name";' > types.d.ts
```

## Next Steps

Now that you have the basic setup working:

1. **Explore the API**: Check out the [API Documentation](./API.md)
2. **Learn about Functions**: Read the [Functions Documentation](./FUNCTIONS.md)
3. **Use Components**: Browse the [Components Documentation](./COMPONENTS.md)
4. **See Examples**: Look at the [examples/](../examples/) directory
5. **Join the Community**: Check our GitHub discussions

## Getting Help

- **Documentation**: Browse all docs in the `/docs` folder
- **Examples**: Check the `/examples` folder for complete examples
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Support**: Email support@example.com

## What's Next?

- Set up your development environment
- Try the example applications
- Read through the comprehensive API documentation
- Explore advanced features and integrations
- Build your first real application!

Happy coding! 🚀