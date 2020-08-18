import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonWebToken";
import config from "../config/config";
// ==================================================
// Check role
// ==================================================
export const checkRole = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["token"];
    const jwtPayload: any = jwt.verify(token, config.jwtSecret);
    next();
};
