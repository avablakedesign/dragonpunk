import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
});

const Order = mongoose.models.Order || model('Order', orderSchema);

export default Order;
