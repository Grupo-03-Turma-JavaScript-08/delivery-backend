import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { Repository } from "typeorm";
//import { CategoriaService } from "../../categoria/services/categoria.service";



@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        //private categoriaService: CategoriaService
    ){}

    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find();
    }

    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
        });

        if (!produto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

        return produto;
    }

    async create(produto: Produto): Promise<Produto> {

        return await this.produtoRepository.save(produto);

    }
}