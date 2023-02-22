import {useFormik} from "formik";
const Page = () => {
    const formik = useFormik({
        initialValues:{
            name: "",
            description: "", 
            price: 0.99,
            quantity: 1,
            category: ""
        }, 
        onSubmit:(values) => {
            console.log(values)
        }
    });
    return (
        <div>
            <h1>Create Product</h1>
            <div>
                <form onSubmit = {formik.handleSubmit}>
                    <div>
                        <label>
                            Product Name
                        </label>
                        <input
                            type = "text"
                            name = "name"
                            value = {formik.values.name}
                            onChange = {formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            description
                        </label>
                        <textarea
                            name = "description"
                            value = {formik.values.description}
                            onChange = {formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            price
                        </label>
                        <input
                            type = "text"
                            name = "price"
                            value = {formik.values.price}
                            onChange = {formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Quantity
                        </label>
                        <input
                            type = "text"
                            name = "quantity"
                            value = {formik.values.quantity}
                            onChange = {formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Category
                        </label>
                        <input
                            type = "text"
                            name = "category"
                            value = {formik.values.category}
                            onChange = {formik.handleChange}
                        />
                    </div>
                    <div>
                        <button 
                            type = "submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Page