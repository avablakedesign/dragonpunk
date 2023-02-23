import { GraphQLClient } from "graphql-request";
//This is for the client to make queries to the graphQl server. 
const endpoint:string = "https://dragonpunk.herokuapp.com/api/graphql"
// const endpoint:string = "http://localhost:3000/api/graphql"
export default new GraphQLClient(endpoint, {   
})
