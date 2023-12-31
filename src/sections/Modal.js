import React, { useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { createPortal } from "react-dom"
import { useModalContext } from "../context/ModalContext"

/* https://codesandbox.io/s/eloquent-hamilton-vgbyq?file=/src/modalContext.js */

export const Modal = () => {
  let { modalContent, modal, setModal } = useModalContext()

  useEffect(() => {
    function logKey(e) {
      (e.keyCode === 27) && setModal(false)
    }
    document.addEventListener('keydown', logKey)
    return () => {
      document.removeEventListener('keydown', logKey)
    }
  }, [modal, setModal])

  if (modal) {
    return createPortal(
      <div
        className="fixed top-0 left-0 h-screen 3xl:h-full w-full flex flex-col items-center justify-center z-50"
        style={{
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(2px)"
        }}
      >
        <div className="flex flex-col">
          <div className="bg-white relative shadow-lg rounded-xl flex flex-col items-start p-2 text-lg text-neutral-800">
            <button className="self-end m-1 rounded p-[0.125rem] hover:bg-neutral-100" onClick={() => setModal(false)}><XMarkIcon className="w-5 text-neutral-600" strokeWidth={3} /></button>
            <div className="flex items-center justify-center w-full px-6 pb-6">{modalContent}</div>
          </div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    )
  } else return null
}

