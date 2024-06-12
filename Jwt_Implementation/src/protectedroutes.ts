import express, { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const protectedroutes = express();

const jwtsecret: string = process.env.JWT_SECRET || '';

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const verify = jsonwebtoken.verify(token, jwtsecret);
        if (verify) {
            next();
        } else {
            throw new Error("Invalid token");
        }
    } catch (e) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
}

protectedroutes.use(authenticate);

protectedroutes.get("/home", (req: Request, res: Response) => {
    res.json({
        msg: "Welcome home user",
    });
});

export default protectedroutes;
