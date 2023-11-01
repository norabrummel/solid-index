import { QueryEngine } from "@comunica/query-sparql"
import { getSourceUrl } from "@inrupt/solid-client"
import { useSolidContext } from "../context/SolidContext"
import { useQueryContext } from "../context/QueryContext"

export function useComunica() {
    const { resourceIndex } = useSolidContext()
    const { setFileSources } = useQueryContext()
    const myEngine = new QueryEngine()

    // const fetchFileSources = async () => {
    //     const bindingsStream = await myEngine.queryBindings(`
    //         SELECT ?o WHERE {
    //             ?s <http://www.w3.org/ns/ldp#contains> ?o .
    //             FILTER(REGEX(STR(?o), '\\\\.ttl$'))
    //         }
    //     `, {
    //         sources: [
    //             // 'https://fragments.dbpedia.org/2016-04/en',
    //             'https://storage.inrupt.com/a12ed128-b062-4ad4-a64c-b31d1a55e000/museums/'
    //         ],
    //     })

    //     bindingsStream.on('data', (binding) => {
    //         const fileLink = binding.get('o').value
    //         setFileSources(prevSources => {
    //             // If fileLink is not already in the array, add it. Otherwise, return the array as-is.
    //             return prevSources.includes(fileLink) ? prevSources : [...prevSources, fileLink]
    //         })
    //     })

    //     bindingsStream.on('end', () => {
    //         console.log('sources fetched')
    //     })

    //     bindingsStream.on('error', (error) => {
    //         console.error(error)
    //     })
    // }

    const fetchFileSources = async () => {
        const bindingsStream = await myEngine.queryBindings(`
            SELECT ?o WHERE {
                ?s <http://purl.org/dc/terms/source> ?o .
            }
        `, {
            sources: [
                getSourceUrl(resourceIndex)
            ],
        })

        bindingsStream.on('data', async (binding) => {
            const fileLink = binding.get('o').value

            // Check if it is a folder by the trailing slash
            if (fileLink.endsWith('/')) {
                // Fetch .ttl files contained in this folder
                const folderBindingsStream = await myEngine.queryBindings(`
                    SELECT ?file WHERE {
                        <${fileLink}> <http://www.w3.org/ns/ldp#contains> ?file .
                        FILTER(REGEX(STR(?file), '\\\\.ttl$'))
                    }
                `, {
                    sources: [fileLink],
                })

                folderBindingsStream.on('data', (folderBinding) => {
                    const folderFileLink = folderBinding.get('file').value
                    setFileSources(prevSources => {
                        return prevSources.includes(folderFileLink) ? prevSources : [...prevSources, folderFileLink]
                    })
                })
            } else {
                // It's a file, so add it directly to sources
                setFileSources(prevSources => {
                    return prevSources.includes(fileLink) ? prevSources : [...prevSources, fileLink]
                })
            }
        })

        bindingsStream.on('end', () => {
            console.log('sources fetched')
        })

        bindingsStream.on('error', (error) => {
            console.error(error)
        })
    }

    const querySources = async (sources, query) => {
        let allResults = []
        for (let fileLink of sources) {
            const result = await myEngine.query(query, {
                sources: [fileLink],
            })

            if (result.resultType === 'bindings') {
                const bindings = await processBindingsStream(await result.execute())

                // Add the source to each binding
                const bindingsWithSource = bindings.map(binding => ({ ...binding, source: fileLink }))
                allResults = allResults.concat(bindingsWithSource)
            }
        }
        return allResults
    }


    const processBindingsStream = (bindingsStream) => {
        return new Promise((resolve) => {
            const bindings = []

            bindingsStream.on('data', (binding) => {
                const bindingObj = {
                    s: binding.get('s') ? binding.get('s').value : null,
                    p: binding.get('p') ? binding.get('p').value : null,
                    o: binding.get('o') ? binding.get('o').value : null,
                }
                bindings.push(bindingObj)
            })

            bindingsStream.on('end', () => {
                resolve(bindings)
            })

            bindingsStream.on('error', (error) => {
                console.log(error)
            })
        })
    }

    return { myEngine, fetchFileSources, querySources }
}