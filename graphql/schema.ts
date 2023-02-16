import { gql } from "graphql-tag"

export default gql`
    type User{
        id: String!
        first_name: String!
        last_name: String!
        address: String!
        email: String!
        password: String!
        isAdmin: Boolean
        orders: [Order]
        cart: [Cart]
    }
    type Auth {
        token: ID
        user: User
    }
    type Product{
        id: String!
        name: String!
        description: String!
        price: Float!
        quantity: Int
        category: Category!
    }
    type Category{
        id: String!
        name: String!
        description: String!
    }
    type CartItem{
        product: Product!
        Quantity: Int!
    }
    type Cart{
        userId: User!
        product: [CartItem]
        total: Float!
    }
    type Order{
        id: String!
        #Apollo does not have date but we can use a string as the type.
        purchaseDate: String
        orderStatus: String
        products: [Product!]
    }
    type Query{
        user(id:String, email:String): User
        users: [User]
        product(id:String!): Product
        products: [Product]
        category(id:String!): Category
        categories: [Category]
        cart(id:String!): Cart
        order(id:String!): Order
        orders: [Order]
    }
<<<<<<< HEAD
    type Mutation{
        createUser(
            first_name: String!
            last_name: String!
            address: String!
            email: String!
            password: String!
            isAdmin: Boolean
        ): User
=======
    type Mutation {
        addUser(
            first_name: String!
            last_name: String!
            email: String!
            password: String!
        ): Auth
        addToCart(product: ID!, quantity: Int!): Cart
        removeFromCart(product: ID!): Cart
        addOrder(product: [ID]!): Order
        updateUser(
            first_name: String
            last_name: String
            email: String
            Password: String
        ): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
>>>>>>> d3b230df824854f48160d2470716a0e2c8f79ab0
    }
`