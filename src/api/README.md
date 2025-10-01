# API Client

This folder contains the API client for interacting with the GraphQL backend.

## Usage

```typescript
import { fetchIdeas, createIdea, upvoteIdea } from '@/api/graphql';

// Fetch all ideas
const ideas = await fetchIdeas();

// Create a new idea
const newIdea = await createIdea("Build something amazing");

// Upvote an idea
const updatedIdea = await upvoteIdea("1");
```

## Configuration

Set the GraphQL endpoint via environment variable:

```
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

If not set, defaults to `http://localhost:4000/graphql`.

## Error Handling

All functions throw errors that should be caught and handled appropriately:

```typescript
try {
  const ideas = await fetchIdeas();
} catch (error) {
  console.error('Failed to fetch ideas:', error);
  // Handle error (show toast, etc.)
}
```
