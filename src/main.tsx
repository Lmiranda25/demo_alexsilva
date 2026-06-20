import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { AulaProvider } from './lib/aulaAuth'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <AulaProvider>
        <App />
      </AulaProvider>
    </HashRouter>
  </React.StrictMode>,
)
