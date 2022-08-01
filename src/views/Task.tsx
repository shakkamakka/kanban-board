import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TaskProps } from "../data/interface";
import {HiOutlineClipboardCheck, HiOutlineClipboardCopy} from "react-icons/hi";
import useLocalStorage from "../hooks/useLocalStorage";


const Task = () => {  
  const {statusId, id}=useParams();
  const [data, setData] = useState<TaskProps>();
  const [status, setStatus] = useState(0);
  const urlRef=useRef<HTMLInputElement>(null);
  const url=window.location.href;
  const [isCopied, setIsCopied] = useState(false);

  // we take the whole status object because nested arrays aren't supported in JSON-server
  const {
    data:dataStatus,
    isLoading,
    error,
  } = useFetch(`${path}/${statusId}`);

  const [localData, setLocalData] = useLocalStorage<ListProps []>( "kanban", []);
  


  useEffect(()=>{
    if(isLoading)return;
    // set Status
    setStatus(dataStatus.value);
    // filter task we need out of the status object
    const filteredTasks = dataStatus?.tasks.filter((task:TaskProps)=> task.id === Number(id))[0];
    setData(filteredTasks);
  }, [dataStatus])

  const copyUrl = () => {
    urlRef.current?.select()
    navigator.clipboard.writeText(urlRef.current?.value || "");
    setIsCopied(true);
    
  }

  return (
  <section className="page task" data-id={statusId}>
    {isLoading && <div>loading...</div>}
    {error && <div>{error}</div>}
    {data && 
    <div>
      <div className="task__heading">
        <span className="task__badge">{status}</span>
        <h2>{data.title}</h2>
      </div>

      <div className="task__description">{data.description}</div>

      <div className="copy_url">
        <span>Copy url:</span>
        <input type="text" value={url} ref={urlRef} readOnly />
        <button 
          onClick={()=>copyUrl()} 
          title="Copy url to clipboard"
          className={isCopied ?"btn_secondary active" :"btn_secondary"}
          >
          {isCopied ? <HiOutlineClipboardCheck /> : <HiOutlineClipboardCopy />}
        </button>
        {isCopied && <span className="copy_url__succes">Copied to clipboard!</span>}
      </div>

      <div className="task__footer">
        <Link to="/" className="btn_secondary">Go Back</Link>
        <button className="btn_secondary">Edit</button>
      </div>
    </div>}
  </section>   
  )
};

export default Task;
