import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "user"
    },
    items: [{
        product: {
            type: String,
            required: true,
            ref: "product"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: "order placed",
        required: true
    },
    date: {
        type: Number,
        required: true,
    },
    customName: {
        type: String,
        default: null
    },
    customPhone: {
        type: String,
        default: null
    }
})

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;