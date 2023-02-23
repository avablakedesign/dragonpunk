//This is the page for all the products to be listed.
import AddToCartWrapper from "@/components/AddToCartWrapper"
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";

//This function runs on the server before the page loads
//This retrieves all the products from the graphql server, and passes them into the page as props.
//Before the page loads this function gets executed.
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
const Page = (props: any) => {
    //This maps over all the prodcts retrieved from the server and returns a unique component for each. 
    const renderProductsPreview = () => {
        return props.products.map((product: any) => {
            // key prop and generic props
            return <AddToCartWrapper key={product.id} product={product} />
        })
    }
    return (
        <div className = "supra-render-products-wrapper">
            <h1>Our Collections</h1>
            <div className = "render-products-wrapper">
                {renderProductsPreview()}
            </div>
        </div>
    )
}

export default Page