import React, { useEffect, useState } from 'react';
import { ListProps } from '../data/interface';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import dummydata from "../data/db.json";
import {FiEdit2} from "react-icons/fi";

type props={
  isOpen:boolean,
  taskId:number,
  setIsModalOpen:(isOpen:boolean)=>void
}

const FormEdit = ({setIsModalOpen, taskId}:props ) => {
  const navigate= useNavigate();
  const [localData, setLocalData] = useLocalStorage<ListProps []>( "kanban", []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState<number>(taskId || 1);
  const [isPending, setIsPending] = useState(false);

  const status= localData.filter((status)=>status.tasks.some(task=> task.id===taskId))[0];
  const task = status && status.tasks.filter((task)=> task.id===taskId)[0];

  useEffect(()=>{
    if(!status)return;
      setStatusId(status.id);
      setTitle(task.title);
      setDescription(task.description)
  }, [status, task])

  const handleSubmitted=(e:React.FormEvent)=>{
    e.preventDefault();

    setIsPending(true);

    // remove the task from the list
    const filteredData = localData.map(status=>({...status, "tasks": status.tasks.filter(task=>task.id!==taskId)}));
    // add the edited task back to the list (we have all the info)
    const newData = filteredData.map(status=>{
      if(status.id===statusId) {
        status.tasks.push({id:taskId, title, description})
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

  const handleCancel=(e:React.FormEvent)=>{
    e.preventDefault();
    setLocalData([...localData]); //rerender fields
    setIsModalOpen(false);
  }

  return (
      <form className="modalform" onSubmit={(e)=>handleSubmitted(e)}>
        <h2><FiEdit2 />Edit Task</h2>
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
          {localData && localData.map(({id, value}:ListProps)=><option key={id} value={id} data-name={value}>{value}</option>)}
        </select>
        <br />
        <div className="modalform__footer">
          <button type="button" className='btn_secondary' onClick={(e)=>handleCancel(e)}>Cancel</button>
          {!isPending && <button type="submit" className='btn_primary center'>Save</button>}
          {isPending && <button type="submit" className='btn_primary center' disabled>Saving...</button>}
        </div>
      </form>
  )
}

export default FormEdit;