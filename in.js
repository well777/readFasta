const fs = require('fs');
const path = require('path');

function lerArquivoFasta(caminhoArquivo) {
    try {
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
        return conteudo;
    } catch (erro) {
        console.error(`Erro ao ler o arquivo: ${erro.message}`);
        return null;
    }
}

function processarFasta(conteudo) {
    const sequencias = [];
    const linhas = conteudo.split('\n');
    let sequenciaAtual = { id: '', descricao: '', sequencia: '' };

    linhas.forEach(linha => {
        if (linha.startsWith('>')) {
            // Salvando a sequência anterior, se existir
            if (sequenciaAtual.id) {
                sequencias.push(sequenciaAtual);
            }

            const [id, ...descricao] = linha.slice(1).split(' ');
            sequenciaAtual = { id, descricao: descricao.join(' '), sequencia: '' };
        } else {
            sequenciaAtual.sequencia += linha.trim();
        }
    });
    if (sequenciaAtual.id) {
        sequencias.push(sequenciaAtual);
    }
    return sequencias;
}
function contarCaracteres(sequencia) {
    const contagem = {};
    for (const char of sequencia) {
        if (contagem[char]) {
            contagem[char]++;
        } else {
            contagem[char] = 1;
        }
    }
    return contagem;
}
const caminhoArquivo = path.join(__dirname, 'seu_arquivo.fasta');
const conteudoFasta = lerArquivoFasta(caminhoArquivo);
if (conteudoFasta) {
    const sequencias = processarFasta(conteudoFasta);
    sequencias.forEach(seq => {
        console.log(`ID: ${seq.id}`);
        console.log(`Descrição: ${seq.descricao}`);
        console.log(`Sequência: ${seq.sequencia}`);
        console.log('Contagem de caracteres:', contarCaracteres(seq.sequencia));
        console.log('---');
    });
}
