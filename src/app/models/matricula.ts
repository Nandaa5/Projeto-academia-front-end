import { Pessoa } from "./pessoas";
import { Planos } from "./planos";

export class Matricula {
    id!: number;
    numero!: number;
    data!: Date;
    situacao!: string;
    plano!: Planos; 
    pessoa!: Pessoa;
 
}
