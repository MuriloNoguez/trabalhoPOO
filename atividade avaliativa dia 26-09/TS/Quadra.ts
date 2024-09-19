export class Quadra {
    nome: string;
    esporte: string;
    horariosI: string;
    horariosF: string;


    constructor(nome: string) {
        this.nome = nome;
        this.esporte = "";
        this.horariosI = ""; 
        this.horariosF = "";
    }
}

export class Agendamento {
    quadra: Quadra;
    data: string;
    horario: string;
    nomeCliente: string;

    constructor(quadra: Quadra) {
        this.quadra = quadra;
        this.data = "";
        this.horario = "";
        this.nomeCliente = "";
    }
}