import { gql } from "apollo-server";

const typeDefs = gql`
  type Movie {
    _id: ID!
    name: String!
    releaseDate: String!
    duration: Int!
    actors: [String!]!
    averageRating: Float!
    author: User
    reviews: [Review!]!
  }

  extend type Query {
    movies: [Movie!]!
    movie(id: String!): Movie!
  }

  extend type Mutation {
    createMovie(
      name: String!
      releaseDate: String!
      duration: Int!
      actors: [String!]!
      coverImage: String!
    ): Movie!

    deleteMovie(id: ID!): Boolean!

    editMovie(
      id: ID!
      name: String!
      releaseDate: String!
      duration: Int!
      actors: [String!]!
      coverImage: String!
    ): Movie!
  }
`;

export default typeDefs;
