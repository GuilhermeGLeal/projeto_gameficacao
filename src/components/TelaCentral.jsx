import BarraData from "../components/BarraData";
import Pessoa from "../components/Pessoa";
import { useState, useEffect } from "react";



const TelaCentral = (props) => {
  
 
  const [estagiarios, setEstagiarios] = useState([]);
  const [list, setList] = useState([]);
  const [estado, setEstado] = useState();

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
                setEstado(estagiarios[list.length])
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

    const retornaDataFormatada = dataori => {

    if(dataori){
 
     let [dia, mes, ano] = dataori.split('/')
      return new Date(ano, mes-1, dia)
    }
    return new Date()
   
  }

  let barraData;
  let pessoas;

  const retornaMaiorPontuacao = (vitor, gomes, hudson, joao) =>{

    let pontos = [vitor, gomes, hudson, joao]
    return  Math.max(...pontos);
  }
 
  const renderizaCond = _ =>{

      if(estado && estado.gsx$data.$t){

          let vitor_pontos = parseInt(estado.gsx$vitorrocha.$t);
          let gomes_pontos = parseInt(estado.gsx$guilhermeleal.$t);
          let joao_pontos = parseInt(estado.gsx$joãocalado.$t);
          let hudson_pontos = parseInt(estado.gsx$hudsonpedroso.$t);
          let dataformatada = retornaDataFormatada(estado.gsx$data.$t)
          let maior_pontuacao = retornaMaiorPontuacao(vitor_pontos, gomes_pontos, hudson_pontos, joao_pontos)

          barraData = <BarraData key={1} dateatual={dataformatada}/>
          pessoas =  
          <div className="classificacao">
            <Pessoa
                key={4}
                nome="Guilherme Gomes"
                pontos={gomes_pontos}
                maior_pontuacao = {maior_pontuacao}
                dateatual={dataformatada}
            />
             <Pessoa
              key={3}
              nome="Hudson"
              pontos={hudson_pontos}
              maior_pontuacao = {maior_pontuacao}
              dateatual={dataformatada}
            />
             <Pessoa
              key={2}
              nome="João Calado"
              pontos={joao_pontos}
              maior_pontuacao = {maior_pontuacao}
              dateatual={dataformatada}
            />
            <Pessoa
              key={1}
              nome="Vitor Rocha"
              pontos={vitor_pontos}
              maior_pontuacao = {maior_pontuacao}
              dateatual={dataformatada}
            /> 

          </div>
      }
      else{

        barraData = <p>Está em carregamento, por favor espere!!</p>
        pessoas = ""
      }
  }
  return (
    
    <>      
      
      {renderizaCond()}

      {barraData}
       {pessoas}                
      
    
    </>
  
  );
};

export default TelaCentral;
