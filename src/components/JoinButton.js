import React from 'react'
import { useNavigate } from 'react-router-dom'

export const JoinButton = () => {
  const navigate = useNavigate()
  return (
    <button property='JoinAction' className="text-md font-medium rounded-lg bg-neutral-100 py-1 px-2" onClick={() => navigate('/solid-index/join')}>Link your data</button>
  )
}
