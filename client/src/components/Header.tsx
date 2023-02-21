import { useContext, useState } from "react"
import { UserContext } from "@/lib/client-context";
import Link from "next/link" 
import {useRouter} from "next/router";
import CartPreview from "@/components/CartPreview";
const Header = () => {
    const router = useRouter()
    const userContext = useContext(UserContext);
    console.log(userContext);
    const [cartPreview, setCartPreview] = useState(false) 
    const handleCartPreview = () => {
        setCartPreview(true)
    }
    const handleLogout = () => {
        userContext.setUser(null);
        router.push("/");
    }
    return (
        <header>
            {
                userContext && userContext.user?
                <div>
                    <p>{userContext.user.name}</p>
                    <button onClick = {handleCartPreview}>
                        Cart
                        <span>{userContext.user.cart.length}</span>
                    </button>
                    <button onClick = {handleLogout}>
                        Logout
                    </button>
                    {cartPreview && <CartPreview setCartPreview = {setCartPreview}/>}
                </div>
                :
                <div>
                    <Link href = "/sign-up">
                        Sign Up
                    </Link>
                    <Link href = "/log-in">
                        Login
                    </Link>
                </div>
            }
        </header>
    )
}
export default Header;