//This is where a graphQL server is set up to interface with the express server, next.js exposes in the api/routes.
//Every time a user sends a request to api/graphql then apollo server will handle the request. 
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"

import context from "@/graphql/context"
import schema from "@/graphql/schema"
import resolvers from "@/graphql/resolvers"

interface Context {
    user?:any
}

const typeDefs = schema
//Apollo server consists of resolvers and type defs.
//Resolvers are functions that control how data is returned(queried) or updated(mutated).
//Type defs specify the schema or graphQL server.
const server = new ApolloServer<Context>({ 
    resolvers,
    typeDefs
});

//We integrate with next.js and pass in a context. 
//Context is shared information that gets passed too every request on the graphQl server.
//this is using a function from apollo server integrations. 
export default startServerAndCreateNextHandler(server, {
    context
})