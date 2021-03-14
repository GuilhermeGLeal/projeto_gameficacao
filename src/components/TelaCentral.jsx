import BarraData from "../components/BarraData";
import Pessoa from "../components/Pessoa";
import { useState, useEffect } from "react";
import '../style/components/pessoa_info.css'


const TelaCentral = (props) => {
  
 
  const [estagiarios, setEstagiarios] = useState([])
  const [list, setList] = useState([])
 
  const getPlan = async () => {
    const content = await fetch(
      'https://spreadsheets.google.com/feeds/list/1AJt6VNVS0Qa4X3EP2KKcVJNpmrENHiYakFxx6u8bvQ8/oxlfih8/public/values?alt=json'
    )
    .then(
      (resp) => resp.json()
    )

    const { feed } = content
    const { entry } = feed
    

    setEstagiarios(entry)
    setList([ entry[0] ])
  }

  useEffect(
    () => {
      getPlan()
    },
    []
  )

  useEffect(
    () => {
      
      if (estagiarios.length !== list.length) {
      
      
        setTimeout(
          () => {
            
            setList(old => {
              return [ ...old, estagiarios[list.length] ]
            })
          },
          2000
        )

        
      }
    },
    [list]
  )

  function apagaTudo() {
    
    
    // apagar ou atualizar os componentes existentes
    // para que nao repitam tudo novamente e sim apenas exibe em uma posicao na tela
    let nodeSection = document.getElementsByClassName('barraData')
    let nodediv = document.getElementsByClassName('classificacao')

    if(nodediv.parentNode && nodeSection.parentNode){
       nodeSection.parentNode.removeChild(nodeSection);
     nodediv.parentNode.removeChild(nodediv);
  
    }
   
  }
  const retornaDataFormatada = dataori => {

    // tem como chamar uma vez só?
    let [dia, mes, ano] = dataori.split('/')
    return new Date(ano, mes-1, dia)
  }

  const retornaMaiorPontuacao = item =>{

     // tem como chamar uma vez só?
    let pontos = [parseInt(item.gsx$vitorrocha.$t), parseInt(item.gsx$joãocalado.$t), parseInt(item.gsx$hudsonpedroso.$t),
    parseInt(item.gsx$guilhermeleal.$t)]

    return  Math.max(...pontos);
  }
 
  return (
 
    <div id="tela">
      {
        list.map((item, index) => (
        
       
        <>
        {apagaTudo()}
         <BarraData key={index} dateatual={retornaDataFormatada(item.gsx$data.$t)}/>
        
        <div className="classificacao">         
         
          <Pessoa
            key={index + 2}
            nome="vitor"
            pontos={parseInt(item.gsx$vitorrocha.$t)}
            maior_pontuacao = {retornaMaiorPontuacao(item)}
            dateatual={retornaDataFormatada(item.gsx$data.$t)}
          />
          <Pessoa
            key={index + 3}
            nome="joao"
            pontos={parseInt(item.gsx$joãocalado.$t)}
            maior_pontuacao = {retornaMaiorPontuacao(item)}
            dateatual={retornaDataFormatada(item.gsx$data.$t)}
          />
          <Pessoa
            key={index + 4}
            nome="hudson"
            pontos={parseInt(item.gsx$hudsonpedroso.$t)}
            maior_pontuacao = {retornaMaiorPontuacao(item)}
            dateatual={retornaDataFormatada(item.gsx$data.$t)}
          />
          <Pessoa
            key={index + 5}
            nome="gomes"
            pontos={parseInt(item.gsx$guilhermeleal.$t)}
            maior_pontuacao = {retornaMaiorPontuacao(item)}
            dateatual={retornaDataFormatada(item.gsx$data.$t)}
          />
         
      
          </div>
          </>
      ))}

    </div>
  
  );
};

export default TelaCentral;
