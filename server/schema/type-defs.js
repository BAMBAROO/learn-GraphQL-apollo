const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
    favouriteMovies: [Movie]
  }

  enum Nationality {
    CANADA
    BRAZIL
    CHILE
    GERMANY
    INDIA
    BRUNEI
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  input createUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: String!
  }

  input updateUserById {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
  }

  type Mutation  {
    createUser(input: createUserInput!): User!
    updateUser(input: updateUserById!): User!
    deleteUser(id: ID!): [User] 
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }
`;

module.exports = { typeDefs };