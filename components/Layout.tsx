import type { ReactNode } from "react"
import type { UserDetails } from "@/types"
import { useState, useEffect } from "react"
import { UserProvider } from "@/lib/client-context"
import Header from "./Header"
import Footer from "./Footer"
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";
import { useRouter } from "next/router"

interface Props {
    children?: ReactNode
}
const Layout = (props: Props) => {
    const initialUser: any = null;
    const router = useRouter();
    const [user, setUser] = useState(initialUser);


    useEffect(() => {
        let localCart = localStorage.getItem("checkoutCart")
        let parsedLocalCart: Array<any> = [];
        if (!localCart) {
            localStorage.setItem("checkoutCart", JSON.stringify([]));
        }
        else {
            parsedLocalCart = JSON.parse(localCart);
        }
        const getUser = async () => {
            const query = gql`
                query Query {
                    user {
                        id
                        first_name
                        email
                        isAdmin
  }
}
            `
            try {
                const authToken = localStorage.getItem("authToken");
                if (!authToken) {
                    return
                }
                graphqlClient.setHeader("Authorization", authToken);
                const user = await graphqlClient.request(query);
                console.log(user);
                if (!user) {
                    return
                }
                setUser({ ...user, cart: parsedLocalCart })
            } catch (err) {
                console.log(err);
                setUser({ user: false, cart: [] })
            }
        }
        getUser()
    }, []
    )
    useEffect(() => {
        console.log("user layout use effect", user);
        console.log(router);
        if (user !== null) {
            console.log("user layout use effect not null", user);
            if (!user?.user?.isAdmin && router.pathname.includes("admin")) {
                router.push("/search")
            }
        }
    }, [user])

    return (
        <UserProvider value={{ user, setUser }}>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </UserProvider>
    )
}
export default Layout;