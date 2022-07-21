import {useState} from 'react'
import { TiTicket } from "react-icons/ti";
import FormCreate from './FormCreate';
import Modal from './Modal';

const ModalCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
    <button className='btn_primary' onClick={()=>setIsModalOpen(true)}>
      <TiTicket /> Add a new task
    </button>
    
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    >
      <FormCreate isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Modal>
    </>
  )
}

export default ModalCreate