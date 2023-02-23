import ProductPreview from "./ProductPreview"
import { useContext } from "react"
import { UserContext } from "@/lib/client-context"
const AddToCartWrapper = (props: any) => {
    const { user, setUser } = useContext(UserContext);
    const handleAddToCart = () => {
        if (user && user.cart) {
            const newCart = [...user.cart, props.product]
            localStorage.setItem("checkoutCart", JSON.stringify(newCart))
            setUser({
                ...user,
                cart: newCart
            })
        }
    }
    return (
        <div className = "product-preview-wrapper">
            <div>
                <button onClick={handleAddToCart} className = "button">
                    Add to Cart
                </button>
            </div>
            <ProductPreview {...props.product} />
        </div>
    )
}
export default AddToCartWrapper