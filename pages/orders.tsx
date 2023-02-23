import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/lib/client-context";
import Link from "next/link";
//After the stripe checkout a user is redirected here to this page. 
//If the order is successful we clear the cart. 
const Page = () => {
    const router = useRouter();
    const {user, setUser} = useContext(UserContext); 
    useEffect(()=>{
        //When local storage changes then set the context to clear the cart. 
        window.addEventListener("storage", ()=>{
            setUser({...user, cart:[]})
        })
        localStorage.setItem("checkoutCart", JSON.stringify([]))
    }, [])
    if (router.query.success){
        return (
            <div>
                <h1>
                    Order successful.
                </h1>
                <div>
                    <Link href = "/search">
                        Return to Shopping.
                    </Link>
                </div>
            </div>
        )
    }
    if (router.query.cancelled){
        return (
            <div>
                <h1>
                    Order cancelled.
                </h1>
                <div>
                    <Link href = "/search">
                        Return to Shopping.
                    </Link>
                </div>
            </div>
        )  
    }
    return (
        <div>
            <h1>
                View past orders.
            </h1>
            <div>
                <Link href = "/search">
                    Return to Shopping.
                </Link>
            </div>
        </div>
    )

}

export default Page;