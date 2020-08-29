import { Response, Request } from "express";

export class PersonController {
    // ==================================================
    // Get all
    // ==================================================
    static getAll = async (req: Request, res: Response) => {};
    // ==================================================
    // Get by ID
    // ==================================================
    static getById = async (req: Request, res: Response) => {};
    // ==================================================
    // Create new person
    // ==================================================
    static createPerson = async (req: Request, res: Response) => {};
    // ==================================================
    // Update a person
    // ==================================================
    static updatePerson = async (req: Request, res: Response) => {};
    // ==================================================
    // Delete a person
    // ==================================================
    static deletePerson = async (req: Request, res: Response) => {};
}
