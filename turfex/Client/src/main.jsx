import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'


const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!clerk_key) throw new Error("Provide clerk key");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerk_key}
     >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
