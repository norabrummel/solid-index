import React, { createContext, useState, useContext } from "react"

const SolidContext = createContext()

export const useSolidContext = () => {
    return useContext(SolidContext)
}

export const SolidProvider = ({ children }) => {
    const [resourceIndex, setResourceIndex] = useState()
    const [responseMessage, setResponseMessage] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [publicDatasets, setPublicDatasets] = useState()

    const value = {
        resourceIndex,
        setResourceIndex,
        responseMessage, 
        setResponseMessage,
        isSuccess, 
        setIsSuccess, 
        publicDatasets,
        setPublicDatasets
    }

    return (
        <SolidContext.Provider value={value}>
            {children}
        </SolidContext.Provider>
    )
}