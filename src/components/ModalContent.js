import React from "react"

function ModalContent(props) {

    /* ----- return ----- */
    return (
        <div className="w-full overflow-scroll">
            {props.content}
        </div>
    )
}

export default ModalContent
