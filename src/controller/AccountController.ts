import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { generateToken } from "../middlewares/authentication";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";
import { EmailController } from "./EmailController";
import { Email } from "../entity/email";

class AccountController {
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

        if (!user.activated) {
            return res.status(400).json({
                message:
                    "¡Todavia no activaste tu cuenta! Ingresa a tu correo electrónico y busca el codigo de activación",
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
    // Register
    // ==================================================
    static register = async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        try {
            const userRepository = getRepository(User);
            const user: User = new User();
            user.username = username;
            user.email = email;
            user.password = password;
            user.role = "admin";
            user.activated = false;
            user.activation_code = uuidv4();

            const errors = await validate(user, {
                validationError: { target: false, value: false },
            });

            if (errors.length) {
                return res.status(400).json({ errors });
            }

            user.hashPassword();
            await userRepository.save(user);

            const email_config = new Email();
            email_config.fromEmail = "arivincenti@gmail.com";
            email_config.fromName = "StockingUp";
            email_config.toEmail = user.email;
            email_config.toName = user.username;
            email_config.subject = "Activá tu cuenta";
            email_config.textPart = "Bienvenido a StockingUp";
            email_config.HTML = `<p>Para activar tu cuenta hace click en el siguiente enlace</p><a href='http://localhost:4200/#/account/activate_account/${user.activation_code}'>Activa tu cuenta</a>`;

            EmailController.sendEmail(res, email_config);
        } catch (error) {
            res.status(500).json({
                message: "Error al guardar el usuario",
                error: error.sqlMessage,
            });
        }
    };

    // ==================================================
    // Forgot password
    // ==================================================
    static forgotPassword = async (req: Request, res: Response) => {};

    // ==================================================
    // Reset password
    // ==================================================
    static resetPassword = async (req: Request, res: Response) => {};

    // ==================================================
    // Activate account
    // ==================================================
    static activateAccount = async (req: Request, res: Response) => {
        const { activation_code } = req.body;
        const userRepository = getRepository(User);

        try {
            const user: User = await userRepository.findOneOrFail({
                where: { activation_code },
            });

            if (!user.activated) {
                user.activated = true;
                await userRepository.save(user);
            }

            user.password = ":)";

            res.json({ results: user });
        } catch (error) {
            res.status(500).json({
                message: "Error al guardar el usuario",
                error: error.sqlMessage,
            });
        }
    };

    // ==================================================
    // Check Email
    // ==================================================
    static checkEmail = async (req: Request, res: Response) => {
        const { email } = req.body;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.find({ where: { email } });
            res.json({ resulsts: user });
        } catch (error) {
            res.status(404).json({
                message: "No se encontró el usuario",
                error: error.sqlMessage,
            });
        }
    };

    // ==================================================
    // Check username
    // ==================================================
    static checkUsername = async (req: Request, res: Response) => {
        const { username } = req.body;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.find({ where: { username } });
            res.json({ resulsts: user });
        } catch (error) {
            res.status(404).json({
                message: "No se encontró el usuario",
                error: error.sqlMessage,
            });
        }
    };

    // ==================================================
    // Resend activation code
    // ==================================================
    static resendActivationCode = async (req: Request, res: Response) => {
        const { email } = req.body;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.find({ where: { email } });

            res.json({ resulsts: user });
        } catch (error) {
            res.status(404).json({
                message: "No se encontró el usuario",
                error: error.sqlMessage,
            });
        }
    };
}

export default AccountController;
