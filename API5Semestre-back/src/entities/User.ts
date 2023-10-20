import { Entity, Column,ObjectIdColumn, ObjectID,BeforeInsert, BeforeUpdate} from "typeorm"
import { IsEmail, IsNotEmpty} from "class-validator";
import * as bcrypt from "bcrypt";
@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    @IsNotEmpty({ message: 'O Nome é obrigatório ' })
    nome: string

    @Column()
    @IsNotEmpty({ message: 'O Sobrenome é obrigatório ' })
    sobrenome: string

    @Column({ unique: true })
    @IsNotEmpty({ message: 'O Email é obrigatório ' })
    @IsEmail({}, { message: 'Para o Email é necessario @ e o .com' })
    email: string

    @Column({ unique: true })
    @IsNotEmpty({ message: 'O Telefone é obrigatório ' })
    telefone1: string

    @Column()
    telefone2: string

    @Column()
    @IsNotEmpty({ message: 'A Matricula é obrigatório  ' })
    matricula: string

    @Column({ unique: true})
    @IsNotEmpty({ message: 'O CPF é obrigatório ' })
    cpf: string

    @Column()
    foto: []

    @Column()
    @IsNotEmpty({ message: 'O Senha é obrigatório ' })
    senha: string

    @BeforeInsert()
    @BeforeUpdate()
    hashpassword() {
        this.senha = bcrypt.hashSync(this.senha, 10);
    
    }


}
