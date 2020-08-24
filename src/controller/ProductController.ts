import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";

export class ProductController {
    // ==================================================
    // Get all products
    // ==================================================
    static getAll = async (req: Request, res: Response) => {
        const productRepository = getRepository(Product);
        try {
            const products: Product[] = await productRepository.find({
                relations: ["categories"],
            });
            res.json({ count: products.length, results: products });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error al buscar los productos" });
        }
    };
    // ==================================================
    // Get product by ID
    // ==================================================
    static getById = async (req: Request, res: Response) => {
        const { code } = req.params;

        const productRepository = getRepository(Product);
        try {
            const products: Product[] = await productRepository.find({
                where: { code },
            });
            res.json({ count: products.length, results: products });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error al buscar los productos" });
        }
    };
    // ==================================================
    // Create new product
    // ==================================================
    static createProduct = async (req: Request, res: Response) => {
        const { productName, categories } = req.body;
        const categoryRepository = getRepository(Category);

        //Esto es para prueba... desde el front se debe pasar el objeto completo de la categoria
        const category: Category = await categoryRepository.findOneOrFail({
            id: 1,
        });

        const product = new Product();
        product.product_name = productName;
        product.categories = [{ ...category }];

        const productRepository = getRepository(Product);

        try {
            await productRepository.save(product);
            res.status(201).json({ results: product });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error al guardar el producto" });
        }
    };
    // ==================================================
    // Update product
    // ==================================================
    static updateProduct = async (req: Request, res: Response) => {};
    // ==================================================
    // Delete product
    // ==================================================
    static deleteProduct = async (req: Request, res: Response) => {};
}

export default ProductController;
