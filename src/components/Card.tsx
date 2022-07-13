type CardProps={ 
  id: number; 
  title: string; 
  description: string; 
  status: number;
}

const Card = ({id, title, description, status}:CardProps) => {
  return (
    <div className='card'>
      <span className='title'>{title}</span></div>
  )
}

export default Card