import React from 'react'
import { App } from './app'
import { createRoot } from 'react-dom/client'
import './core/styles/index.scss'

const container = document.getElementById('neshan')!

const root = createRoot(container)

root.render(<App />)
