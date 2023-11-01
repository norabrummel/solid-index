import React from 'react'
import { LoginButton } from '@inrupt/solid-ui-react'

export const LoginSection = ({ idp, setIdp }) => {
    const providers = [
        { id: 0, name: 'Solid Community', url: 'https://solidcommunity.net' },
        { id: 0, name: 'Solid Web', url: 'https://solidweb.org/login' },
        { id: 0, name: 'Inrupt.net', url: 'https://inrupt.net/login' },
        { id: 0, name: 'pod.Inrupt.com', url: 'https://login.inrupt.com' },
    ]
    const authOptions = {
        clientName: "React Solid App",
    }
    return (
        <div>
            <div className='font-semibold text-xl'>Log in</div>
            <div className='text-sm font-medium mt-5'>Enter the URL of your identity provider:</div>
            <div className='flex flex-col gap-2 mt-1'>
                <input
                    type='url'
                    id="idp"
                    label="IDP"
                    placeholder="Identity Provider"
                    value={idp}
                    onChange={(e) => setIdp(e.target.value)}
                    className='rounded-lg bg-neutral-100 py-1 px-2 placeholder:text-sm text-sm placeholder:text-neutral-600'
                />
                <div className='flex justify-end'>
                    <LoginButton
                        oidcIssuer={idp}
                        redirectUrl={window.location.href}
                        authOptions={authOptions}
                    >
                        <div className="text-sm font-medium rounded-lg bg-neutral-100 py-1 px-2 flex">Log in</div>
                    </LoginButton>
                </div>
            </div>
            <div className='text-sm font-medium mt-8'>Or pick an identity provider from the list below:</div>
            <div className='flex flex-col gap-1 mt-1'>
                {providers.map((provider) => {
                    const { id, name, url } = provider
                    return (
                        <div className='w-full'>
                            <LoginButton
                                key={id}
                                oidcIssuer={url}
                                redirectUrl={window.location.href}
                                authOptions={authOptions}
                            >
                                <div className="text-sm font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200/50 py-1 px-2 flex items-center justify-center">{name}</div>
                            </LoginButton>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
