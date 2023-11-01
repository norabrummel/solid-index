import React, { useState } from 'react'
import { useSession, CombinedDataProvider, LogoutButton, Text } from "@inrupt/solid-ui-react"
import { useModalContext } from '../context/ModalContext'
import { LoginSection } from '../sections/LoginSection'
import ModalContent from '../components/ModalContent'

export const AuthButton = () => {
    const { session } = useSession()
    const { handleModal } = useModalContext()
    const { webId } = session.info
    const [idp, setIdp] = useState("https://login.inrupt.com")
    return (
        <div className="flex" property="hasPart" typeof="InteractAction">
            {session.info.isLoggedIn ? (
                <CombinedDataProvider
                    datasetUrl={webId}
                    thingUrl={webId}
                >
                    <div className="flex flex-col">
                        <div className='flex' role='button' property="UnRegisterAction">
                            <LogoutButton>
                                <div className="text-sm font-medium rounded-lg bg-neutral-100 py-1 px-2">Log out</div>
                            </LogoutButton>
                        </div>
                        <div className='flex mt-4'>
                            <Text
                                properties={[
                                    "http://www.w3.org/2006/vcard/ns#fn",
                                    "http://xmlns.com/foaf/0.1/name"
                                ]}
                                className='font-semibold'
                            />
                        </div>
                    </div>
                </CombinedDataProvider>
            ) : (
                <div>
                    <button
                        property="RegisterAction"
                        className="text-sm font-medium rounded-lg bg-neutral-100 py-1 px-2"
                        onClick={() => {
                            handleModal(<ModalContent content={<LoginSection idp={idp} setIdp={setIdp} />} />)
                        }}
                    >
                        Log in
                    </button>
                </div>
            )}
        </div>
    )
}
