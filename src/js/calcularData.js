module.exports.retornaPosicao = (dataFinal, dateAtual) =>{

    const dateInicial = new Date(2021, 1, 8)
  
  
    let duracaoDias = (Math.abs(dataFinal - dateInicial.getTime()));
    duracaoDias =  Math.ceil(duracaoDias / (1000 * 60 * 60 * 24)); 

    const diff = Math.abs(dateAtual - dateInicial.getTime()); 
    const diferenca_em_dias = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
    let posicao_atual = (diferenca_em_dias / duracaoDias) * 100
   
    return posicao_atual
}