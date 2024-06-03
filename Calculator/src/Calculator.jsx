import React, { useState } from 'react'


function Calculator() {
    const [inputdata,setInputdata] = useState("")
  return (
    <div className=' border-black border-2'>
      <div className=' pl-10 pr-10'>
        <center><h1 className='text-2xl'>Calculator</h1></center>
        <input type="text" className='outline-none border-black border-2 pl-1' readOnly value={inputdata} />
      </div>
      <div className='flex mr-6 mt-3 justify-end'><h1 className='text-2xl'><ion-icon name="time-outline"></ion-icon></h1></div>
      <div className='flex flex-row justify-end ml-8 mr-8 mt-2 mb-4 border-black border-t-2'>
        <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-evenly pt-2'>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>7</div>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>8</div>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>9</div>   
            </div>
            <div className='flex flex-row justify-evenly pt-2'>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>4</div>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>5</div>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>6</div>   
            </div>
            <div className='flex flex-row justify-evenly pt-2'>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>1</div>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>2</div>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>3</div>   
            </div>
            <div className='flex flex-row justify-evenly pt-2'>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>.</div>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>0</div>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>=</div>   
            </div>
            <div className='flex flex-row justify-evenly pt-2'>
                <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-4 pr-4'>7</div>  
            </div>
        </div>
        <div className='flex flex-col justify-evenly pr-3'>
            <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>/</div>
            <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>*</div>
            <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>-</div>
            <div className='border-2 border-black rounded-lg cursor-pointer p-1 pl-2 pr-2'>+</div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
