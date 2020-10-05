import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { generateToken } from "../middlewares/authentication";

class AuthController {
    // ==================================================
    // Login
    // ==================================================
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res
                .status(400)
                .json({ message: "Username & Password are required" });
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { email } });
        } catch (error) {
            return res.status(400).json({
                message: "El usuario o la contraseña son incorrectos",
            });
        }

        if (!user.checkPassword(password)) {
            return res.status(400).json({
                message: "El usuario o la contraseña son incorrecto",
            });
        }

        const token = generateToken(user);
        res.status(200).json({ data: user, token });
    };

    // ==================================================
    // Check Email
    // ==================================================
    static checkEmail = async (req: Request, res: Response) => {
        const { email } = req.body;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.find({ where: { email: email } });
            res.json({ resulsts: user });
        } catch (error) {
            res.status(404).json({
                message: "No se encontró el usuario",
                error: error.sqlMessage,
            });
        }
    };
}

export default AuthController;
