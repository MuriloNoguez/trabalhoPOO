import Prompt from "prompt-sync";
import { Quadra, Agendamento } from "./Quadra";
import { salvarQuadras, carregarQuadras, carregarAgendamentos, salvarAgendamento, calculoHora } from "./function";

export const teclado = Prompt();
console.log("Login");
const usuario = teclado("Usuário: ");
const senha = teclado("Senha: ");
const horarios = new Array();
const quadras: Quadra[] = carregarQuadras();
const agendamentos: Agendamento[] = carregarAgendamentos([]);

if (usuario === "admin" && senha === "admin") {
    console.log("============================================");
    console.log("Bem-vindo, admin!");
    console.log("============================================");

    while (true) {
        console.log("1 - Cadastrar quadra");
        console.log("2 - Editar quadras");
        console.log("3 - Listar quadras");
        console.log("4 - Sair");

        const opcao: number = +teclado("Escolha uma opção: ");
        console.log("============================================");

        if (opcao === 4) {
            console.log("Saindo...");
            break;
        }

        switch (opcao) {
            case 1:
                const nome = teclado("Nome da quadra: ");
                const esporte = teclado("Esporte: ");
                const horarioI = teclado("Digite o primiero hora de funcionamento(24Hrs): ");
                const horarioF = teclado("Digite a hora final de funcionamento(24Hrs)): ");
                if (horarioI > horarioF) {
                    console.log("Horário de funcionamento inválido.");
                    break;
                } else {
                const quadra = new Quadra(nome); 
                quadra.horariosI = horarioI;
                quadra.horariosF = horarioF;
                quadra.esporte = esporte;
                quadras.push(quadra); 
                console.log("Quadra cadastrada com sucesso!");
                salvarQuadras(quadras);
                calculoHora(horarioI);
                break;}
            case 2:
                console.log("Funcionalidade de editar quadras ainda não implementada.");
                break;
            case 3:
                console.log("Listando quadras...");
                if (quadras.length === 0) {
                    console.log("Nenhuma quadra cadastrada.");
                } else {
                    console.table(quadras);
                }
                break;
            default:
                console.log("Opção inválida.");
                break;
        }
    }
} else if (usuario === "user" && senha === "user") {
    console.log("============================================");
    console.log("Bem-vindo, user!");
    console.log("============================================");

    while (true) {
        console.log("1 - Listar quadras");
        console.log("2 - Ver agendamentos");
        console.log("3 - Sair");

        const opcao: number = +teclado("Escolha uma opção: ");
        console.log("============================================");

        if (opcao === 3) {
            console.log("Saindo...");
            break;
        }

        switch (opcao) {
            case 1:
                console.log("Listando quadras...");
                if (quadras.length === 0) {
                    console.log("Nenhuma quadra cadastrada.");
                } else {
                    console.table(quadras);
                    const pergunta = teclado("Deseja agendar uma quadra? (s/n) ");
                    if (pergunta === "s") {
                    const indice = +teclado("Escolha o índice da quadra para agendar: ");
            
                    const quadra = quadras[indice];
                    if (quadra) {
                        const agendamento = new Agendamento(quadra);
                        agendamento.data = teclado("Data: ");
                        agendamento.horario = teclado("Horário: ");
                        agendamento.nomeCliente = teclado("Nome do cliente: ");
                        agendamentos.push(agendamento);
                        salvarAgendamento(agendamentos);
                        console.log("Agendamento realizado com sucesso!");
                    } else {
                        console.log("Índice inválido.");
                    }
                } else{break;}} 
                break;
                case 2:
                    console.log("Listando agendamentos...");
                    if (agendamentos.length === 0) {
                        console.log("Nenhum agendamento encontrado.");
                    } else {
                        const agendamentosFormatados = agendamentos.map((agendamento) => ({
                            Nome: agendamento.quadra.nome,
                            Esporte: agendamento.quadra.esporte,
                            Data: agendamento.data,
                            Hora: agendamento.horario,
                            'Nome do Cliente': agendamento.nomeCliente
                        }));
                        
                        console.table(agendamentosFormatados);
                    }
                    break;
        }
    }
} else {
    console.log("Usuário ou senha incorretos.");
}
