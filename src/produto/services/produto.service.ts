import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../entities/produto.entity';
import { DeleteResult, ILike, Repository, In } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { ProdutoDto } from '../dto/produto.dto';
import { Categoria } from './../../categoria/entities/categoria.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async listarSaudaveis(): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: { saudavel: true },
      relations: {
        categoria: true,
      },
    });
  }

  async create(produtoDto: ProdutoDto): Promise<Produto> {
  // tenta achar categoria pela descrição
  let categoria = await this.categoriaService.findAllByDescricao(produtoDto.categoria);

  if (!categoria || categoria.length === 0) {
    // cria uma nova categoria se não existir
    const novaCategoria = new Categoria();
    novaCategoria.descricao = produtoDto.categoria; // ✅ usa a descrição recebida
    categoria = [await this.categoriaService.create(novaCategoria)];
  }

  // cria entidade produto
  const produto = this.produtoRepository.create({
    ...produtoDto,
    categoria: categoria[0], // ✅ atribui categoria encontrada/criada
  });

  return await this.produtoRepository.save(produto);
}


  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
