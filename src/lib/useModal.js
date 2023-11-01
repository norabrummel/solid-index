import { useState } from "react"

export const useModal = () => {
  let [modal, setModal] = useState(false)
  let [modalContent, setModalContent] = useState("I'm the Modal Content")

  /**
   * function to set modal content and show the modal
   * @param {*} content : content to be shown on the modal, anything can be passed and is handled by modalContent state
   */
  let handleModal = (content = false) => {
    setModal(!modal)
    if (content) {
      setModalContent(content)
    }
  }

  return { modal, handleModal, modalContent, setModal }
}


