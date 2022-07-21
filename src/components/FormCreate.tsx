import React, { useState } from 'react';
import { ListProps } from '../data/interface';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

type props={
  isOpen:boolean,
  setIsModalOpen:(isOpen:boolean)=>void
}

const FormCreate = ({setIsModalOpen}:props ) => {
  const navigate= useNavigate();
  const {
    data
  } = useFetch(`http://localhost:3000/status`);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState<number>(1);
  const [statusString, setStatusString] = useState<string | undefined>("Backlog");
  const [isPending, setIsPending] = useState(false);

  const handleSubmitted=(e:React.FormEvent)=>{
    e.preventDefault();
    const id = Date.now();
    const task = {id, title, description};

    setIsPending(true);

    // push task
    const newData = data.filter((status:ListProps)=>status.id === statusId)[0].tasks;
    newData.push(task);
    

    // post tasks array because json-server doesn't support nested objects
    fetch(`http://localhost:3000/status/${statusId}`, {
      method:'PUT',
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify({
        "value":statusString, // add this again, otherwise it dissapears somehow
        "tasks":newData
      })
    }).then(()=>{
      setIsPending(false);
      setIsModalOpen(false);
      if(location.pathname==='/'){
        window.location.reload();
      }
      else{
        navigate('/');
      }
    })
  }

  return (
      <form className="create" onSubmit={(e)=>handleSubmitted(e)}>
        <h2>Create a new Task</h2>
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
          value={statusId}          
          onChange={((e)=>{
            setStatusString(e.target.options[e.target.selectedIndex].dataset.name);
            setStatusId(Number(e.target.value));
          })}
        >
          {data && data.map(({id, value}:ListProps)=><option key={id} value={id} data-name={value}>{value}</option>)}
        </select>
        <br />
        {!isPending && <button type="submit" className='btn_primary center'>Add Task</button>}
        {isPending && <button type="submit" className='btn_primary center' disabled>Saving...</button>}
      </form>
  )
}

export default FormCreate