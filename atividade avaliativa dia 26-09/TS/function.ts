import fs from 'fs';
import { Agendamento, Quadra } from './Quadra';
import { teclado } from './index';

//////////////////////SALVA QUADRAS////////////////////////
export function salvarQuadras(quadras: Quadra[]) {
    const dados = quadras.map(quadra => `Nome: ${quadra.nome}, Esporte: ${quadra.esporte}`).join('\n');
    fs.writeFileSync('quadras.txt', dados, { encoding: 'utf8', flag: 'w' });
}

//////////////////////CARREGA QUADRAS////////////////////////
export function carregarQuadras(): Quadra[] {
    if (!fs.existsSync('quadras.txt')) {  
        console.log("Nenhuma quadra cadastrada. Arquivo não encontrado.");
        return [];
    }

    const dados = fs.readFileSync('quadras.txt', { encoding: 'utf8' });
    const linhas = dados.split('\n').filter(linha => linha.trim() !== '');

    const quadras: Quadra[] = linhas.map(linha => {
        const [nome, esporte] = linha.replace("Nome: ", "").split(", Esporte: ");
        const quadra = new Quadra(nome);
        quadra.esporte = esporte;
        return quadra;
    });

    return quadras;
}

//////////////////////AGENDA QUADRAS////////////////////////
export function agendarQuadra(quadra: Quadra): Agendamento {
    const agendamento = new Agendamento(quadra);
    agendamento.data = teclado("Data: ");
    agendamento.horario = teclado("Horário: ");
    agendamento.nomeCliente = teclado("Nome do cliente: ");
    return agendamento;
}

/////////////////////SALVA AGENDAMENTO////////////////////////
export function salvarAgendamento(agendamentos: Agendamento[]) {
    const dados = agendamentos.map(agendamento => 
        `Nome: ${agendamento.quadra.nome}, Esporte: ${agendamento.quadra.esporte}, Data: ${agendamento.data}, Horário: ${agendamento.horario}, Cliente: ${agendamento.nomeCliente}`
    ).join('\n');


    fs.writeFileSync('agendamentos.txt', dados + '\n', { encoding: 'utf8', flag: 'a' });
}

/////////////////////CARREGA AGENDAMENTO////////////////////////
export function carregarAgendamentos(p0: never[]): Agendamento[] {
    console.log("Agendamentos cadastrados:");
    if (!fs.existsSync('agendamentos.txt')) {
        console.log("Nenhum agendamento encontrado. Arquivo não encontrado.");
        return [];
    }

    const dados = fs.readFileSync('agendamentos.txt', { encoding: 'utf8' });
    const linhas = dados.split('\n').filter(linha => linha.trim() !== '');

    const agendamentos: Agendamento[] = linhas.map(linha => {
        const partes = linha.split(", ");
        const quadraNome = partes[0].replace("Nome: ", "");
        const quadraEsporte = partes[1].replace("Esporte: ", "");
        const data = partes[2].replace("Data: ", "");
        const horario = partes[3].replace("Horário: ", "");
        const cliente = partes[4].replace("Cliente: ", "");

        const quadra = new Quadra(quadraNome);
        quadra.esporte = quadraEsporte;

        const agendamento = new Agendamento(quadra);
        agendamento.data = data;
        agendamento.horario = horario;
        agendamento.nomeCliente = cliente;

        return agendamento;
    });

    return agendamentos;
}
