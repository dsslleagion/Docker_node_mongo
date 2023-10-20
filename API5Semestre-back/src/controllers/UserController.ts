import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { ObjectID } from 'mongodb'
import { validate } from 'class-validator';
import 'dotenv/config';
import * as bcrypt from "bcrypt";


class UserController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, sobrenome, email, telefone1, telefone2, matricula, cpf, foto, senha } = req.body

      const obj = new User()
      obj.nome = nome
      obj.sobrenome = sobrenome
      obj.email = email
      obj.telefone1 = telefone1
      obj.telefone2 = telefone2
      obj.matricula = matricula
      obj.cpf = cpf
      obj.foto = foto
      obj.senha = senha

      const errors = await validate(obj)
      if (errors.length === 0) {
        await AppDataSource.manager.save(User, obj)
        return res.json({ message: "Usuario cadastrado com sucesso" })
      } else {
        return res.json(errors)

      }
    } catch (error) {

      return res.json({ error: error })
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await AppDataSource.getRepository(User).find()
      return res.json(usuarios)

    } catch (error) {
      return res.json({ error: "Erro ao listar os Usuarios" })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body

      const user = AppDataSource.getRepository(User)
      const remove = await user.findOne(id)
      await user.remove(remove)

      return res.json({ message: "Usuario removido com sucesso" })

    } catch (error) {
      return res.json({ error: "Erro ao deletar o Usuario" })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const { nome, sobrenome, email, telefone1, telefone2, matricula, cpf, foto, senha} = req.body

      if (senha) {
        return res.json({ error: "Não pode conter senha. " })
      }

      const userid = new ObjectID(id)

      const usuario = AppDataSource.getRepository(User)

      const obj = await usuario.findOne(userid)

      obj.nome = nome
      obj.sobrenome = sobrenome
      obj.email = email
      obj.telefone1 = telefone1
      obj.telefone2 = telefone2
      obj.matricula = matricula
      obj.cpf = cpf
      obj.foto = foto

      const errors = await validate(obj)
      if (errors.length === 0) {
        await usuario.save(obj)
        return res.json(obj)
      } else {
        return res.json(errors)
      }

    } catch (error) {
      return res.json({ error: error })
    }
  }


  public async one(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const userid = new ObjectID(id)

    try {
      const usuario = await AppDataSource.getRepository(User).findOne(userid)

      return res.json(usuario);
    } catch (error) {
      console.error(error);
      return res.json({ error: 'Erro ao buscar o Usuario' });
    }
  }

  // public async notEmail(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { email } = req.body

  //     const userRepository = AppDataSource.getRepository(User)
  //     const user = await userRepository.findOne({ where: { email } })

  //     if (!user) {
  //       return res.json({ error: "Email não encontrado." })
  //     }

  //     const code = Math.floor(100000 + Math.random() * 900000)
  //     // console.log(code)


  //     user.a2f = code.toString()

  //     await userRepository.save(user)

  //     const conteudoEmail = {
  //       service_id: `${process.env.SERVICE_ID}`,
  //       template_id: `${process.env.TEMPLATE_ID}`,
  //       user_id: `${process.env.PUBLIC_KEY}`,
  //       template_params: {
  //         email: email,
  //         code: code
  //       }
  //     };
  //     const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8'
  //       },
  //       body: JSON.stringify(conteudoEmail)
  //     });

  //     if (response.ok) {
  //       console.log('SUCCESS!', response.status, response.statusText);
  //       return res.json({ message: 'Código de autenticação enviado com sucesso.' });
  //     } else {
  //       console.log('FAILED...', response.status, response.statusText);
  //       return res.status(response.status).json({ error: 'Erro ao enviar o Código de autenticação ' });
  //     }

  //   } catch (error) {
  //     return res.json({ error: error })
  //   }
  // }

  // public async notSms(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { telefone1 } = req.body

  //     const userRepository = AppDataSource.getRepository(User)
  //     const user = await userRepository.findOne({ where: { telefone1 } })
  //     console.log(user)

  //     if (!user) {
  //       return res.json({ message: "Telefone não regristrado." })
  //     }

  //     const code = Math.floor(100000 + Math.random() * 900000)
  //     console.log(code)

  //     user.a2f  = code.toString()

  //     await userRepository.save(user)

  //     const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  //     client.messages
  //       .create({
  //         body: `Imagem - Seu código de verificação é:${code}`,
  //         from: `${process.env.TWILIO_PHONE_NUMBER}`,
  //         to: `${telefone1}`
  //       })
  //       .then(message => console.log(message.sid));
  //       return res.json({ message: 'Código de autenticação enviado com sucesso.' });

  //   } catch (error) {
  //     console.log(error)
  //     return res.json({ error: error })
  //   }
  // }

  // public async valNot(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { email, telefone1, code } = req.body

  //     const cond = email ? { email } : { telefone1 };
      

  //     const userRepository = AppDataSource.getRepository(User)
  //     const user = await userRepository.findOne({ where: cond });
  
  //     if (!user) {
  //       return res.json({ error: "Precisa conter o Email ou o Telefone. " })
  //     }
  //     if (!code) {
  //       return res.json({ error: "Codigo não encontrado." })
  //     }
  //     const valid = await bcrypt.compare(code, user.a2f); 


  //     if (!valid){
  //       return res.json({ error: "Codigo incorreto." })
  //     }
  //     return res.json({ message: "Código Válido." });

  //   } catch (error) {
  //     return res.json({ error: error })

  //   }
  // }
  public async atualizarSenha(req: Request, res: Response): Promise<Response> {
    try {
      const { email, telefone1, senha } = req.body

      const cond = email ? { email } : { telefone1 };
      

      const userRepository = AppDataSource.getRepository(User)
      const user = await userRepository.findOne({ where: cond });
  
      if (!user) {
        return res.json({ error: "Erro ao atualizar senha. " })
      }
      
      user.senha = senha;

      await userRepository.save(user);

      return res.json({ message: "Senha atualizada com sucesso!." });

    } catch (error) {
      return res.json({ error: error })

    }
  }

} export default new UserController();