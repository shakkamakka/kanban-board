import React, { useEffect, useRef, useState } from "react";
import { Row } from "../components";
import { ListProps, TaskProps } from "../data/interface";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import {RiDeleteBin6Line} from "react-icons/ri"

const Board = () => {
  const {
    data,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/status");

  const [dataList, setDataList] = useState<ListProps []>([]);
  const [dragCardObject, setDragCardObject] = useState<TaskProps []>([]);
  const [dragCardId, setDragCardId] = useState<Number>(0);
  const [touchCardId, setTouchCardId] = useState<Number>(0);
  
  useEffect(()=>{
    setDataList(data);
  }, [data])

  const updateDB = (newdata:ListProps[]) => {
    //json-server can only update 1 item per call so we loop through the object
    newdata.map((list:ListProps)=>{
      fetch(`http://localhost:3000/status/${list.id}`,{
        method:'PUT',
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({
          "value":list.value,
          "tasks":list.tasks
        })
      }).then(res=>{
        console.log(res)
      });
    });
    setDataList(newdata);
  }

  const handleDragStart= (e:React.DragEvent, id:Number)=>{
      const cardObject = dataList.filter((list:ListProps)=> list.tasks.some(task=>task.id === id))[0].tasks.filter((task:TaskProps)=> task.id===id);
      setDragCardId(id);
      setDragCardObject(cardObject);
  }

  const handleDragOverCard = (e:React.DragEvent, id:Number, index:number, statusId:number, statusIndex:number) =>{
    e.preventDefault();
    // return when hovering over same card
    // return when hovering over new card and its not the filler card
    if(id === dragCardId || id > 0 && id === touchCardId) return;

    setTouchCardId(id);

    // remove card from the list
    const filteredList = dataList.map((list)=> ({
      ...list,
      "tasks": list.tasks.filter((tasks:TaskProps)=> tasks.id !== dragCardId)}
      ));

    // add card at index number
    if(id!==0){
      const newList = filteredList.map((list)=> {
        if(list.id===statusId)list.tasks.splice(index, 0, dragCardObject[0]);
        return {...list}}
      );
      setDataList(newList);
    }
    else{
    // add card at the end of the array
      filteredList[statusIndex].tasks.push(dragCardObject[0]);
      const newList = [...filteredList];
      setDataList(newList);
    }
  }

  const handleOnDropCard = () =>{
    setDragCardId(0);
    setTouchCardId(0);
    updateDB(dataList);
  }

  const handleDelete = (id:number) =>{
    console.log("deleet")
    const newData = dataList.map((list:ListProps) => ({ ...list, "tasks": list.tasks.filter((task:TaskProps)=>task.id!==id)}));
    updateDB(newData);
  }

  return (
    <div className="dashboard">
      <Row>
        {isLoading && <div>loading...</div>}
        {error && <div>{error}</div>}

        {dataList &&
          dataList.map((s: ListProps, statusIndex:number) => (
            // Column
            <div 
              className="column" 
              key={s.id}
            >
              <h3>
                <span className="count">{s.tasks.length}</span>
                {s.value} 
              </h3>

              {/* Card */}
              {s.tasks.map(({id, title, description}:TaskProps, index:number)=>(
                <div 
                key={id}
                className={dragCardId === id ? "card dragging" :"card"}
                draggable
                onDragStart={(e)=> handleDragStart(e, id)}
                onDragOver={(e)=>handleDragOverCard(e, id, index, s.id, statusIndex)}
                onDragLeave={()=>setTouchCardId(0)}
                onDrop={()=>handleOnDropCard()}
                >
                  <div className="card-header">
                    <span className="card__title">{title} </span>
                    <button className="card__delete" onClick={()=>handleDelete(id)}><RiDeleteBin6Line /></button>
                  </div>

                  <span className="card__description">{description?.substring(0, 50)}...</span>
                  <Link to={`/task/${s.id}/${id}`} draggable={false}>View task </Link>
                </div>
              ))}
              <div 
                className="card-filler"
                onDragOver={(e)=>handleDragOverCard(e, 0, s.tasks.length, s.id, statusIndex)}
              ></div>
            </div>
          ))}
      </Row>
    </div>
  );
};

export default Board;
