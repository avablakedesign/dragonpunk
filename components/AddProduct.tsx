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
            category: "",
            main_image: ""
        },
        onSubmit: async (values) => {

            console.log(values)
            const mutation = gql`
                mutation Mutation($name: String!, $description: String!, $price: Float!, $category: String!, $quantity: Int, $images: [String]) {
                    addProduct(name: $name, description: $description, price: $price, category: $category, quantity: $quantity, images: $images) {
                        id
                    }
                }
            `
            const variables = {...values, images:[values.main_image], price:Number(values.price), quantity:Number(values.quantity)}
            try {
                const response = await graphqlClient.request(mutation, variables);
                console.log(response);
                alert("Successfully added a new product.")
                location.reload()
            }
            catch (err) {
                console.log(err);
                alert("Failed to add a product. Are you sure you have a unique name?")
            }
        }
    });
    return (
      <div className = "modal">
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
                            Image
                        </label>
                        <input
                            placeholder="Paste a link to an image."
                            type="text"
                            name="main_image"
                            value={formik.values.main_image}
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
                            type="number"
                            min={0.99}
                            step={0.01}
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
                            type="number"
                            min={1}
                            step={1}
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
                        <button className = "button"
                            type="submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>

    )
}

export default AddProduct