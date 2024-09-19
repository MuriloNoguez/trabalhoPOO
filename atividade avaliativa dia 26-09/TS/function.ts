import fs from 'fs';
import { Quadra } from './Quadra';


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
