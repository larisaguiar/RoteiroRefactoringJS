const { readFileSync } = require('fs');

function gerarFaturaStr(fatura, pecas) {
  // Função para formatar valores em moeda
  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor / 100);
  }

  // Função para calcular créditos
  function calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  // Função para obter a peça a partir da apresentação
  function getPeca(apresentacao) {
    return pecas[apresentacao.id];
  }

  // Função para calcular o total de cada apresentação
  function calcularTotalApresentacao(apre) {
    let total = 0;
    switch (getPeca(apre).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecida: ${getPeca(apre).tipo}`);
    }
    return total;
  }

  // Função para calcular o total de créditos acumulados
  function calcularTotalCreditos() {
    let totalCreditos = 0;
    for (let apre of fatura.apresentacoes) {
      totalCreditos += calcularCredito(apre);
    }
    return totalCreditos;
  }

  // Função para calcular o total da fatura
  function calcularTotalFatura() {
    let totalFatura = 0;
    for (let apre of fatura.apresentacoes) {
      totalFatura += calcularTotalApresentacao(apre);
    }
    return totalFatura;
  }

  // Corpo principal da função gerarFaturaStr
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  // Para cada apresentação, calcular os valores
  for (let apre of fatura.apresentacoes) {
    let total = calcularTotalApresentacao(apre);
    faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(total)} (${apre.audiencia} assentos)\n`;
  }

  // Adicionando o total da fatura e créditos acumulados
  faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura())}\n`;
  faturaStr += `Créditos acumulados: ${calcularTotalCreditos()} \n`;

  return faturaStr;
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);
