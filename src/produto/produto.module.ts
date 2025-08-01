import { Module } from "@nestjs/common";
import { Produto } from "./entities/produto.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.service";

@Module({
    imports:[TypeOrmModule.forFeature([Produto])],
    controllers: [ProdutoController],
    providers: [ProdutoService],
    exports: [],
})
export class ProdutoModule{} 
