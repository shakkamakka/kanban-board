import React, { useEffect, useState } from "react";
import { Card, ModalEdit, Row } from "../components";
import { ListProps, TaskProps } from "../data/interface";
import useLocalStorage from "../hooks/useLocalStorage";
import dummydata from "../data/db.json";

const Board = () => {
  const [dataList, setDataList] = useState<ListProps []>([]);
  const [dragCardObject, setDragCardObject] = useState<TaskProps []>([]);
  const [dragCardId, setDragCardId] = useState<number>(0);
  const [touchCardId, setTouchCardId] = useState<number>(0);
  const [localData, setLocalData] = useLocalStorage<ListProps []>( "kanban", []);
  const [editId, setEditId] = useState<number>(0);
  const [IsEditOpen, setIsEditOpen] = useState<boolean>(false);
  
  useEffect(()=>{
    // populate from db.json if no localstorage was detected 
    if(!window.localStorage.getItem("kanban")){
      setLocalData(Object.values(dummydata)[0]);
    }
    setDataList(localData);
  }, [localData])

  const handleDragStart= (e:React.DragEvent, id:number)=>{
    // save the cardObject to push it to the list later
      const cardObject = dataList.filter((list:ListProps)=> list.tasks.some(task=>task.id === id))[0].tasks.filter((task:TaskProps)=> task.id===id);
      setDragCardId(id);
      setDragCardObject(cardObject);
  }

  const handleDragOverCard = (e:React.DragEvent, id:number, index:number, statusId:number, statusIndex:number) =>{
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
    setLocalData(dataList);
  }

  const handleDelete = (id:number) =>{
    const newData = dataList?.map((list:ListProps) => ({ ...list, "tasks": list.tasks.filter((task:TaskProps)=>task.id!==id)}));
    setLocalData(newData);
  }

  return (
    <div className="dashboard">
      {IsEditOpen && <ModalEdit 
        taskId={editId} 
        setIsEditOpen={setIsEditOpen} 
        isEditOpen={IsEditOpen} 
      />}
      <Row>
        {dataList &&
          dataList.map((s: ListProps, statusIndex:number) => (
            // Column
            <div 
              className="column" 
              data-id={s.id}
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
                onDragLeave={()=> setTouchCardId(0)}
                onDrop={()=>handleOnDropCard()}
                onDoubleClick={()=>{
                  setIsEditOpen(true);
                  setEditId(id)
                }}
                >
                 <Card 
                  title={title} 
                  description={description} 
                  id={id}
                  handleDelete={handleDelete}
                  />
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
