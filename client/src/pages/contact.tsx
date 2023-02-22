import { useFormik } from "formik";
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";
const Page = () => {
    const formik = useFormik({
        initialValues: {
        },
        onSubmit: async (values) => {
            console.log(values)
        }
    });
    return (
        <div>
            <h1>Contact</h1>
            <div>
                <form onSubmit={formik.handleSubmit}>
                </form>
            </div>
        </div>
    )
}

export default Page