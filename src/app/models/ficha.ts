import { Pessoa } from "./pessoas";

export class Ficha {
    id!: number;
    data!: Date;
    descricao!: string;
    situacao!: string;
    pessoa!: Pessoa;

}
