import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity({ name: "tb_produtos" })
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsNumber()
    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    preco: number;

    @IsDate()
    @Column({ type: 'date', nullable: true })
    validade: Date;

    @IsBoolean()
    @Column({ default: true })
    disponibilidade: boolean;
}