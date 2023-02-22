import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"

import context from "../../../../server/graphql/context"
import schema from "../../../../server/graphql/schema"
import resolvers from "../../../../server/graphql/resolvers"



const typeDefs = schema
const server = new ApolloServer({ 
    resolvers,
    typeDefs
});

export default startServerAndCreateNextHandler(server, {
    // context
})