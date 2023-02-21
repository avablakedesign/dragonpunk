import ProductPreview from "./ProductPreview"
import { useContext } from "react"
import { UserContext } from "@/lib/client-context"
const AddToCartWrapper = (props: any) => {
    const { user, setUser } = useContext(UserContext);
    const handleAddToCart = () => {
        if (user && user.cart) {
            setUser({
                ...user,
                cart: [...user.cart, props.product]
            })
        }
    }
    return (
        <div>
            <div>
                <button onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
            <ProductPreview {...props.product} />
        </div>
    )
}
export default AddToCartWrapper