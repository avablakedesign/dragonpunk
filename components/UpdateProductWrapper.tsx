import ProductPreview from "./ProductPreview"
import { useContext, useState } from "react"
import { UserContext } from "@/lib/client-context"
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";
import UpdateModal from "./UpdateModal";

const UpdateProductWrapper = (props: any) => {
    console.log(props)
    const { user, setUser } = useContext(UserContext);
    const [ showUpdate, setShowUpdate ] = useState(false);
    const handleUpdateProduct = async () => {
    setShowUpdate(true);    
    }
    const handleDeleteProduct = async () => {
        const confirmDelete = confirm("Are you sure you want to delete the product?")
        if (confirmDelete) {
            const mutation = gql`
                mutation Mutation($id: ID!) {
                    deleteProduct(id: $id)
}
            `
        const variables = {id:props.product.id}
        try {
            const response = await graphqlClient.request(mutation, variables);
            console.log(response);
            alert("Successfully deleted a product.")
            location.reload()
        }
        catch (err) {
            console.log(err);
            alert("Failed to delete a product.")
        }    
        }
    }
    return (
        <div className = "product-preview-wrapper supra-render-products-wrapper">
            <div>
                <button onClick={handleUpdateProduct} className = "button">
                    Update
                </button>
                <button onClick={handleDeleteProduct} className = "button">
                    Delete
                </button>
            </div>
            <ProductPreview {...props.product} />
            {showUpdate && <UpdateModal setShowModal={ setShowUpdate } {...props.product}/>}
        </div>
    )
}
export default UpdateProductWrapper