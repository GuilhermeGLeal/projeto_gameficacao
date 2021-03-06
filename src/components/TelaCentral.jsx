import Pessoa from "../components/Pessoa";
import { useState, useEffect } from "react";

import "../style/components/pessoa_info.css";

const TelaCentral = (props) => {
  
  const [planilha, setPlanilha] = useState([{}]);
  let maior_pontuacao = 0

  const retornaModificado = (content) => {
    const retornaNome = (nomesheets) => {
      let nome;
      if (nomesheets.includes("hudson")) nome = "Hudson Pedroso";
      else if (nomesheets.includes("vitor")) nome = "Vitor Rocha";
      else if (nomesheets.includes("guilherme")) nome = "Guilherme Leal";
      else nome = "João Calado";

      return nome;
    };

    let pontuacao_total = content.split(",");
    let novo_vetor = pontuacao_total.map((item) => {
      return item.split(":");
    });

    let objetos = [];
    novo_vetor.forEach( item => {
      let obj = {};
      obj.nome = retornaNome(item[0]);
      obj.ponto = parseInt(item[1]);

      objetos.push(obj);
    });

    objetos.sort((item1, item2) => {
      if (item1.ponto > item2.ponto) return -1;
      return 1;
    });

    return objetos;
  };

  useEffect(() => {
    const getPlanilha = async () => {
      const endPoint =
        "https://spreadsheets.google.com/feeds/list/1AJt6VNVS0Qa4X3EP2KKcVJNpmrENHiYakFxx6u8bvQ8/oxlfih8/public/values?alt=json";
      const { feed: { entry} }  = await fetch(endPoint).then((resp) => resp.json());
      const { content:{$t}} = entry.pop();
      const objetos = retornaModificado($t);
      setPlanilha(objetos);
    };
    getPlanilha();
  }, []);

  let html;

    if (planilha.length > 0) {

      maior_pontuacao = planilha[0].ponto
      html = planilha.map(({ nome, ponto }) => (
        <Pessoa key={nome} nome={nome} pontos={ponto} maior_pontuacao={maior_pontuacao} />
      ));
    }
    else
      html = ""
  return (
  
    <div className="classificacao">
    {
      html
    }
    </div>
  )
};

export default TelaCentral;
