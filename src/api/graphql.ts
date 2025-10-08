/* eslint-disable @typescript-eslint/no-explicit-any */
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'https://ideaboard-backend-ws12.onrender.com';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface Idea {
  id: string;
  text: string;
  upvotes: number;
  createdAt: string;
}

/**
 * Generic GraphQL query executor
 */
async function graphqlRequest<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL query');
  }

  return result.data;
}

/**
 * Fetch all ideas
 */
export async function fetchIdeas(): Promise<Idea[]> {
  const query = `
    query {
      ideas {
        id
        text
        upvotes
        createdAt
      }
    }
  `;

  const data = await graphqlRequest<{ ideas: Idea[] }>(query);
  return data.ideas;
}

/**
 * Create a new idea
 */
export async function createIdea(text: string): Promise<Idea> {
  const mutation = `
    mutation CreateIdea($text: String!) {
      createIdea(text: $text) {
        id
        text
        upvotes
        createdAt
      }
    }
  `;

  const data = await graphqlRequest<{ createIdea: Idea }>(mutation, { text });
  return data.createIdea;
}

/**
 * Upvote an idea
 */
export async function upvoteIdea(id: string): Promise<Idea> {
  const mutation = `
    mutation UpvoteIdea($id: ID!) {
      upvoteIdea(id: $id) {
        id
        text
        upvotes
        createdAt
      }
    }
  `;

  const data = await graphqlRequest<{ upvoteIdea: Idea }>(mutation, { id });
  return data.upvoteIdea;
}
