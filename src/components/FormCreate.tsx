import React, { useEffect, useState } from 'react';
import { ListProps } from '../data/interface';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import dummydata from "../data/db.json";
import { MdLibraryAdd } from "react-icons/md";

type props={
  isOpen:boolean,
  setIsModalOpen:(isOpen:boolean)=>void, 
  statusIdParent:number
}

const FormCreate = ({setIsModalOpen, statusIdParent}:props ) => {
  const navigate= useNavigate();
  const [localData, setLocalData] = useLocalStorage<ListProps []>( "kanban", []);
  const [data, setData] = useState<ListProps []>([]);
  
  useEffect(()=>{
    setData(localData);
  }, [localData])

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState<number>(statusIdParent || 1);
  const [isPending, setIsPending] = useState(false);

  const handleSubmitted=(e:React.FormEvent)=>{
    e.preventDefault();
    const id = Date.now();
    const task = {id, title, description};

    setIsPending(true);

    // push the new task
    const newData = localData.map(status=>{
      if(status.id===statusId){
        status.tasks.push(task);
      }
      return status;
    })

    setLocalData(newData);
    setIsPending(false);
    setIsModalOpen(false);

    if(location.pathname==='/'){
      window.location.reload();
    }
    else{
      navigate('/');
    }
  }

  return (
      <form className="modalform" onSubmit={(e)=>handleSubmitted(e)}>
        <h2><MdLibraryAdd />Create a new Task</h2>
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
          onChange={((e)=> setStatusId(Number(e.target.value)))}
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