import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { generateToken } from "../middlewares/jwt";

class AuthController {
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res
                .status(400)
                .json({ message: "Username & Password are required" });
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
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
}

export default AuthController;
