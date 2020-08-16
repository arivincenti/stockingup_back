import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonWebToken";
import config from "../config/config";
import { User } from "../entity/User";

// ==================================================
// Generate a new token
// ==================================================
export const generateToken = (user: User) => {
    const token = jwt.sign({ user }, config.jwtSecret, {
        expiresIn: "1h",
    });

    return token;
};

// ==================================================
// Check token
// ==================================================
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["token"];
    let jwtPayload: any;
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    next();
};

// ==================================================
// Check role
// ==================================================
export const checkRole = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["token"];
    const jwtPayload: any = jwt.verify(token, config.jwtSecret);
    console.log(jwtPayload.user);
    next();
};
