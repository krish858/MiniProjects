import React, { useState, useContext } from 'react';
import { RefreshContext } from './context';

function CreateTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { incrementRefresh } = useContext(RefreshContext);

  async function registerTodo(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const data = await response.json();
    incrementRefresh();
    alert(data.msg);
  }

  return (
    <div>
      <form onSubmit={registerTodo}>
        <input
          type="text"
          placeholder='Title'
          className='outline-none p-2 border-black border-2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder='Description'
          className='outline-none p-2 mt-2 mb-2 border-black border-2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button className='bg-black text-slate-400 font-semibold rounded-xl p-2 hover:text-white' type='submit'>
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
