import React from 'react'
import { QuerySection } from '../sections/QuerySection'
import { ResultContainer } from '../components/ResultContainer'
import { Heading } from '../components/Heading'

export const Home = () => {
    return (
        <>
            <Heading>Solid Index</Heading>
            <div property='description' className="mt-8 font-medium">
                With the help of the query editor below, the resources shared in the network from different Solid Pods can be queried and retrieved. 
                To edit the query, you can click inside the editor. When done, click the Run-Button to return results.
            </div>
            <QuerySection />
            <ResultContainer />
        </>
    )
}
