import React from 'react'
import { Heading } from '../components/Heading'
import { ArrowUpLeftIcon } from '@heroicons/react/24/outline'
import { ResourceForm } from '../components/ResourceForm'
import { useNavigate } from 'react-router-dom'

export const Join = () => {
  const navigate = useNavigate()
  return (
    <>
      <button property="hasPart" typeof="SiteNavigationElement" className='mb-4 font-medium' onClick={() => navigate('/solid-index/')}><ArrowUpLeftIcon className='w-4' strokeWidth={2} /> <div>Home</div></button>
      <Heading>Link your Data</Heading>
      <div property="description" className="mt-8 font-medium">
        Using the form below, you can link your own resources from a Solid Pod. In order to do so, please provide a title and the URL to your resource. 
        You can either refer to a folder in your pod that stores multiple files or just a single file.
        Optionally, you can also add a description. Click the Share-Button to confirm.  
      </div>
      <ResourceForm />
    </>
  )
}
