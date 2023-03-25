import { useContext, useState } from "react"
import { UserContext } from "@/lib/client-context";
import Link from "next/link" 
import {useRouter} from "next/router";
import CartPreview from "@/components/CartPreview";
const Header = () => {
    const router = useRouter()
    const userContext = useContext(UserContext);
    console.log("header userContext", userContext);
    const userContextUser:any = userContext.user
    const [cartPreview, setCartPreview] = useState(false) 
    const handleCartPreview = () => {
        setCartPreview(true)
    }
    const handleLogout = async () => {
        try {
            // const logOutResponse = await fetch("/api/auth", {
            //     method: "DELETE"
            // })
            // const logOutData = await logOutResponse.json();
            localStorage.removeItem("authToken");
            userContext.setUser(null);
            router.push("/");   
        } catch (err) {
            console.log(err);
            alert("Can not log out.")
        }
    }
    return (
        <header>
            {
                userContext && userContext.user?
                <div>
                    <p>{userContextUser?.user?.first_name}</p>
                    <button onClick = {handleCartPreview} className = "button">
                        Cart{" "}
                        <span>{userContext.user.cart.length}</span>
                    </button>
                    <button onClick = {handleLogout} className = "button">
                        Logout
                    </button>
                    <div className = "search">
                        <Link href = "/search">
                            <button className = "button">
                                Search    
                            </button> 
                        </Link>
                    </div>
                    {userContextUser?.user?.isAdmin && 
                        <div className = "dashboard">
                            <Link href = "/admin/dashboard">
                                <button className = "button">
                                    Dashboard   
                                </button> 
                            </Link>
                        </div>
                    }
                    {cartPreview && <CartPreview setCartPreview = {setCartPreview}/>}
                </div>
                :
                <div className = "sign-up-log-in-wrapper">
                    <div className = "sign-up">
                        <Link href = "/sign-up">
                            <button className = "button">
                                Sign Up 
                            </button>
                        </Link>
                    </div>
                    <div className = "log-in">    
                        <Link href = "/log-in">
                            <button className = "button">
                                Login    
                            </button> 
                        </Link>
                    </div> 
                    <div className = "search">
                        <Link href = "/search">
                            <button className = "button">
                                Search    
                            </button> 
                        </Link>
                    </div>   
                </div>
            }
        </header>
    )
}
export default Header;