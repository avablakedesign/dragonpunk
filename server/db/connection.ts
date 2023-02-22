//Next.js boilerplate
import mongoose from "mongoose";
declare global{
    var mongoose:{
        conn:any;
        promise:any;
    }
}
global.mongoose = {conn:null, promise:null}
let cachedConnection = global.mongoose;
if (!cachedConnection){
    cachedConnection = {conn:null, promise:null}
}
export default async () => {
    // if there is a connection to the database then return the previously used connection
    if (cachedConnection && cachedConnection.conn) {
        return cachedConnection.conn
    }
    //if there is no connection then the promise is manually created, the .then is instructions for when the promise is fufilled. 
    if (!cachedConnection.promise){
        cachedConnection.promise = mongoose.connect(process.env.MONGODB_URI as string).then((mongoose)=>mongoose)
    }
    //creating a new connection
    cachedConnection.conn = await cachedConnection.promise
    return cachedConnection.conn
}  

// import {MongoClient} from 'mongodb'

// if (!process.env.MONGODB_URI) {
//     throw new Error('Invalid/Missing environment variable: "MONGODB_URI')    
// }

// const uri = process.env.MONGODB_URI
// const options = {}

// let client 
// let clientPromise: Promise<MongoClient>

// if (process.env.NODE_ENV === 'development') {
//    if (!global._mongoClientPromise) {
//         client = new MongoClient(uri, options)
//         global._mongoClientPromise = client.connect()
//     }
//     clientPromise = global._mongoClientPromise
//     } else {
//     client = new MongoClient(uri, options)
//     clientPromise = client.connect()
// }

// export default clientPromise