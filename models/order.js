const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        title: {
          type: String,
          required: true
        },
        price : {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        quantity: { 
          type: Number, 
          required: true 
        }
      }
    ]
})

OrderSchema.methods.createOrder = function(user, products) {
  const orderitems = products.map((product) => {
      return {
        productId : product._id,
        title: product.title,
        price: product.price,
        description: product.description,
        imageUrl : product.imageUrl,
        userId : user._id,
        quantity: product.quantity
      }
  })

}

module.exports = mongoose.model('Order', OrderSchema);
