import '@/styles/globals.scss'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const root = document.getElementById('root')
root &&
  ReactDOM.createRoot(root).render(
    <React.Suspense>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>,
  )
