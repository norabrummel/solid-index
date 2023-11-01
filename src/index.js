/* if (typeof TextDecoder === "undefined") {
  const util = require("util");
  global.TextDecoder = util.TextDecoder;
  global.TextEncoder = util.TextEncoder;
} */

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { SessionProvider } from "@inrupt/solid-ui-react"
import { QueryProvider } from './context/QueryContext'
import { ModalProvider } from './context/ModalContext'
import { SolidProvider } from './context/SolidContext'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <QueryProvider>
          <SolidProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </SolidProvider>
        </QueryProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
