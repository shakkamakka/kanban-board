import FormEdit from './FormEdit';
import Modal from './Modal';

type props={
  taskId:number,
  isEditOpen:boolean,
  setIsEditOpen:(isEditOpen:boolean)=>void
}

const ModalEdit = ({taskId, isEditOpen, setIsEditOpen}:props) => {
  return ( 
    <Modal
      isOpen={isEditOpen}
      setIsOpen={setIsEditOpen}
    >
      {isEditOpen && <FormEdit 
        isOpen={isEditOpen} 
        setIsModalOpen={setIsEditOpen} 
        taskId={taskId} 
      />}
      
    </Modal>
  )
}

export default ModalEdit