import fs from 'fs';
import { Agendamento, Quadra } from './Quadra';
import { teclado } from './index';

//////////////////////SALVA QUADRAS////////////////////////
export function salvarQuadras(quadras: Quadra[]) {
    const dados = quadras.map(quadra => `Nome: ${quadra.nome}, Esporte: ${quadra.esporte}, Horário Inicial: ${quadra.horariosI}, Horário Final: ${quadra.horariosF}`).join('\n');
    fs.writeFileSync('quadras.txt', dados, { encoding: 'utf8', flag: 'a' });
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
        // Dividindo os campos com base no formato salvo
        const [nome, esporte, horarioInicial, horarioFinal] = linha
            .replace("Nome: ", "")
            .replace("Esporte: ", "")
            .replace("Horário Inicial: ", "")
            .replace("Horário Final: ", "")
            .split(", ");

        const quadra = new Quadra(nome);
        quadra.esporte = esporte;
        quadra.horariosI = horarioInicial;
        quadra.horariosF = horarioFinal;

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

/////////////////////Calcula Horário////////////////////////
export function calculoHora(horarioInicio: string, horarioFim: string): string[] {
    const horarios: string[] = [];

    // Validação dos horários no formato HH:mm
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regex.test(horarioInicio) || !regex.test(horarioFim)) {
        throw new Error("Formato de horário inválido. Use HH:mm.");
    }

    // Convertendo horários para minutos
    const [horaInicio, minutoInicio] = horarioInicio.split(':').map(Number);
    const [horaFim, minutoFim] = horarioFim.split(':').map(Number);

    // Converte horas e minutos em total de minutos a partir da meia-noite
    let minutosAtuais = horaInicio * 60 + minutoInicio;
    const minutosFim = horaFim * 60 + minutoFim;

    // Itera de 30 em 30 minutos até chegar ao horário final
    while (minutosAtuais <= minutosFim) {
        const horas = Math.floor(minutosAtuais / 60);
        const minutos = minutosAtuais % 60;
        const horarioFormatado = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
        horarios.push(horarioFormatado);

        // Incrementa em 30 minutos
        minutosAtuais += 60;
    }

    return horarios;
}

export function formatarQuadras(quadras: Quadra[]) {
    return quadras.map(quadra => ({
        "Nome da Quadra": quadra.nome,
        "Esporte": quadra.esporte,
        "Horário de Início": quadra.horariosI,
        "Horário Final": quadra.horariosF
    }));
}

/////////////////////Calcula Horário Disponível////////////////////////
export function calcularHorariosDisponiveis(quadra: Quadra, agendamentos: Agendamento[], data: string): string[] {
    const horariosDisponiveis = calculoHora(quadra.horariosI, quadra.horariosF);
    
    // Filtra horários já ocupados
    const horariosOcupados = agendamentos
        .filter(agendamento => agendamento.quadra.nome === quadra.nome && agendamento.data === data)
        .map(agendamento => agendamento.horario);

    // Retorna apenas os horários que não estão ocupados
    return horariosDisponiveis.filter(horario => !horariosOcupados.includes(horario));
}