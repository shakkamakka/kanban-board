type ColumnProps={
  title: string,
  count?:number,
  children?: React.ReactNode
}


const Column:React.FC<ColumnProps>= ({title,count, children}) => {
  return (
    <div className='column'>
      <h3>{title} <span className="count">{count}</span></h3>
      {children}
    </div>
  )
}

export default Column