import React from 'react'

function Todoslist({todos}) {
  return (
    <div>
      {todos.map(function(todo){
        return(
            <div className='border-black border-2 m-2 p-2' key={todo._id}>
                <h1>Title: {todo.title}</h1>
                <h1>Description: {todo.description}</h1>
                <h1 className='font-bold'>Status:</h1>
                <button className='bg-blue-400 p-2 rounded-xl'>{todo.completed==true?"completed":"Mark as Completed"}</button>
            </div>
        )
      })}
    </div>
  )
}

export default Todoslist
