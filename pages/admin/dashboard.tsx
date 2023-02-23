import AddProduct from "@/components/AddProduct"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import ProductPreview from "@/components/ProductPreview"
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";
import UpdateProductWrapper from "@/components/UpdateProductWrapper";
import { UserContext } from "@/lib/client-context";
export const getServerSideProps = async () => {
    const query = gql`
        query Query {
            products {
                description
                id
                images
                name
                price
                quantity
                stripe_product_id
                stripe_product_price_id
            }
        }
    `
    try {
        const data = await graphqlClient.request(query);
        return {
            props: {
                products: data.products
            }
        }
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                products: []
            }
        }
    }
}
const Page = (props:any) => {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const [products, setProducts] = useState(props.products);
    const [showAddProduct, setShowAddProduct] = useState(false);
    // useEffect(()=>{
    //     console.log("admin dashboard user", user)
    //     if(!user?.isAdmin){
    //         // router.push("/search")
    //     }
    // },
    // //dependency array, if you pass in nothing it runs once when it loads.
    // [user]
    // );

    const handleShowAddProduct = () => {
        setShowAddProduct(true) 
    }
    const renderProductsPreview = () => {
        return products.reverse().map((product:any)=>{
            // key prop and generic props
            return <UpdateProductWrapper key={product.id} product={product}/>
        })
    }
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <button onClick = {handleShowAddProduct} className = "button">
                    Add Product
                </button >
                {showAddProduct && <AddProduct/>}
            </div>
            <div>
                {renderProductsPreview()}
            </div>
        </div>
    )      
}
export default Page