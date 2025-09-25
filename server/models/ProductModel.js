import mongoose  from "mongoose";

const productSchema = new  mongoose.Schema({
      title:{type: String, required: true},
      images: [{type: String, required: true}],
      description:{type: String, required: true},
      price:{type: Number, required: true},
      discount:{type: String,},
      category: {type: String, required: true},
      timestamp: { type: Date, default: Date.now },
    },   
) 

const  productModel = mongoose.model("prodctModel",productSchema);

export default productModel;