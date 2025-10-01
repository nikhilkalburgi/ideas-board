# IdeaBoard

A modern web application for sharing and voting on ideas, built with a microservices architecture.

![Tech Stack](https://skillicons.dev/icons?i=react,nodejs,ts,graphql,postgres,docker)

Screenshots:

![image 1](https://img-getpocket.cdn.mozilla.net/296x148/smart/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F285f3c64-835d-45fa-86c9-3dac61931de2.jpeg)

![image 2](https://img-getpocket.cdn.mozilla.net/296x148/smart/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F285f3c64-835d-45fa-86c9-3dac61931de2.jpeg)

## Architecture & Technology Choices

### Tech Stack & Rationale

- **Frontend**: React 18 + Vite + TypeScript
  - React for its robust ecosystem and component reusability
  - Vite for faster development and optimized builds
  - TypeScript for type safety and better developer experience
  - Trade-off: Learning curve for TypeScript, but better maintainability

- **Backend**: Node.js + Express + GraphQL
  - Node.js for JavaScript ecosystem consistency
  - Express for lightweight, flexible routing
  - GraphQL for efficient data fetching and strong typing
  - Trade-off: GraphQL complexity vs REST simplicity

- **Database**: PostgreSQL
  - ACID compliance for data integrity
  - Rich feature set and JSON support
  - Excellent performance and scalability
  - Trade-off: Higher resource usage compared to SQLite

- **UI Components**: Shadcn UI
  - Modern, accessible components
  - Customizable with Tailwind CSS
  - Active community and maintenance
  - Trade-off: Bundle size vs development speed

### Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/downloads)

### Run with Docker

```bash
# Clone the repository
git clone https://github.com/nikhilkalburgi/ideas-board.git
cd ideas-board

# Start all services
docker-compose up --build
```

### Access the Application

- Frontend: [http://localhost](http://localhost)
- GraphQL Playground: [http://localhost:4000/graphql](http://localhost:4000/graphql)
- Database: `localhost:5432`

## API Documentation

### GraphQL Schema

```graphql
type Idea {
  id: ID!
  text: String!
  upvotes: Int!
  createdAt: String!
}

type Query {
  ideas: [Idea!]!
  idea(id: ID!): Idea
}

type Mutation {
  createIdea(text: String!): Idea!
  upvoteIdea(id: ID!): Idea!
}
```

### Example Queries

#### Fetch All Ideas

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

#### Create New Idea

```graphql
mutation {
  createIdea(text: "Your brilliant idea") {
    id
    text
    upvotes
    createdAt
  }
}
```

## Development Guide

### Local Setup (Without Docker)

1. **Database Setup**

```bash
# Create PostgreSQL database

psql -U postgres

# In the PostgreSQL prompt:
CREATE DATABASE ideaboard;
\c ideaboard
\i backend/init.sql
```

This can be done also using pgAdmin, but `init.sql` is for fast setup.

2. **Backend Setup**

```bash
cd backend
npm install
npm start
```

3. **Frontend Setup**

```bash
npm install
npm run dev
```

### Kubernetes (k8s) Infrastructure

Kubernetes provides container orchestration at scale. Here's how we use it:

#### 1. High Availability

```yaml
spec:
  replicas: 3  # Frontend replicas
  replicas: 2  # Backend replicas
```

- Multiple service instances for redundancy
- Automatic failover
- Load distribution
- Trade-off: Increased complexity and resource usage

#### 2. Health Monitoring

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 4000
```

- Automated health checks
- Self-healing capabilities
- Ensures service reliability
- Trade-off: Additional overhead for health checks

#### 3. Secret Management

```yaml
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db-secret
```

- Secure credential management
- Environment separation
- Easy secrets rotation
- Trade-off: Additional configuration complexity

#### 4. Storage Management

```yaml
volumes:
  - name: postgres-storage
    persistentVolumeClaim:
      claimName: postgres-pvc
```

- Persistent data storage
- Data backup and recovery
- Storage scaling
- Trade-off: Storage management complexity

### Development vs Production

#### Local Development

```bash
docker-compose up --build
```

- Simpler setup
- Faster iteration
- Easy debugging

#### Production (Kubernetes)

```bash
kubectl apply -f k8s/
```

- Scalability
- High availability
- Production-grade features
