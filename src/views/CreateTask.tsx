import React, { useState } from 'react';
import { ListProps } from '../data/interface';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const navigate= useNavigate();
  const {
    data:dataStatus
  } = useFetch(`http://localhost:3000/status`);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("1");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    const id = Date.now();
    const task = {id, title, description, status};

    setIsPending(true);

    fetch(`http://localhost:3000/tasks`, {
      method:'POST',
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(()=>{
      setIsPending(false);
      navigate("/");
    })
  }

  return (
    <section className="page create">
      <h2>Create a new Task</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          required
          onChange={((e)=>setTitle(e.target.value))}
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={((e)=>setDescription(e.target.value))}
          required
        > </textarea>
        <label>Status</label>
        <select 
          value={status}          
          onChange={((e)=>setStatus(e.target.value))}
        >
          {dataStatus && dataStatus.map(({id, value}:ListProps)=><option key={id} value={id}>{value}</option>)}
        </select>
        <br />
        {!isPending && <button type="submit" className='btn_primary center'>Add Task</button>}
        {isPending && <button type="submit" className='btn_primary center' disabled>Saving...</button>}
      </form>
    </section>
  )
}

export default CreateTask