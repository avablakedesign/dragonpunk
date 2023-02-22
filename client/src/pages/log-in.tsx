import { useFormik } from "formik";
import graphqlClient from "@/lib/graphql-client";
import gql from "graphql-tag";
import {useRouter} from "next/router";
import { useContext } from "react";
import { UserContext } from "@/lib/client-context";

const Page = () => {
    const router = useRouter()
    const userContext = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            console.log(values)
            //TODO: connect this to an authentication service
            const dummyUser = {
                name: "randomUser",
                cart: [],
                isAdmin: false
            }
            userContext.setUser(
                dummyUser
            )
            if (dummyUser.isAdmin) {
                router.push("/admin/dashboard");
            }
            else {
                router.push("/search");
            }
        }
    });
    return (
        <div>
            <h1>Log In</h1>
            <div>
                <form onSubmit={formik.handleSubmit}>
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
                        <button
                            type="submit"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
        //make a form, email or password, validate if admin or not.

    )
}

export default Page