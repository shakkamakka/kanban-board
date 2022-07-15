
  interface statusProps{
    id:number;
    value:string
  }

const List:React.FC<statusProps> = ({id, value}) => {
  const count = 1;

  return (
    <div className="column">
      <h3>{value} <span className="count">{count}</span></h3>
    </div>
  )
}

export default List