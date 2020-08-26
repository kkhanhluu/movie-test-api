import { gql } from "apollo-server";

const typeDefs = gql`
  type Review {
    _id: String!
    rating: Int!
    review: String!
    user: User!
    movie: String!
  }

  extend type Mutation {
    addReview(rating: Int!, review: String!, movie: String!): Review!
  }
`;

export default typeDefs;
