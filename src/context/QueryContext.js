import React, { createContext, useState, useContext } from "react"

const QueryContext = createContext()

export const useQueryContext = () => {
    return useContext(QueryContext)
}

export const QueryProvider = ({ children }) => {
    const [fileSources, setFileSources] = useState([])
    const [queryCode, setQueryCode] = useState(
        `SELECT * WHERE {?s ?p ?o}`
    )
    const [queryResults, setQueryResults] = useState([])
    const [loadingQuery, setLoadingQuery] = useState(false)

    // console.log(fileSources)

    const value = {
        fileSources,
        setFileSources,
        queryCode,
        setQueryCode,
        queryResults,
        setQueryResults,
        loadingQuery,
        setLoadingQuery,
    }

    return (
        <QueryContext.Provider value={value}>
            {children}
        </QueryContext.Provider>
    )
}