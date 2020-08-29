import { getRepository, getConnection } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { Person } from "../entity/Person";

export class UserController {
    // ==================================================
    // Get all users
    // ==================================================
    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        try {
            const users: User[] = await userRepository.find({
                relations: ["person"],
            });
            res.json({ count: users.length, results: users });
        } catch (error) {
            res.status(500).json({
                message: "Error al buscar los usuarios",
                error: error.sqlMessage,
            });
        }
    };

    // ==================================================
    // Get user by ID
    // ==================================================
    static getUserById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            res.json({ results: user });
        } catch (error) {
            res.status(404).json({
                message: "No se encontró el usuario",
                error: error.sqlMessage,
            });
        }
    };

    // ==================================================
    // Create user
    // ==================================================
    static createUser = async (req: Request, res: Response) => {
        const { email, password, role } = req.body;

        try {
            const userRepository = getRepository(User);
            const user: User = new User();
            user.email = email;
            user.password = password;
            user.role = role;

            const errors = await validate(user, {
                validationError: { target: false, value: false },
            });

            if (errors.length) {
                return res.status(400).json({ errors });
            }

            user.hashPassword();
            await userRepository.save(user);

            res.json({ results: user });
        } catch (error) {
            res.status(500).json({
                message: "Error al guardar el usuario",
                error: error.sqlMessage,
            });
        }
    };

    // ==================================================
    // Update user
    // ==================================================
    static updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { username, role } = req.body;

        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message: "No se encontró el usuario",
                error: error.sqlMessage,
            });
        }

        user.username = username;
        user.role = role;

        const errors = await validate(user, {
            validationError: { target: false, value: false },
        });
        if (errors.length) return res.status(400).json({ errors });

        try {
            await userRepository.save(user);
            res.json({ results: user });
        } catch (error) {
            return res.status(500).json({
                message: "Error al guardar los datos",
                error: error.sqlMessage,
            });
        }
    };

    // ==================================================
    // Delete user
    // ==================================================
    static deleteUser = async (req: Request, res: Response) => {};
}

export default UserController;
