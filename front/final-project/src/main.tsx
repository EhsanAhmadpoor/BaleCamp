import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import './styles/global.scss'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
// import './assets/fonts/_shabnam-font.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='system' storageKey='ui-theme'>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
