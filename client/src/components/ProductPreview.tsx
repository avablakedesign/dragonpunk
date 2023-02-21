interface Props {
    name:string;
    description:string;
    price:number;
    quantity:number;
    images:string[];
}
const ProductPreview = (props:Props) => {
    return(
        <div className = "product-preview">
            <div>
                <h5>
                    {props.name}
                </h5>
            </div>
            <div className = "product-preview-image">
                <img src = {props.images[0]} alt = "mainimage"/>
            </div>
            <div>
                <p>
                    {props.description}
                </p>
            </div>
            <div>
                    <p>
                        price: {props.price}
                    </p>
                    <p>
                        quantity: {props.quantity}
                    </p>
            </div>
        </div>
    )
}
export default ProductPreview