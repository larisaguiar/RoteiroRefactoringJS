var formatarMoeda = require("./util.js")

function gerarFaturaStr(fatura, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
  
    for (let apre of fatura.apresentacoes) {
      let total = calc.calcularTotalApresentacao(apre);
      faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(total)} (${apre.audiencia} assentos)\n`;
    }
  
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
  
    return faturaStr;
  }
  /*
  function gerarFaturaHTML(fatura, pecas) {
    let faturaHTML = `<html>\n<p> Fatura ${fatura.cliente} </p>\n<ul>\n`;
  
    for (let apre of fatura.apresentacoes) {
      let total = calc.calcularTotalApresentacao(pecas, apre);
      faturaHTML += `<li> ${getPeca(pecas, apre).nome}: ${formatarMoeda(total)} (${apre.audiencia} assentos) </li>\n`;
    }
  
    faturaHTML += `</ul>\n<p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))} </p>\n`;
    faturaHTML += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} </p>\n</html>`;
  
    return faturaHTML;
  }*/
  
module.exports = gerarFaturaStr;
