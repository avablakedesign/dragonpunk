import connectMongo from "../db/connection";
// import * as ApolloServerErrorCode from '@apollo/server/errors';
import { GraphQLError } from "graphql";
import User from "@/server/models/User";
import Product from "@/server/models/Product";
import Category from "@/server/models/Category";
import { authMiddleware, signToken } from "@/server/utils/auth";
import Stripe from 'stripe';
// const stripe = loadStripe(process.env.STRIPE_PKEY!);
const stripe = new Stripe( process.env.STRIPE_ACCESS_KEY!, {
 apiVersion:"2022-11-15"
})


export default {
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
    },

    //         // return all products
    //         products: async (parent, {category, name }) => {
    //             const params = {};

    //             if (category) {
    //                 params.category = category;
    //             }

    //             if (name) {
    //                 params.name = {
    //                     $regex: name,
    //                 };
    //             }

    //             return Product.find(params).populate('category');
    //         },

    //         // return single product by Id
    //         product: async (parent, {id}) =>
    //             Product.findById(id).populate('category'),

    //         // return single user by Id
    //         user: async (parent, args, context) => {
    //             if (context.user) {
    //                 const user = await User.findById(context.user.id).populate({
    //                     path: 'orders.products',
    //                     populate: 'category',
    //                 });

    //                 user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

    //                 return user;
    //             }

    //             throw new AuthenticationError('Not logged in');
    //         },

    //         // return all of a users previous orders
    //         orders: async (parent, { id }, context) => {
    //             if (context.user) {
    //                 const user = await User.findById(context.user.id).populate({
    //                     path: 'orders.products',
    //                     populate: 'category',
    //                 });

    //                 return user.orders.id(id);
    //             }

    //             throw new AuthenticationError('Not logged in');
    //         },

    //         // Desired Result: Go to User Cart Subdoc and view all 'cartItems' inside of the user cart
    //         cart: async (parent, { id }, context) => {
    //             if (context.user) {
    //                 const user = await User.findById(context.user.id).select('cart');
    //             };
    //             return user.cart.id(id);
    //         }
    //     },

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
        addUser: async (parent: any, { first_name, last_name, email, password }: any) => {
            try {
                await connectMongo();
                const user = await User.create({ first_name, last_name, email, password });
                const token = signToken(user);
                return { token, user };
            }
            catch (err) {
                console.log(err)
                return null
            }
        },
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