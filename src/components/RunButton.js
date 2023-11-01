import React from 'react'
import { useQueryContext } from '../context/QueryContext'
import { useComunica } from '../lib/useComunica'


export const RunButton = () => {
    const { fileSources, queryCode, setQueryResults, setLoadingQuery } = useQueryContext()
    const { querySources } = useComunica()

    const handleClick = () => {
        if (fileSources.length) {
            setLoadingQuery(true)
            querySources(fileSources, queryCode).then(results => {
                setQueryResults(results)
                setLoadingQuery(false)
            })
        }
    }
    return (
        <button
            onClick={() => handleClick()}
            className="text-sm font-medium rounded-lg bg-neutral-100 py-1 px-2"
        >
            Run
        </button>
    )
}
