import '../style/components/pessoa_info.css'
import icon from "../imgs/person_icone.png"
import calculo from '../js/calcularData.js'

const Pessoa = (props) =>{
    
    const dateFinal = new Date(2021, 11, 1)
    let imagem;
    let pontos;
    let nome;
    
    let diferenca_pro_maior = props.maior_pontuacao - props.pontos
    let posicao = props.pontos >= 0 ? ((calculo.retornaPosicao(dateFinal.getTime(), props.dateatual.getTime())) - (diferenca_pro_maior)/(props.maior_pontuacao/1.5)) : 0
    
    if(props.nome){
        nome = <span> {props.nome} </span>
        imagem = <img className="img" src={icon} alt=""></img>
        pontos = <span> {props.pontos} pontos </span>
    }          
    else{
        imagem = nome = pontos = "";
    } 
  
    return(

        <div className="pessoa" style={{marginLeft: posicao+'%'}}>
            {nome}
            {imagem}
            {pontos}
        </div>
    )
}


export default Pessoa