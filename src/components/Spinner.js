import React from 'react'
import spinner from '../assets/Rolling-1s-200px-600.svg'

export const Spinner = () => (
  <div className="mt-12 w-full flex justify-center h-full">
    <img src={spinner} className="h-auto animate-pulse w-14" alt="" />
  </div>
)
