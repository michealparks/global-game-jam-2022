import './index.css'
import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import App from './App'

const main = async () => {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.querySelector('#root')
  )
}

main()
