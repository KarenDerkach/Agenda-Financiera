import React, { useState } from 'react'

export default function Counter() {

  let [counter , setCounter] = useState(0)

  const handleCounter = (numero : number = 1): void=>{
    setCounter(counter + numero)
  }
  
  const handleRest = (): void=>{
    setCounter(counter - 1)
  }

  const handleReset = ():void=>{
    setCounter(0)
  }

  return (
    <div>
      <h3>Counter</h3>
      
      <span>Counter is : {counter}</span>
      <br/>
      <button className='btn btn-outline-success mt-2' onClick={() => handleCounter()}>+</button>
      <br/>
      <button className='btn btn-outline-success mt-2' onClick={()=>handleCounter(2)}>2+</button>
      <br/>
      <button className='btn btn-outline-secondary mt-2' onClick={handleRest}>-</button>
      <br/>
      <button className='btn btn-outline-danger mt-2' onClick={()=>handleReset()}>reset</button>
      </div>
  )
}
