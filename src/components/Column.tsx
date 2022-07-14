type ColumnProps={
  title: string,
  children?: React.ReactNode
}


const Column:React.FC<ColumnProps>= ({title, children}) => {
  return (
    <div className='column'>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default Column