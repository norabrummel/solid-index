import React from 'react'
import { useQueryContext } from '../context/QueryContext'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import { Spinner } from './Spinner'

export const ResultContainer = () => {
    const { queryResults, loadingQuery } = useQueryContext()

    function isURL(str) {
        try {
            new URL(str)
            return true
        } catch (_) {
            return false
        }
    }

    const renderLinkIfURL = (str) => isURL(str)
        ? <a href={str} target="_blank" rel="noopener noreferrer" className='underline'>{str}</a>
        : str


    return (
        <div>
            {
                loadingQuery ? (
                    <Spinner />
                ) : (
                    queryResults.length ? (
                        <>
                            <div><span className=' font-semibold'>{queryResults.length}</span> results</div>
                            <div className="flow-root mt-4 h-96 overflow-y-auto">
                                <div className="overflow-x-auto"> {/* -mx-4 -my-2 sm:-mx-6 lg:-mx-8 */}
                                    <div className="inline-block min-w-full py-2 align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y border-b">
                                                <thead className="">
                                                    <tr>
                                                        <th scope="col" className=" px-3 text-left text-sm font-medium">
                                                            s
                                                        </th>
                                                        <th scope="col" className="px-3 text-left text-sm font-medium">
                                                            p
                                                        </th>
                                                        <th scope="col" className="px-3 text-left text-sm font-medium">
                                                            o
                                                        </th>
                                                        <th scope="col" className="px-3 text-left text-sm font-medium">
                                                            source
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y bg-transparent">
                                                    {queryResults.map((result, index) => {
                                                        const { s, p, o, source } = result
                                                        return (
                                                            <tr
                                                                key={index}
                                                                className='divide-x'
                                                            >
                                                                <td className="whitespace-nowrap py-2 px-3 text-sm">
                                                                    {s && renderLinkIfURL(s)}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-1 text-sm">
                                                                    {p && renderLinkIfURL(p)}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-1 text-sm">
                                                                    {o && renderLinkIfURL(o)}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-1 text-sm">
                                                                    {source && (isURL(source) ? <a className='flex items-center gap-1' href={source} target='_blank' rel="noopener noreferrer"><ArrowTopRightOnSquareIcon className='w-4' strokeWidth={2} /> source</a> : '')}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )
                )
            }
        </div>
    )
}
