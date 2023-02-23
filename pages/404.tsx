import Link from "next/link";
const Page = () => {
    return (
        <div>
            <div>
                <h1>
                    This is not the dragon you are looking for...
                </h1>
            </div>
            <div>
                <Link href="/">
                    Go Back
                </Link>
            </div>
        </div>
    )
}

export default Page;