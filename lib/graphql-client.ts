import { GraphQLClient } from "graphql-request";

// const endpoint:string = "https://dragonpunk.herokuapp.com/api/graphql"
const endpoint:string = "http://localhost:3000/api/graphql"
export default new GraphQLClient(endpoint, {   
})
