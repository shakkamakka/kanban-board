import React, { useEffect, useRef, useState } from "react";
import { Row } from "../components";
import { ListProps, TaskProps } from "../data/interface";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

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

  const handleOnDrop = () =>{
    setDragCardId(0);
    setTouchCardId(0);
    // post data to DB
  }

  return (
    <div className="dashboard">
      <Row>
        {isLoading && <div>loading...</div>}
        {error && <div>{error}</div>}

        {dataList &&
          dataList.map((s: ListProps, statusIndex:number) => (
            <div 
              className="column" 
              key={s.id}
            >
              <h3>
                {s.value} 
                <span className="count">{s.tasks.length}</span>
              </h3>

              {s.tasks.map(({id, title, description}:TaskProps, index:number)=>(
                <div 
                key={id}
                className={dragCardId === id ? "card dragging" :"card"}
                draggable
                onDragStart={(e)=> handleDragStart(e, id)}
                onDragOver={(e)=>handleDragOverCard(e, id, index, s.id, statusIndex)}
                onDragLeave={()=>setTouchCardId(0)}
                onDrop={()=>handleOnDrop()}
                >
                  <span className="title">{id} {title} </span>
                  <span className="description">{description?.substring(0, 50)}...</span>
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
