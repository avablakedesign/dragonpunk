import type { ContextFunction } from "@apollo/server"
import type { NextApiRequest, NextApiResponse } from "next"
import { decode as queryStringDecode } from "node:querystring"
import jwt from "jsonwebtoken";
import User from "@/server/models/User";


interface ContextArgs{
    req: NextApiRequest; 
    res: NextApiResponse;
}

export default async (req:NextApiRequest, res:NextApiResponse): Promise<any> => {
    console.log("authorizationHeader", req.headers.authorization)
    if (req.headers.authorization){
        // const cookies = queryStringDecode(
        //     req.headers.cookie, "; "    
        // )
        const authToken = req.headers.authorization;
        if (!authToken){
            return null;
        }
        //Here you should implement a json webtoken for verification to return the user details from MongoDB.
        const verified:any = jwt.verify(authToken as string, process.env.JWT_SECRET!)
        if (!verified) {
            return null;
        }
        try {
            const user = await User.findById(verified.id, "-password")
            if (!user) {
                return null;
            } 
            return {user};
        } catch (err){
            console.log(err)
            return null;
        }
    }
};