import '../style/components/barraData.css'
import calculo from '../js/calcularData.js'

const BarraData= () =>{

    const dateAtual = new Date()
    const dateFinal = new Date(2021, 5, 8)
    let posicao_valor = calculo.retornaPosicao(dateFinal.getTime())

    
    return (
         
            <section className="barraData">
            <span> 8/2</span>
            <div>
                <div style={{ width: posicao_valor+"%"}}/>

                <span className="valorAtual" style={{ left: posicao_valor+'%'}}> {dateAtual.getDate()}/{dateAtual.getMonth()+1}
                 </span>
            </div>
            <span> {dateFinal.getDate()}/{dateFinal.getMonth()+1}</span>
        </section>
    )

}

export default BarraData