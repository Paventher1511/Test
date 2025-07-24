# API Documentation

## Overview

This document provides detailed information about the API endpoints, authentication, request/response formats, and error handling.

## Base URL

```
Production: https://api.example.com/v1
Staging: https://staging-api.example.com/v1
Development: http://localhost:3000/v1
```

## Authentication

### API Key Authentication

All API requests require authentication using an API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Example Request

```bash
curl -H "Authorization: Bearer your-api-key" \
     -H "Content-Type: application/json" \
     https://api.example.com/v1/data
```

## Rate Limiting

- **Rate Limit**: 1000 requests per hour per API key
- **Burst Limit**: 100 requests per minute
- **Headers**: Response includes rate limit headers

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200
```

## Endpoints

### Data Management

#### GET /data

Retrieve all data entries with optional filtering and pagination.

**Query Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20, max: 100)
- `sort` (string): Sort field (default: 'created_at')
- `order` (string): Sort order ('asc' or 'desc', default: 'desc')
- `filter[field]` (string): Filter by field value
- `search` (string): Full-text search query

**Example Request:**
```bash
GET /data?page=2&limit=50&sort=name&order=asc&filter[status]=active&search=example
```

**Response:**
```json
{
  "data": [
    {
      "id": "12345",
      "name": "Example Item",
      "description": "This is an example",
      "status": "active",
      "tags": ["example", "demo"],
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 2,
    "per_page": 50,
    "total": 150,
    "total_pages": 3,
    "has_next": true,
    "has_prev": true
  },
  "meta": {
    "request_id": "req_123456789",
    "response_time_ms": 45
  }
}
```

#### GET /data/{id}

Retrieve a specific data entry by ID.

**Path Parameters:**
- `id` (string): The unique identifier

**Example Request:**
```bash
GET /data/12345
```

**Response:**
```json
{
  "data": {
    "id": "12345",
    "name": "Example Item",
    "description": "This is an example",
    "status": "active",
    "tags": ["example", "demo"],
    "metadata": {
      "version": 1,
      "last_modified_by": "user_456"
    },
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

#### POST /data

Create a new data entry.

**Request Body:**
```json
{
  "name": "New Item",
  "description": "Description of the new item",
  "status": "active",
  "tags": ["new", "example"],
  "metadata": {
    "category": "test"
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "67890",
    "name": "New Item",
    "description": "Description of the new item",
    "status": "active",
    "tags": ["new", "example"],
    "metadata": {
      "category": "test",
      "version": 1,
      "created_by": "user_123"
    },
    "created_at": "2023-01-02T00:00:00Z",
    "updated_at": "2023-01-02T00:00:00Z"
  }
}
```

#### PUT /data/{id}

Update an existing data entry (full replace).

**Path Parameters:**
- `id` (string): The unique identifier

**Request Body:**
```json
{
  "name": "Updated Item",
  "description": "Updated description",
  "status": "inactive",
  "tags": ["updated", "example"]
}
```

#### PATCH /data/{id}

Partially update an existing data entry.

**Path Parameters:**
- `id` (string): The unique identifier

**Request Body:**
```json
{
  "description": "Partially updated description",
  "status": "inactive"
}
```

#### DELETE /data/{id}

Delete a data entry.

**Path Parameters:**
- `id` (string): The unique identifier

**Response:**
```json
{
  "message": "Data entry deleted successfully",
  "deleted_id": "12345"
}
```

### Batch Operations

#### POST /data/batch

Create multiple data entries in a single request.

**Request Body:**
```json
{
  "items": [
    {
      "name": "Item 1",
      "description": "First item"
    },
    {
      "name": "Item 2", 
      "description": "Second item"
    }
  ]
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "11111",
      "name": "Item 1",
      "description": "First item",
      "created_at": "2023-01-02T00:00:00Z"
    },
    {
      "id": "22222",
      "name": "Item 2",
      "description": "Second item", 
      "created_at": "2023-01-02T00:00:00Z"
    }
  ],
  "summary": {
    "created": 2,
    "failed": 0
  }
}
```

#### PUT /data/batch

Update multiple data entries.

**Request Body:**
```json
{
  "items": [
    {
      "id": "11111",
      "name": "Updated Item 1"
    },
    {
      "id": "22222",
      "status": "inactive"
    }
  ]
}
```

#### DELETE /data/batch

Delete multiple data entries.

**Request Body:**
```json
{
  "ids": ["11111", "22222", "33333"]
}
```

**Response:**
```json
{
  "message": "Batch delete completed",
  "summary": {
    "deleted": 2,
    "failed": 1,
    "errors": [
      {
        "id": "33333",
        "error": "Not found"
      }
    ]
  }
}
```

### Search and Analytics

#### GET /search

Advanced search with filters and faceting.

**Query Parameters:**
- `q` (string): Search query
- `filters` (object): Field-specific filters
- `facets` (array): Fields to facet on
- `highlight` (boolean): Enable search highlighting

**Example Request:**
```bash
GET /search?q=example&filters[status]=active&facets[]=category&facets[]=tags&highlight=true
```

**Response:**
```json
{
  "data": [
    {
      "id": "12345",
      "name": "Example Item",
      "description": "This is an <em>example</em>",
      "score": 0.95
    }
  ],
  "facets": {
    "category": {
      "test": 15,
      "demo": 8
    },
    "tags": {
      "example": 23,
      "demo": 12
    }
  },
  "total": 23,
  "query_time_ms": 12
}
```

#### GET /analytics/summary

Get analytics summary.

**Response:**
```json
{
  "data": {
    "total_items": 1500,
    "active_items": 1200,
    "inactive_items": 300,
    "created_today": 25,
    "created_this_week": 150,
    "created_this_month": 600,
    "top_tags": [
      {"tag": "example", "count": 450},
      {"tag": "demo", "count": 300}
    ],
    "status_distribution": {
      "active": 80,
      "inactive": 20
    }
  }
}
```

## Webhooks

### Setting up Webhooks

Configure webhooks to receive real-time notifications about data changes.

#### POST /webhooks

Create a webhook endpoint.

**Request Body:**
```json
{
  "url": "https://your-app.com/webhook",
  "events": ["data.created", "data.updated", "data.deleted"],
  "secret": "your-webhook-secret"
}
```

### Webhook Events

#### data.created
Triggered when new data is created.

**Payload:**
```json
{
  "event": "data.created",
  "timestamp": "2023-01-02T00:00:00Z",
  "data": {
    "id": "12345",
    "name": "New Item"
  }
}
```

#### data.updated
Triggered when data is updated.

#### data.deleted
Triggered when data is deleted.

### Webhook Security

All webhook payloads include a signature header for verification:

```http
X-Webhook-Signature: sha256=signature_hash
```

## Error Handling

### Error Response Format

All errors follow a consistent format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ],
    "request_id": "req_123456789"
  }
}
```

### Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | VALIDATION_ERROR | Request validation failed |
| 400 | INVALID_REQUEST | Request format is invalid |
| 401 | UNAUTHORIZED | Authentication required |
| 403 | FORBIDDEN | Insufficient permissions |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Resource conflict |
| 422 | UNPROCESSABLE_ENTITY | Request cannot be processed |
| 429 | RATE_LIMITED | Rate limit exceeded |
| 500 | INTERNAL_ERROR | Internal server error |
| 502 | BAD_GATEWAY | Gateway error |
| 503 | SERVICE_UNAVAILABLE | Service temporarily unavailable |

## SDK Examples

### JavaScript/Node.js

```javascript
const API = require('your-api-client');

