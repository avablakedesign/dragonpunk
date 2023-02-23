import connectMongo from "@/db/connection";
// import * as ApolloServerErrorCode from '@apollo/server/errors';
import { GraphQLError } from "graphql";
import User from "@/server/models/User";
import Product from "@/server/models/Product";
import Category from "@/server/models/Category";
import { authMiddleware, signToken } from "@/server/utils/auth";
import Stripe from 'stripe';
import { argumentsObjectFromField } from "@apollo/client/utilities";
// const stripe = loadStripe(process.env.STRIPE_PKEY!);
const stripe = new Stripe( process.env.STRIPE_ACCESS_KEY!, {
 apiVersion:"2022-11-15"
})

//A resolver is either function that returns data or changes data. These are similar to route handlers in express.js. 
export default {
    //A query is purely informational and does not change the state of the system. Like get requests.
    Query: {
        // return all categories
        categories: async () => {
            try {
                //need to await mongoDB connection before doing operations on the models.
                //we need to do this on every query and resolver function.
                await connectMongo();
                const categories = await Category.find({});
                return categories
            }
            catch (err) {
                console.log(err);
            }
        },
        products: async (parent: any, { first_name, last_name, email, password }: any) => {
            try{
                await connectMongo();
                const product = await Product.find({});
                    console.log(product)
                const stripeProduct = await stripe.products.list();
                    console.log(stripeProduct);
                return product;
            }
            catch(err){
                console.log(err);
                return null;
            }
        },
        user: async (parent: any, args:any, context:any, info:any) => {
            if (!context.user){
                return null
            }
            const authUser = context.user;
            return authUser;
        }
    },
//This is like a post request.
    Mutation: {
        addProduct: async (parent: any, args: any, contextValue: any, info: any) => {
            try {
                const client = await connectMongo();
                const category = await Category.findOneAndUpdate({
                    name:args.category
                },
                {
                    name:args.category    
                },
                {
                    upsert:true
                })
                console.log(category)
                //Here a new stripe product is added to the stripe dashboard. Thats independant from mongoDB.
                const stripeProduct = await stripe.products.create({
                    name: args.name,
                    default_price_data: {
                        unit_amount: args.price * 100, 
                        currency: "USD"
                    }

                })
                console.log("STRIPEPRODUCT", stripeProduct);
                const product = await Product.create({
                    ...args, 
                    price: Number(args.price),
                    category: category._id.valueOf(),
                    stripe_product_id: stripeProduct.id,
                    stripe_product_price_id: stripeProduct.id
                });
                console.log(product)
                return product
            }
            catch (err) {
                console.log(err)
                return null
            }
        }, 
        updateProduct: async (parent: any, args:any) => {
            try{
                const updateProduct = await Product.findOneAndUpdate({_id:args.id}, {...args}, {new:true});
                console.log(updateProduct);
                //update stripe here
                return updateProduct;
            }
            catch(err){
                console.log(err)
                return null
            }
        },  
        deleteProduct: async (parent: any, args:any) => {
            const deleteProduct = await Product.findOneAndDelete({_id:args.id});
                console.log(deleteProduct);
                //update stripe here
                return "success";
        },     
        addUser: async (parent: any, args:any) => {
            try {
                await connectMongo();
                const user = await User.create({...args});
                return user;
            }
            catch (err) {
                console.log(err)
                return null
            }
        },
        //We dont use the login here instead we use the /api/auth route.
        login: async (parent: any, { email, password }: any) => {
            try {
                await connectMongo()
                const user = await User.findOne({ email });
        
                if (!user) {
                throw new GraphQLError('No user found with this email address');
                }
        
                const correctPw = await user.isCorrectPassword(password);
        
                if (!correctPw) {
                throw new GraphQLError('Incorrect credentials');
                }
        
                const token = signToken(user);
        
                return { token, user };
            }
            catch (err) {
                console.log(err)
                return null
            }
        },

        // addToCart: async(parent, { id }, context) => {
        //     if (context.user) {
        //         const user = await User.findById(context.user.id);
        //         user.cart.product.push({ productId, quantity });
        //         await user.save();

        //         return user.cart;
        //     }
        // },
        // removeFromCart: async(parent, { id }, context) => {
        //     if (context.user) {
        //         const user = await User.findById(context.user.id);
        //         user.cart.product = user.cart.product.filter(product => product.productId != productId);
        //         await user.save();

        //         return user.cart;
        //     }
        // },
    }
}