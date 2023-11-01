import React from 'react'
import githubIcon from '../assets/github-mark.svg'
import notionIcon from '../assets/notion-logo.svg'

export const AboutSection = () => {
    return (
        <div>
            <div property="headline" className='font-semibold text-xl'>About</div>
            <div property="description" className='mt-4'>
            This project aims to visualize how to use Solid and Comunica to create an index of decentralized resources from multiple Solid Pods that can be accessed and queried with the help of the Comunica query engine.
            </div>
            <div prefix='http://xmlns.com/foaf/0.1/' className='mt-6 flex gap-4 items-center justify-end'>
                <a property='page' href='https://www.notion.so/Dezentrale-Forschungsinfrastrukturen-und-die-nachhaltige-Zug-nglichkeit-von-Forschungsdaten-6ea0cae11a934b7486b145245eb70ac8?pvs=4' target='_blank' rel="noopener noreferrer"><img property="logo" src={githubIcon} alt='github' className='w-6'/></a>
                <a property='page' href='https://github.com/norabrummel/solid-index' target='_blank' rel="noopener noreferrer"><img property="logo" src={notionIcon} alt='notion' className='w-6'/></a>
            </div>
        </div>
    )
}
