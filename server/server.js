const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then((e) => {
  console.log(`YOUR SERVER IS RUNNING AT: ${e.url}`)
});