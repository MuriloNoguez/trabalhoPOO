import Prompt from "prompt-sync";
import * as fs from 'fs';
import { Quadra } from "./Quadra";
import { salvarQuadras } from "./function";
import { carregarQuadras } from "./function";

while(true){
const teclado = Prompt();
console.log("Login");
const usuario = teclado("Usuário: ");
const senha = teclado("Senha: ");
// const quadras: Quadra[] = [];
const quadras: Quadra[] = carregarQuadras();



switch (usuario) {
    case "admin":
        if (senha === "admin") {
            console.log("============================================");
            console.log("Bem-vindo, admin!");
            console.log("============================================");
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
                        const quadra = new Quadra(nome); 
                        quadra.esporte = esporte;
                        quadras.push(quadra); 
                        console.log("Quadra cadastrada com sucesso!");
                        salvarQuadras(quadras);""
                        break;
                    case 2:
                        console.log("Funcionalidade de editar quadras ainda não implementada.");
                        break;
                    case 3:
                        console.log("Listando quadras...");
                        if (quadras.length === 0) {
                            console.log("Nenhuma quadra cadastrada.");
                        } else {
                            console.table(quadras);
                        break; 
                        }
                    default:
                        console.log("Saindo...");
                        break;
            }
        } } 
        else {
            console.log("Senha incorreta!");
        }
        break;
    case "user":
        if (senha === "user") {
            console.log("============================================");
            console.log("Bem-vindo, user!");
            console.log("============================================");

            while (true) {
                console.log("1 - Listar quadras");
                console.log("2 - Sair");

                const opcao: number = +teclado("Escolha uma opção: ");
                console.log("============================================");
                if (opcao === 2) {
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
                        }
                        break;
                    default:
                        console.log("Saindo...");
                        break;
                }
            }
            
        } else {
            console.log("Senha incorreta!");
        }
        break;
    default:
        console.log("Usuário não encontrado!");
        break;
}
}