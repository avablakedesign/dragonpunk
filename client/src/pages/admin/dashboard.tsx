import AddProduct from "@/components/AddProduct"
import { useState } from "react"
import { Products } from "@/lib/dummy-data"
import ProductPreview from "@/components/ProductPreview"
export const getServerSideProps = () => {
    return {
        props:{
            products:Products
        }
    }
}
const Page = (props:any) => {
    const [products, setProducts] = useState(props.products);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const handleShowAddProduct = () => {
        setShowAddProduct(true) 
    }
    const renderProductsPreview = () => {
        return products.map((product:any)=>{
            // key prop and generic props
            return <ProductPreview key={product.id} {...product}/>
        })
    }
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <button onClick = {handleShowAddProduct}>
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