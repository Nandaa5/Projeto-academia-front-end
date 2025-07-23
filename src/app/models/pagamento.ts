import { Matricula } from "./matricula";

export class Pagamento {
    id!: number;
    dataVencimento!: Date;
    dataPagamento!: Date;
    valor!: number;
    matricula!: Matricula; 

}
