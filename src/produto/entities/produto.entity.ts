import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNumber()
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  @IsDate()
  @Type(() => Date)
  @Column({ type: 'date', nullable: true })
  validade: Date;

  @IsBoolean()
  @Column({ default: true })
  disponibilidade: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
