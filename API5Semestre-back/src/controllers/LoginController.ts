import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import { authorization, generateToken } from "../middlewares";

class LoginController {

    async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;
        try {
            const user: User | undefined = await AppDataSource.manager.findOneBy(User, { email });

            if (!user) {
                return res.status(401).json({ error: "emailNotFound" });
            }

            // Comparar a senha fornecida com a senha armazenada no banco de dados
            const isPasswordValid = await bcrypt.compare(senha, user.senha);

            if (isPasswordValid) {
                // Se a senha estiver correta, gerar um JWT e enviá-lo na resposta
                const token = await generateToken({ email });
                res.cookie("jwt", token);
                return res.json({ success: true, token });
            } else {
                // Se a senha estiver incorreta, retornar uma mensagem de erro
                return res.status(401).json({ error: "senhaIncorreta" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    async checkAuthentication(req: Request, res: Response): Promise<Response> {
        try {
            let token = req.header("Authorization");

            if (!token) {
                // Se o token não estiver no header, verifique no cookie
                token = req.cookies.jwt;
            }

            if (!token) {
                return res.status(401).json({ error: "Token não fornecido" });
            }

            // Verifique o token JWT usando a função de autorização
            authorization(req, res, (err) => {
                if (err) {
                    return res.status(401).json({ error: "Token inválido" });
                }
                return res.json({ success: true, user: res.locals });
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao verificar autenticação" });
        }
    }

    async logOut(req: Request, res: Response): Promise<Response> {
        res.clearCookie("jwt");
        return res.json({ success: true });
    }

}

export default new LoginController();
