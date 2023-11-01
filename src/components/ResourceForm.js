import React, { useState } from 'react'
import { useSolidContext } from '../context/SolidContext'
import { useSolid } from '../lib/useSolid'

export const ResourceForm = () => {
    const [title, setTitle] = useState()
    const [url, setUrl] = useState()
    const [description, setDescription] = useState()
    const { responseMessage, isSuccess, publicDatasets } = useSolidContext()
    const { addResource } = useSolid()

    const handleChange = (e) => {
        const { name, value } = e.target
        e.preventDefault()
        if (name === "title") {
            setTitle(value);
        } else if (name === "url") {
            setUrl(value)
        } else if (name === "description") {
            setDescription(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        addResource(title, url, description)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4 mt-16">
                <div className='flex flex-col gap-1'>
                    <label htmlFor="title" className='text-sm font-medium'>Resource Title</label>
                    <input
                        required
                        id="title"
                        name='title'
                        type="text"
                        value={title}
                        onChange={handleChange}
                        placeholder='Provide the title of the resource you want to share.'
                        className=' rounded-lg bg-neutral-100 py-1 px-2 placeholder:text-sm placeholder:text-neutral-600'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="url" className='text-sm font-medium'>Resource URL</label>
                    <input
                        required
                        id="url"
                        name='url'
                        type="url"
                        value={url}
                        onChange={handleChange}
                        placeholder='Provide the URL to the resource you want to share.'
                        className=' rounded-lg bg-neutral-100 py-1 px-2 placeholder:text-sm placeholder:text-neutral-600'
                        list={publicDatasets && publicDatasets.length > 0 ? "urlSuggestions" : undefined}
                    />
                    {publicDatasets && publicDatasets.length > 0 && (
                        <datalist id="urlSuggestions">
                            {publicDatasets.map((suggestion, index) => (
                                <option key={index} value={suggestion} />
                            ))}
                        </datalist>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="description" className='text-sm font-medium'>Resource Description (optional)</label>
                    <textarea
                        id="description"
                        name='description'
                        value={description}
                        rows={6}
                        onChange={handleChange}
                        pattern="https://.*"
                        placeholder='Provide further information about the resource you want to share.'
                        className=' rounded-lg bg-neutral-100 py-1 px-2 placeholder:text-sm placeholder:text-neutral-600'
                    />
                </div>
                <button type="submit" className="text-sm font-medium rounded-lg bg-neutral-100 py-1 px-2 flex self-end">
                    Share
                </button>
            </form>
            {responseMessage && (
                <div className={`alert ${isSuccess ? 'alert-success' : 'alert-error'}`}>
                    {responseMessage}
                </div>
            )}
        </div>
    )
}
