# Docker Setup for Idea Board

## Quick Start

To run the entire application stack:

```bash
docker-compose up --build
```

This will start:
- **PostgreSQL** database on port 5432
- **Backend** (Node.js + Express + GraphQL) on port 4000
- **Frontend** (React + Vite) on port 80

Access the application at: http://localhost

## Services

### Frontend
- Built with React, Vite, and Tailwind CSS
- Served via Nginx
- Available at: http://localhost

### Backend
- Node.js + Express + GraphQL API
- GraphQL Playground: http://localhost:4000/graphql
- Health check: http://localhost:4000/health

### Database
- PostgreSQL 15
- Port: 5432
- Database: ideaboard
- User: postgres
- Password: postgres

## Development

### Stop all services
```bash
docker-compose down
```

### Stop and remove volumes (clears database)
```bash
docker-compose down -v
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild specific service
```bash
docker-compose up --build backend
```

## GraphQL API Examples

### Create an Idea
```graphql
mutation {
  createIdea(text: "Build a rocket to Mars") {
    id
    text
    upvotes
    createdAt
  }
}
```

### Get All Ideas
```graphql
query {
  ideas {
    id
    text
    upvotes
    createdAt
  }
}
```

### Upvote an Idea
```graphql
mutation {
  upvoteIdea(id: "1") {
    id
    text
    upvotes
  }
}
```

## Kubernetes Deployment (Optional)

For Kubernetes deployment, refer to the `k8s/` directory for manifests.

## Notes

- Database data persists in a Docker volume named `postgres_data`
- Frontend is optimized for production with multi-stage Docker build
- Backend uses health checks to ensure database is ready before starting
