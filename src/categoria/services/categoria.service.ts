import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) { }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    let categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        produto: true,
      },
    });

    if (!categoria)
      throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND,);

    return categoria;
  }


  async findAllByDescricao(descricao: string): Promise<Categoria[]> {
    if (!descricao) {
      throw new HttpException('Descrição não informada!', HttpStatus.BAD_REQUEST);
    }

    const categorias = await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`)
      },

      relations: {
        produto: true,
      },
    });

    if (categorias.length === 0) {
      throw new HttpException('Nenhuma categoria encontrada com essa descrição!', HttpStatus.NOT_FOUND);
    }

    return categorias;
  }

  async create(Categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(Categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.categoriaRepository.delete(id);
  }
}
