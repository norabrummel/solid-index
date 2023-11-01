import React from 'react'
import { QueryEditor } from '../components/QueryEditor'
import { RunButton } from '../components/RunButton'

export const QuerySection = () => {
  return (
    <div className='my-16'>
        <QueryEditor />
        <div className='w-full flex justify-end mt-3'><RunButton /></div>
    </div>
  )
}
