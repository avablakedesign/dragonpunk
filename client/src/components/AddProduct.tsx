import { useFormik } from "formik";
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";
const AddProduct = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: 0.99,
            quantity: 1,
            category: ""
        },
        onSubmit: (values) => {

            console.log(values)
            const addProduct = gql`
                mutation Mutation($name: String!, $description: String!, $price: Float!, $category: String!, $quantity: Int, $images: [String]) {
                    addProduct(name: $name, description: $description, price: $price, category: $category, quantity: $quantity, images: $images) {
                        id
                    }
                }
            `
        }
    });
    return (
        <div>
            <h1>Create Product</h1>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            description
                        </label>
                        <textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            price
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Quantity
                        </label>
                        <input
                            type="text"
                            name="quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddProduct