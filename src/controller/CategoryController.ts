import { Request, Response } from "express";
import { Category } from "../entity/Category";
import { getRepository } from "typeorm";

class CategoryController {
    static getAll = async (req: Request, res: Response) => {
        const categoryRepository = getRepository(Category);
        try {
            const categories = await categoryRepository.findOneOrFail({
                relations: ["products"],
            });
            res.json({ data: categories });
        } catch (error) {
            return res
                .status(404)
                .json({ message: "No se encontraron categorias" });
        }
    };

    static getById = async (req: Request, res: Response) => {};
    static createCategory = async (req: Request, res: Response) => {
        const { categoryName } = req.body;
        const categoryRepository = getRepository(Category);

        try {
            const category = new Category();
            category.category_name = categoryName;

            await categoryRepository.save(category);
            res.json({ data: category });
        } catch (error) {
            res.status(409).json({
                message: "No se pudo guardar la categoria",
            });
        }
    };
    static updateCategory = (req: Request, res: Response) => {};
    static deleteCategory = (req: Request, res: Response) => {};
}

export default CategoryController;
