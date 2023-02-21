import React from 'react';
import { useContext } from "react"
import { UserContext } from "@/lib/client-context"
import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(process.env.STRIPE_PKEY!);

function CartPreview(props: any) {
    const { user, setUser } = useContext(UserContext);

    const handleCartPreview = () => {
        props.setCartPreview(false);
    };
    const handleCheckout = async () => {
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user?.cart)
            })
            const data = await response.json()
            console.log(data);
            location.href=data.session_url;
        }
        catch (err) {
            console.log(err);
        }
    };
    const renderProducts = () => {
        if (user && user.cart) {
            return user.cart.map((product: any) => {
                // make into its own component
                return (
                    <div key={product.id}>
                        <h5>
                            {product.name}
                        </h5>
                    </div>
                );
            });
        }
    };
    return (
        <div className="cart-preview">
            <div className="cart-preview-inner">
                {renderProducts()}
                <button onClick={handleCartPreview}>
                    Close
                </button>
                <button onClick={handleCheckout}>
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default CartPreview;