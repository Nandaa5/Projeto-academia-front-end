import { Pessoa } from "./pessoas";

export class Usuario {
    id!: number;
    login!: string;
    senha!:string;
    tipo!: string;
    pessoa!: Pessoa;
}


