import type { ReactNode } from "react"
import type { UserDetails } from "@/types"
import { useState, useEffect } from "react"
import { UserProvider } from "@/lib/client-context"
import Header from "./Header"
import Footer from "./Footer"
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";
import { useRouter } from "next/router"
//the layout is a wrapper around the child components that are the individual pages in the app.
//setting types
interface Props {
    children?: ReactNode
}

const Layout = (props: Props) => {
    const initialUser: any = null;
    const router = useRouter();
//setting the global user, which will be managed by context
    const [user, setUser] = useState(initialUser);

//This runs once when the page loads, its going to retrieve the user from the graphQL server and set the user if they exist.
    useEffect(() => {
        //retrieving saved cart from local storage.
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
                console.log("graphQL user", user);
                if (!user) {
                    return
                }
                console.log("layout user: ",{ ...user, cart: parsedLocalCart })
                setUser({ ...user, cart: parsedLocalCart })
            } catch (err) {
                console.log(err);
                setUser({ user: false, cart: [] })
            }
        }
        getUser()
    }, []
    )
    //here it protects admin routes, if a user tries to visit the admin dashboard or admin add product pages.
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