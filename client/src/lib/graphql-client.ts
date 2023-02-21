import { GraphQLClient } from "graphql-request";

const endpoint:string = process.env.NODE_ENV === "development"?"http://localhost:3000/api/graphql":process.env.PRODUCTION_URL as string;
export default new GraphQLClient(endpoint, {   
})