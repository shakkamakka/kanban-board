import {useState} from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import FormCreate from './FormCreate';
import Modal from './Modal';

type props={
  statusIdParent:number
}

const ModalCreate = ({statusIdParent}:props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
    <button className='btn_primary' onClick={()=>setIsModalOpen(true)}>
      <AiOutlinePlus /> Add a new task
    </button>
    
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    >
      {isModalOpen &&  <FormCreate 
        isOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        statusIdParent={statusIdParent} 
      />
      }
    </Modal>
    </>
  )
}

export default ModalCreate