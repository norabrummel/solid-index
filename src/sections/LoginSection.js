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
            <div>Enter the URL of your identity provider:</div>
            <input
                id="idp"
                label="IDP"
                placeholder="Identity Provider"
                value={idp}
                onChange={(e) => setIdp(e.target.value)}
            />
            <LoginButton
                oidcIssuer={idp}
                redirectUrl={window.location.href}
                authOptions={authOptions}
            >
                <div className="text-sm font-medium rounded-lg bg-neutral-100 py-1 px-2 flex">Log in</div>
            </LoginButton>
            <div>Or pick an identity provider from the list below:</div>
            {providers.map((provider) => {
                const { id, name, url } = provider
                return (
                    <LoginButton
                        key={id}
                        oidcIssuer={url}
                        redirectUrl={window.location.href}
                        authOptions={authOptions}
                    >
                        {name}
                    </LoginButton>
                )
            })}
        </div>
    )
}
