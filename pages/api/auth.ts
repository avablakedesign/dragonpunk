import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/server/models/User";
import { serialize } from "cookie";

export default async function handler(req: any, res: any) {
    if (req.method === "GET") {
        try {
            res.json({ test:"okay" });
            return 
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ err: "Can not authorize" })
            return
        }
    }
    if (req.method === "POST") {

        try {
            const foundUser = await User.findOne({ email: req.body.email });
            if (!foundUser) {
                res.status(400).json({ error: "Not authenticated." })
                return
            }
            const matchPassword = await bcrypt.compare(req.body.password, foundUser.password);
            if (!matchPassword) {
                res.status(400).json({ error: "Not authenticated." })
                return
            }
            const authToken = jwt.sign({ id: foundUser.id, email: foundUser.email }, process.env.JWT_SECRET!);
            // const cookies = serialize("authToken", authToken, { httpOnly: true });
            // res.setHeader("Set-Cookie", cookies);
            res.status(200).json({ user: foundUser, authToken });
            return
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ error: "Not authenticated." });
            return
        }
    }
    if (req.method === "DELETE") {
        res.status(200).json({ message: "success" });
        return
    }
    else {
        res.status(400).json({ error: "Not authenticated." })
        return
    }

}