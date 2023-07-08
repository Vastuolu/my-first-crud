const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
        name:{
            type: String,
            required: [true, "Produk harus memiliki nama"]
        },

        //Setiap key yang bertipe integer harus memiliki default nomor
        quantity:{
            type: Number,
            required: [true, "Produk harus memiliki harga"],
            default: 0
        },

        price:{
            type: Number,
            required: true,
            default: 0
        },

        image:{
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema)
module.exports = Product;