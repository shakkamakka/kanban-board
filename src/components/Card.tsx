import React from 'react'
import {RiDeleteBin6Line} from "react-icons/ri";
import {TaskProps} from "../data/interface";

interface props extends TaskProps{
  handleDelete : (id:number)=>void
}

const Card = ({title, description, id, handleDelete}: props) => {
  return (
    <>
      <div className="card-header">
        <span className="card__title">{title} </span>
        <button className="card__delete" onClick={()=>handleDelete(id)}>
          <RiDeleteBin6Line />
        </button>
      </div>
      <span className="card__description">
        {description?.substring(0, 50)}...
      </span>
    </>

  )
}

export default Card