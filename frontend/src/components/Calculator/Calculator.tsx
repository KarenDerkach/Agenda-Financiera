import React, {useState}from 'react'
import './Calculator.css'

function Calculator() {
    const [result, setResult] = useState(0)
    const [operation, setOperation] = useState('')
    const [firstNumber, setFirstNumber] = useState('')
    const [secondNumber, setSecondNumber] = useState('')
    const handleClickNumber = (num:string) => {
        if(operation === ''){
        setFirstNumber(firstNumber + num)
    }else{
        setSecondNumber(secondNumber + num)
    }
}
    const handleClickOperation = (op:string) => {
        setOperation(op)
    
    }
    const handleClickResult = () => {
  
        switch(operation){
            case '+':
                setResult(parseInt(firstNumber) + parseInt(secondNumber))
                break
            case '-':
                setResult(parseInt(firstNumber) - parseInt(secondNumber))
                break
            case '*':
                setResult(parseInt(firstNumber) * parseInt(secondNumber))
                break
            case '/':
                setResult(parseInt(firstNumber) / parseInt(secondNumber))
                break
            case '%':
                setResult(parseInt(firstNumber) % parseInt(secondNumber))
                break
            case '^':
                setResult(Math.pow(parseInt(firstNumber), parseInt(secondNumber)))
                break
            case '√':
                setResult(Math.sqrt(parseInt(firstNumber)))
                break
            default:
                setResult(0)
        }
   
    }

    const handleClickClear = () => {
        setResult(0)
        setOperation('')
        setFirstNumber('')
        setSecondNumber('')
    }

    const handleClickDelete = () => {
        if(operation === ''){
            setFirstNumber(firstNumber.substring(0, firstNumber.length - 1))
        }else{
            setSecondNumber(secondNumber.slice(0, -1))
        }
    }

  return (
    <div className='app-header'>
          <h3 className='app-title'>Calculator</h3>
        <div className='app-container'>
          
            <div className='app-input'>
                <div className='previous-operation'>{operation ? firstNumber + operation + secondNumber : ''} </div>
                    <div className='current-operation'>{result ? result : (!operation ? firstNumber : secondNumber)}</div>
            </div>
            <button className='span-two' onClick={handleClickClear}> AC</button>
            <button className ='span-two'onClick={handleClickDelete}>DEL</button>
            <button onClick={() => handleClickOperation('%')}>%</button>
            <button onClick={()=>{handleClickOperation('/')}}>/</button>
            <button onClick={()=>{handleClickOperation('^')}}>^</button>
            <button onClick={()=>{handleClickOperation('√')}}>/</button>
            <button onClick={()=>handleClickNumber('7')}>7</button>
            <button onClick={()=>handleClickNumber('8')}>8</button>
            <button onClick={()=>handleClickNumber('9')}>9</button>
            <button onClick={()=>{handleClickOperation('*')}}>*</button>
            <button onClick={()=>handleClickNumber('4')}>4</button>
            <button onClick={()=>handleClickNumber('5')}>5</button>
            <button onClick={()=>handleClickNumber('6')}>6</button>
            <button onClick={()=>{handleClickOperation('+')}}>+</button>
            <button onClick={()=>handleClickNumber('1')}>1</button>
            <button onClick={()=>handleClickNumber('2')}>2</button>
            <button onClick={()=>handleClickNumber('3')}>3</button>
            <button onClick={()=>{handleClickOperation('-')}}>-</button>
            <button onClick={()=>{handleClickNumber('.')}}>.</button>
            <button onClick={()=>handleClickNumber('0')}>0</button>
            <button className='span-two' onClick={handleClickResult}>=</button>
        </div>
        
    </div>
  )
}

export default Calculator