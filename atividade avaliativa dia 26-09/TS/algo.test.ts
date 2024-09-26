import { Quadra, Agendamento } from './Quadra';
import { salvarQuadras, carregarQuadras, salvarAgendamento, calcularHorariosDisponiveis, calculoHora } from './function';
import fs from 'fs';

// Mock da função teclado
jest.mock('./index', () => ({
    teclado: jest.fn((prompt: string) => {
        if (prompt === "Data: ") return "2024-09-27"; // Retorna uma data padrão
        if (prompt === "Horário: ") return "10:00"; // Retorna um horário padrão
        if (prompt === "Nome do cliente: ") return "João"; // Retorna um nome padrão
        return ""; // Retorna vazio para outros prompts
    }),
}));

describe('Teste de Funções do Sistema de Reserva de Quadras', () => {
    
    const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync'); // Mocka a função writeFileSync
    const mockReadFileSync = jest.spyOn(fs, 'readFileSync'); // Mocka a função readFileSync

    beforeAll(() => {
        // Limpar mocks antes de cada teste, se necessário
        mockWriteFileSync.mockClear();
        mockReadFileSync.mockClear();
    });

    afterAll(() => {
        jest.restoreAllMocks(); // Restaura as funções mockadas após os testes
    });

    test('Criação de quadra esportiva', () => {
        const quadra = new Quadra("Quadra 1");
        quadra.esporte = "Futebol";
        quadra.horariosI = "08:00";
        quadra.horariosF = "22:00";

        expect(quadra.nome).toBe("Quadra 1");
        expect(quadra.esporte).toBe("Futebol");
        expect(quadra.horariosI).toBe("08:00");
        expect(quadra.horariosF).toBe("22:00");
    });

    test('Salvar e carregar quadras', () => {
        const quadras: Quadra[] = [
            { nome: "Quadra 1", esporte: "Futebol", horariosI: "08:00", horariosF: "22:00" }
        ];

        // Simula a chamada da função salvarQuadras
        salvarQuadras(quadras);

        // Verifica se writeFileSync foi chamado corretamente
        expect(mockWriteFileSync).toHaveBeenCalledWith(expect.any(String), expect.any(String), expect.any(Object));

        // Simula o retorno de readFileSync
        mockReadFileSync.mockReturnValueOnce(`Nome: Quadra 1, Esporte: Futebol, Horário Inicial: 08:00, Horário Final: 22:00\n`);

        const quadrasCarregadas = carregarQuadras();
        expect(quadrasCarregadas).toHaveLength(1);
        expect(quadrasCarregadas[0].nome).toBe("Quadra 1");
    });

    test('Reserva de quadra e verificação de disponibilidade', () => {
        const quadra = new Quadra("Quadra 1");
        quadra.esporte = "Futebol";
        quadra.horariosI = "08:00";
        quadra.horariosF = "22:00";

        const agendamentos: Agendamento[] = [];
        const agendamento = new Agendamento(quadra);
        agendamento.data = "2024-09-27";
        agendamento.horario = "10:00";
        agendamento.nomeCliente = "João";

        agendamentos.push(agendamento);
        salvarAgendamento(agendamentos);

        const horariosDisponiveis = calcularHorariosDisponiveis(quadra, agendamentos, "2024-09-27");
        expect(horariosDisponiveis).not.toContain("10:00");
    });

    test('Listar quadras disponíveis', () => {
        const quadras: Quadra[] = [
            { nome: "Quadra 1", esporte: "Futebol", horariosI: "08:00", horariosF: "22:00" },
            { nome: "Quadra 2", esporte: "Basquete", horariosI: "09:00", horariosF: "18:00" }
        ];

        const quadrasFormatadas = quadras.map(quadra => ({
            "Nome da Quadra": quadra.nome,
            "Esporte": quadra.esporte,
            "Horário de Início": quadra.horariosI,
            "Horário Final": quadra.horariosF
        }));

        expect(quadrasFormatadas).toHaveLength(2);
        expect(quadrasFormatadas[0]['Nome da Quadra']).toBe("Quadra 1");
    });

    test('Cancelar uma reserva', () => {
        const quadra = new Quadra("Quadra 1");
        const agendamento = new Agendamento(quadra);
        agendamento.data = "2024-09-27";
        agendamento.horario = "10:00";
        agendamento.nomeCliente = "João";

        let agendamentos = [agendamento];

        // Remover a reserva (cancela a reserva)
        agendamentos = agendamentos.filter(a => a.data !== "2024-09-27" || a.horario !== "10:00");
        expect(agendamentos).toHaveLength(0);
    });

    test('Calcular horários disponíveis', () => {
        const quadra = new Quadra("Quadra 1");
        quadra.horariosI = "08:00";
        quadra.horariosF = "12:00";

        const horarios = calculoHora("08:00", "12:00");
        expect(horarios).toEqual(["08:00", "09:00", "10:00", "11:00", "12:00"]);
    });

    test('Verificar reserva em quadra ocupada', () => {
        const quadra = new Quadra("Quadra 1");
        quadra.horariosI = "08:00";
        quadra.horariosF = "22:00";

        const agendamentos: Agendamento[] = [
            { quadra, data: "2024-09-27", horario: "10:00", nomeCliente: "João" }
        ];

        const horariosDisponiveis = calcularHorariosDisponiveis(quadra, agendamentos, "2024-09-27");
        expect(horariosDisponiveis).not.toContain("10:00");
    });

});
