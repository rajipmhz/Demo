import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: CSS module declaration not found
import "./index.css";
// import App from './App.tsx'
import ToggleLanguage from './provider/ToggleLanguage.tsx'
import { ThemeProvider } from './provider/ThemeProvider.tsx'
import { SpeechProvider } from './provider/SpeechProvider.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme"
    >
      <ToggleLanguage>
        <SpeechProvider>
          <RouterProvider router={router} />
        </SpeechProvider>
      </ToggleLanguage>
    </ThemeProvider>
  </StrictMode>
)
