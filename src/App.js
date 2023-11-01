/* if (typeof TextDecoder === "undefined") {
  const util = require("util");
  global.TextDecoder = util.TextDecoder;
  global.TextEncoder = util.TextEncoder;
} */

import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthButton } from "./components/AuthButton"
import { JoinButton } from "./components/JoinButton"
import { useComunica } from "./lib/useComunica"
import { AboutSection } from "./sections/AboutSection"
import { Home } from "./pages/Home"
import { Join } from "./pages/Join"
import { useSolid } from "./lib/useSolid"
import { useSolidContext } from "./context/SolidContext"
import { getWebIdDataset, getPodUrlAllFrom, getSolidDataset } from "@inrupt/solid-client"
import { useSession } from "@inrupt/solid-ui-react"

function App() {
  const { fetchFileSources } = useComunica()
  const { getOrCreateResourceIndex } = useSolid()
  const { setResourceIndex, resourceIndex, setPublicDatasets } = useSolidContext()
  const { session } = useSession()

  useEffect(() => {
    if (resourceIndex) {
      fetchFileSources()
    }
    // eslint-disable-next-line
  }, [resourceIndex])

  useEffect(() => {
    if (session?.info?.isLoggedIn) {
      const fetchProfile = async (webId) => {
        const profile = await getWebIdDataset(webId)
        const podRoot = getPodUrlAllFrom({ webIdProfile: profile, altProfileAll: [] }, webId)
        const publicData = await getSolidDataset(`${podRoot}public`)
        const publicDataGraphs = publicData.graphs.default;
        const urls = Object.values(publicDataGraphs).map(subject => subject.url)
        setPublicDatasets(urls)
      }
      fetchProfile(session.info.webId)
        .catch(console.error);
    }
    // eslint-disable-next-line
  }, [session.info.isLoggedIn, session])

  useEffect(() => {
    async function fetchData() {
      const list = await getOrCreateResourceIndex('https://aggregator.solidcommunity.net/resource_links/')
      setResourceIndex(list)
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="w-full h-full"> 
      <header property="hasPart" typeof="WPHeader" className="w-full grid grid-cols-12 px-3 py-4">
        <div className=" col-span-2">
          <AuthButton />
        </div>
        <div className="col-span-7"></div>
        <div property="hasPart" typeOf="SiteNavigationElement" className="col-span-3 flex justify-end items-start"><JoinButton /></div>
      </header>
      <main className="w-full grid grid-cols-12 py-8">
        <div className="col-span-2"></div>
        <div property="mainContentOfPage" typeOf="WebPageElement" className="col-span-7">
          <Routes>
            <Route path="/solid-index/" element={<Home />} />
            <Route path="/solid-index/join" element={<Join />} />
          </Routes>
        </div>
        <div property="hasPart" typeOf="WPSideBar" className="col-span-3 p-12 ml-10">
          <AboutSection />
        </div>
      </main>
    </div>
  )
}

export default App
