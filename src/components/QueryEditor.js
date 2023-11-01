import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { useQueryContext } from '../context/QueryContext'

export const QueryEditor = () => {
    const { queryCode, setQueryCode } = useQueryContext()
    return (
        <CodeEditor
            value={queryCode}
            language="sparql"
            placeholder="Please enter SPARQL query."
            onChange={(evn) => setQueryCode(evn.target.value)}
            padding={15}
            style={{
                borderRadius: 6,
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
        />
    )
}
