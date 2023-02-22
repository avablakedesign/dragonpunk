import AddToCartWrapper from "@/components/AddToCartWrapper"
// import { Products } from "@/lib/dummy-data"
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";

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
    const renderProductsPreview = () => {
        return props.products.map((product: any) => {
            // key prop and generic props
            return <AddToCartWrapper key={product.id} product={product} />
        })
    }
    return (
        <div>
            <h1>Our Collections</h1>
            <div>
                {renderProductsPreview()}
            </div>
        </div>
    )
}

export default Page