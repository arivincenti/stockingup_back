import { Request, Response } from "express";
import { Email } from "../entity/email";

export class EmailController {
    // ==================================================
    // Send email
    // ==================================================
    static sendEmail = async (res: Response, e: Email) => {
        try {
            const mailjet = require("node-mailjet").connect(
                "da5431eefc580e4704eb52514e0c28ae",
                "13155549f9a05c45090f52d35c2f6433"
            );
            const request = mailjet.post("send", { version: "v3.1" }).request({
                Messages: [
                    {
                        From: {
                            Email: e.fromEmail,
                            Name: e.fromName,
                        },
                        To: [
                            {
                                Email: e.toEmail,
                                Name: e.toName,
                            },
                        ],
                        Subject: e.subject,
                        TextPart: e.textPart,
                        HTMLPart: e.HTML,
                        CustomID: "AppGettingStartedTest",
                    },
                ],
            });

            await request;

            res.json({ results: "Email enviado con éxito" });
        } catch (error) {
            res.status(500).json({
                message: "Error al enviar el email",
                error: error,
            });
        }
    };
}