const client = new API({
  apiKey: 'your-api-key',
  baseURL: 'https://api.example.com/v1'
});

// Create data
const newItem = await client.data.create({
  name: 'Example Item',
  description: 'This is an example'
});

// Get data with pagination
const response = await client.data.list({
  page: 1,
  limit: 20,
  sort: 'name'
});

// Search
const searchResults = await client.search({
  q: 'example',
  filters: { status: 'active' }
});
```

### Python

```python
from your_api_client import APIClient

client = APIClient(
    api_key='your-api-key',
    base_url='https://api.example.com/v1'
)

# Create data
new_item = client.data.create({
    'name': 'Example Item',
    'description': 'This is an example'
})

# Get data with pagination
response = client.data.list(
    page=1,
    limit=20,
    sort='name'
)

# Search
search_results = client.search(
    q='example',
    filters={'status': 'active'}
)
```

### cURL Examples

#### Create Data
```bash
curl -X POST https://api.example.com/v1/data \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example Item",
    "description": "This is an example"
  }'
```

#### Get Data with Filters
```bash
curl -X GET "https://api.example.com/v1/data?status=active&limit=10" \
  -H "Authorization: Bearer your-api-key"
```

#### Update Data
```bash
curl -X PATCH https://api.example.com/v1/data/12345 \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description"
  }'
```

## Testing

### Test Environment

Use the staging environment for testing:
- Base URL: `https://staging-api.example.com/v1`
- Test API keys start with `test_`

### Postman Collection

Download our Postman collection: [API Collection](./postman-collection.json)

### Mock Data

The staging environment includes mock data for testing various scenarios.

## Changelog

### v1.2.0 (2023-01-15)
- Added batch operations
- Enhanced search with faceting
- Added webhook support

### v1.1.0 (2023-01-01)
- Added analytics endpoints
- Improved error handling
- Added rate limiting headers

### v1.0.0 (2022-12-01)
- Initial API release
- Basic CRUD operations
- Authentication and authorization