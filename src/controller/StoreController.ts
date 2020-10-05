import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entity/Store";

export class StoreController {
    // ==================================================
    // Get all
    // ==================================================
    static getAll = async (req: Request, res: Response) => {
        const storeRepository = getRepository(Store);

        try {
            const stores = await storeRepository.find();
            res.json({ count: stores.length, results: stores });
        } catch (error) {
            res.status(500).json({
                message: "No se pudo buscar las tiendas",
                error,
            });
        }
    };
    // ==================================================
    // Get by ID
    // ==================================================
    static getById = async (req: Request, res: Response) => {
        const storeRepository = getRepository(Store);
        const { id } = req.params;
        try {
            const store = await storeRepository.findOneOrFail(id);
            res.json({ results: store });
        } catch (error) {
            res.status(500).json({
                message: "No se pudo buscar la tienda",
                error,
            });
        }
    };
    // ==================================================
    // Create new store
    // ==================================================
    static createStore = async (req: Request, res: Response) => {};
    // ==================================================
    // Update a store
    // ==================================================
    static updateStore = async (req: Request, res: Response) => {};
    // ==================================================
    // Delete a store
    // ==================================================
    static deleteStore = async (req: Request, res: Response) => {};
}
