import type {NextApiRequest, NextApiResponse} from "next"
import { decode as queryStringDecode } from "node:querystring"

interface ContextArgs{
    req: NextApiRequest; 
    res: NextApiResponse;
}

export default async ({req, res}:ContextArgs): Promise<any> => {
    if (req.headers.cookie){
        const cookies = queryStringDecode(
            req.headers.cookie, "; "    
        )
        const authToken = cookies.authToken
        if (!authToken){
            return null;
        }
        //Here you should implement a json webtoken for verification to return the user details from MongoDB.
    }
};