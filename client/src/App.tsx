// boilerplate imports
import type { ReactNode } from "react"

// Import styles
import './styles/globals'

// Import next font to render local fonts.
import localFontOne from '@next/font/local'
import type { AppProps } from 'next/app'

// Load in the GloomyThings font.
const fontMain = localFontOne({
  src: "../public/GloomyThings.ttf"
})

// Import components
import Header from "./components/Header"
import Footer from "./components/Footer"

// UI function
function App({ Component, pageProps }: AppProps) {
  return (
    <div className = {fontMain.className}>
      <Header />
        <Component {...pageProps} />
      <Footer />
    </div>
  );
};

/** 
const App: React.FC = (props:Props) => {
  const [user, setUser] = useState(null)
  
  return (
      <UserProvider value = {{user, setUser}}>
          <Header/>
          <main>
              {props.children}
          </main>
          <Footer/>
      </UserProvider>
  )
} */

// Export UI function
export default App;
