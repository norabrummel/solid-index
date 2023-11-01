import {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
    setThing,
    addStringNoLocale,
    createThing,
    getSourceUrl,
    addUrl,
} from "@inrupt/solid-client"
import { useSession } from "@inrupt/solid-ui-react"
import { useSolidContext } from "../context/SolidContext"

export function useSolid() {
    const currentDate = new Date().toISOString()
    const { session } = useSession()
    const { setIsSuccess, setResponseMessage, resourceIndex, setResourceIndex } = useSolidContext()

    const getOrCreateResourceIndex = async (containerUri) => {
        const indexUrl = `${containerUri}index.ttl`
        try {
            const resourceIndex = await getSolidDataset(indexUrl)
            return resourceIndex
        } catch (error) {
            if (error.statusCode === 404) {
                const resourceIndex = await saveSolidDatasetAt(
                    indexUrl,
                    createSolidDataset()
                )
                return resourceIndex
            }
            if (error.statusCode === 401) {
                console.log("Authorization required:", error)
                //TODO
                // You can handle this scenario by prompting users to authenticate
                // or providing more information to the user.
            } else {
                console.error("An unexpected error occurred:", error)
            }
        }
    }

    const addResource = async (title, url, description) => {
        try {
            if (resourceIndex) {
                const indexUrl = getSourceUrl(resourceIndex)
                let newResource = createThing()
                // Add title
                newResource = addStringNoLocale(newResource, "http://purl.org/dc/terms/title", title)
                // Add URL
                newResource = addUrl(newResource, "http://purl.org/dc/terms/source", url)
                // Add description
                newResource = addStringNoLocale(newResource, "http://purl.org/dc/terms/description", description)
                // Add type
                newResource = addUrl(newResource, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", "https://example.org/#Resource")
                // Add webId if user is authenticated
                if (session?.info?.isLoggedIn) {
                    const webId = session.info.webId
                    newResource = addUrl(newResource, "https://www.w3.org/ns/solid/terms#owner", webId)
                }
                // Add date
                newResource = addStringNoLocale(newResource, "http://purl.org/dc/terms/created", currentDate)

                const updatedResourceIndex = setThing(resourceIndex, newResource)
                const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedResourceIndex)
                setResourceIndex(updatedDataset)
                console.log('saved successfully', newResource)
                setIsSuccess(true)
                setResponseMessage("Resource added successfully! Thank you for your contribution.")
            } else {
                console.error("resourceIndex is not initialized")
                setIsSuccess(false)
                setResponseMessage("Error: resourceIndex is not initialized.")
            }
        } catch (error) {
            console.error("Error adding resource:", error.message)
            setIsSuccess(false)
            setResponseMessage(`Error: ${error.message}`)
        }
    }

    return { getOrCreateResourceIndex, addResource }
}