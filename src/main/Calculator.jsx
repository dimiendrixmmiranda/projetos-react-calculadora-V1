import React, {Component} from "react";
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{
    
    state = {...initialState}

    constructor(props){
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({...initialState})
    }
    
    addDigit(digit){
        /* logica para evitar o uso de 2 pontos */
        if(digit === '.' && this.state.displayValue.includes('.')){
            return
        }
        
        /* logica para limpar o display ATÉ AQUI É PARA PEGAR OS NUMEROS DOS BOTOES*/
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({displayValue, clearDisplay: false})

        /* logica para armazenar o valor digitado no array values(ARMAZENANDO NO INDICE 0 DO ARRAY) */
        if(digit !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            // console.log(values)
        }
    }

    setOperation(operation){
        /* mundando o estado do current para 1 para pegar o 2º valor da operação */
        if(this.state.current === 0){
            this.setState({operation, current:1, clearDisplay: true})
        }else{
            /* parte que vai gerar o resultado */
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            /* eval pode gerar algum efeito colateral, indicado colocar em um try catch */
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                if(isNaN(values[0])||!isFinite(values[0])){
                    this.clearMemory()
                    return
                }
            }catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    render(){

        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} op/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} op/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} op/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} op/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} op/>
                
            </div>
        )
    }
}