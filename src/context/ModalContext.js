import React, { createContext, useContext } from "react"
import { useModal } from "../lib/useModal"
import { Modal } from "../sections/Modal"

const ModalContext = createContext()

export const useModalContext = () => {
  return useContext(ModalContext)
}

export const ModalProvider = ({ children }) => {
  /* ----- variables ----- */
  let { modal, handleModal, modalContent, setModal } = useModal()

  /* ----- return ----- */
  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent, setModal }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  )
}
