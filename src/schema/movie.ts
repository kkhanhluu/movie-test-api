import { gql } from "apollo-server";

const typeDefs = gql`
  type Movie {
    _id: ID!
    name: String!
    releaseDate: String!
    duration: Int!
    actors: [String!]!
    ratingsAverage: Float!
    ratingsQuantity: Int!
    author: User
    reviews: [Review!]!
    coverImage: String!
  }

  extend type Query {
    movies: [Movie!]!
    movie(id: String!): Movie!
    moviesByUser(userId: String!): [Movie]!
  }

  extend type Mutation {
    createMovie(
      name: String!
      releaseDate: String!
      duration: Int!
      actors: [String!]!
      coverImage: String!
    ): Movie!

    deleteMovie(id: String!): Boolean!

    editMovie(
      id: String!
      name: String!
      releaseDate: String!
      duration: Int!
      actors: [String!]!
      coverImage: String!
    ): Movie!
  }
`;

export default typeDefs;
