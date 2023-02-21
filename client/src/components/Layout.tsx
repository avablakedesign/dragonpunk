import type { ReactNode } from "react"
import { useState } from "react"
import { UserProvider } from "@/lib/client-context"
import Header from "./Header"
import Footer from "./Footer"
interface Props {
    children?:ReactNode
}
const Layout = (props:Props) => {
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
}
export default Layout;