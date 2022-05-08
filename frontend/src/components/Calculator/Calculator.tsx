import React, {useState}from 'react'
import './Calculator.css'

function Calculator() {

const [resultado, setResultado] = useState("");

const [secondOperation , setSecondOperation] = useState("");

const handleClickDelete = () => {
  setResultado("");
};

const handleClickClear= () => {
  setResultado(resultado.slice(0, -1));
};

const onChange = (e:any) => {
  setResultado(resultado.concat(e.target.name));
};

const handleClickResult= () => {
  try {
    // eslint-disable-next-line no-eval
    setResultado(eval(resultado).toString());
    setSecondOperation(resultado);
  } catch (error) {
    setResultado("Error");
  }
};

  return (
    <div className='app-header'>
       
        <div className='app-container'>
          
            <div className='app-input'>
                    <div className='previous-operation'>{resultado? secondOperation : null}</div>
                    <div className='current-operation'>{resultado }</div>
             
            
            </div>
            <button className='span-two' onClick={handleClickClear}> AC</button>
            <button className ='span-two'onClick={handleClickDelete}>DEL</button>
            <button className='btn-op' name='%'onClick={onChange}>%</button>
            <button  className='btn-op'name='/'onClick={onChange}>/</button>
            <button  className='btn-op'name='^'onClick={onChange}>^</button>
            <button  className='btn-op'name='√'onClick={onChange}>√</button>
            <button className='btn-num'name='7'onClick={onChange}>7</button>
            <button className='btn-num'name='8'onClick={onChange}>8</button>
            <button className='btn-num'name='9'onClick={onChange}>9</button>
            <button  className='btn-op'name='*'onClick={onChange}>*</button>
            <button className='btn-num'name='4'onClick={onChange}>4</button>
            <button className='btn-num'name='5'onClick={onChange}>5</button>
            <button className='btn-num'name='6'onClick={onChange}>6</button>
            <button  className='btn-op'name='+'onClick={onChange}>+</button>
            <button className='btn-num'name='1'onClick={onChange}>1</button>
            <button className='btn-num'name='2'onClick={onChange}>2</button>
            <button className='btn-num'name='3'onClick={onChange}>3</button>
            <button  className='btn-op'name='-'onClick={onChange}>-</button>
            <button className='btn-num'name='.'onClick={onChange}>.</button>
            <button className='btn-num'name='0'onClick={onChange}>0</button>
            <button className='span-two' onClick={handleClickResult}>=</button>
        </div>
        
    </div>
  )
}

export default Calculator