import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: CSS module declaration not found
import "./index.css";
import App from './App.tsx'
import ToggleLanguage from './provider/ToggleLanguage.tsx'
import { ThemeProvider } from './provider/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <ToggleLanguage>
    <App />
    </ToggleLanguage>
</ThemeProvider>
  </StrictMode>,
)
