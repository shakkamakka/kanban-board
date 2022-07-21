import React, {useRef, useEffect} from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside';

type ModalProps={
  children:any,
  isOpen:boolean,
  setIsOpen:(isOpen:boolean)=>void
}

const Modal = ({ children, isOpen, setIsOpen }:ModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperRef, ()=> setIsOpen(false));

  return (
    <div className={isOpen ? "modal active" : "modal"}>
      <div ref={wrapperRef}>
        {children}
        <button className="modalclose" onClick={() => setIsOpen(false)}>
          {" "}
          X{" "}
        </button>
      </div>
    </div>
  );
};

export default Modal