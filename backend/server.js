const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || 'dpg-d3ivj00dl3ps73dgurig-a',
  port: 5432,
  database: process.env.DB_NAME || 'ideaboard',
  user: process.env.DB_USER || 'ideaboard_user',
  password: process.env.DB_PASSWORD || 'gOXVgldbnulVbckPyFVSfzUAGgwfz37Z',
});

// GraphQL Schema
const schema = buildSchema(`
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
`);

// Resolvers
const root = {
  ideas: async () => {
    const result = await pool.query(
      'SELECT * FROM ideas ORDER BY upvotes DESC, created_at DESC'
    );
    return result.rows.map(row => ({
      id: row.id,
      text: row.text,
      upvotes: row.upvotes,
      createdAt: row.created_at,
    }));
  },

  idea: async ({ id }) => {
    const result = await pool.query('SELECT * FROM ideas WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      text: row.text,
      upvotes: row.upvotes,
      createdAt: row.created_at,
    };
  },

  createIdea: async ({ text }) => {
    if (!text || text.trim().length === 0) {
      throw new Error('Idea text cannot be empty');
    }
    if (text.length > 280) {
      throw new Error('Idea must be less than 280 characters');
    }

    const result = await pool.query(
      'INSERT INTO ideas (text, upvotes, created_at) VALUES ($1, $2, $3) RETURNING *',
      [text.trim(), 0, new Date().toISOString()]
    );
    
    const row = result.rows[0];
    return {
      id: row.id,
      text: row.text,
      upvotes: row.upvotes,
      createdAt: row.created_at,
    };
  },

  upvoteIdea: async ({ id }) => {
    const result = await pool.query(
      'UPDATE ideas SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      throw new Error('Idea not found');
    }

    const row = result.rows[0];
    return {
      id: row.id,
      text: row.text,
      upvotes: row.upvotes,
      createdAt: row.created_at,
    };
  },
};

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
