import { useFormik } from "formik";
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";
const Page = () => {
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            address: "",
            email: "",
            password: "",
            isAdmin: false
        },
        onSubmit: async (values) => {
            console.log(values)
            const mutation = gql`
            mutation Mutation($firstName: String!, $lastName: String!, $address: String!, $email: String!, $password: String!, $isAdmin: Boolean) {
                createUser(first_name: $firstName, last_name: $lastName, address: $address, email: $email, password: $password, isAdmin: $isAdmin) 
            {
                id
                first_name
                last_name
                address
                email
            }
        }`
            const variables = {
                "firstName": values.first_name,
                "lastName": values.last_name,
                "address": values.address,
                "email": values.email,
                "password": values.password,
                "isAdmin": values.isAdmin
            }
            try {
                const response = await graphqlClient.request(mutation, variables);
                console.log(response);
            }
            catch (err) {
                console.log(err);
            }
        }
    });
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        <input
                            type="text"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="isAdmin"
                            checked={formik.values.isAdmin}
                            onChange={formik.handleChange}
                        />
                        <label>
                            Sign up as Admin
                        </label>
                    </div>
                    <div>
                        <button
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
        //make a form, email or password, validate if admin or not.

    )
}

export default Page