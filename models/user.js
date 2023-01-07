const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId : { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quanity: { type: Number, required: true }
            }
        ]
    }
})

module.exports = mongoose.model('User', UserSchema);








// const getdb = require('../util/database').getdb;
// const mongodb = require('mongodb');

// class User {
//     constructor(id, name, phone, street, city, cart, orders){
//         this.name = name;
//         this.phone = phone;
//         this.street = street;
//         this.city = city;
//         this.cart = cart;
//         this.orders = orders;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//     }

//     save(){
//       const db = getdb();
//       let dbOp;
//       if(this._id){
//         dbOp = db.collection('users').updateOne({_id: this._id}, {$set: this});
//       }else{
//         dbOp = db.collection('users').insertOne(this)
//       }
//       return dbOp
//       .then(result => {
//         console.log(result);
//       }).catch(err => {
//         console.log(err);
//       });
//     }

//     static fetchall(){
//       const db = getdb();
//       return db.collection('users')
//       .find()
//       .toArray()
//       .then(users =>{
//         return users;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }

//     static findById(userid){
//       const db = getdb();
//       return db.collection('users')
//       .findOne({ _id: new mongodb.ObjectId(userid) })
//       .then(user => {
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }

//     createOrder(){
//       const db = getdb();
//       return this.getCart()
//       .then(products => {
//         const order = {
//           items: [...products],
//           UserId: this._id
//         }
//         return db.collection('orders')
//         .insertOne(order)
//         .then(result => {
//           let ordersarray;
//           if(this.orders){
//             ordersarray = this.orders;
//           }else{
//             ordersarray = []
//           }
//           ordersarray.push(result.insertedId);
//           return db.collection('users')
//           .updateOne({ _id: this._id }, {$set: {orders: ordersarray}})
//           .then(result => {
//             this.cart.items = []
//             const updatedcart = { items: [] }
//             return db.collection('users')
//             .updateOne({ _id: this._id }, {$set: {cart: updatedcart}});
//           }).catch(err => {
//             console.log(err);
//           });
//         })
//       })
//     }

//     getOrders(){
//       const db = getdb();
//       return db.collection('orders').find({_id :{$in: this.orders} }).toArray()
//           .then(orders => {
//             return orders;
//           })
//     }

//     getCart(){
//       const db = getdb();
//       const productIds = this.cart.items.map(item => {
//         return item.productId;
//       });
//       return db.collection('products').find({_id :{$in: productIds} }).toArray()
//           .then(products => {
//               return products.map(product => {
//                 return{
//                   ...product,
//                   quantity: this.cart.items.find(i => {
//                     return i.productId.toString() === product._id.toString() 
//                   }).quantity
//                 }
//               })
//           })
//     }

//     deleteCartitem(prodId){
//       const db = getdb();
//       const products = this.cart.items;
//       const productindex = this.cart.items.findIndex(cp => {
//         return cp.productId.toString() === prodId.toString();
//       });
//       if(productindex >= 0){
//         products.splice(productindex,1);
//       }
//       const updatedcart = { items: products }
//       return db.collection('users')
//       .updateOne({ _id: this._id }, {$set: {cart: updatedcart}});
//     }

//     updateCart(product){
//       const cartproductindex = this.cart.items.findIndex(cp => {
//         return cp.productId.toString() === product._id.toString();
//       })
//       const cartitems = this.cart.items;
//       if(cartproductindex === -1){
//         const obj = {
//           productId: product._id,
//           quantity: "1"
//         }
//         cartitems.push(obj);
//       }else{
//         const oldquantity = parseInt(cartitems[cartproductindex].quantity);
//         const newquantity = oldquantity + 1;
//         cartitems[cartproductindex].quantity = newquantity.toString();
//       }
//       const updatedcart = { items: cartitems }
//       const db = getdb();
//       return db.collection('users')
//       .updateOne({ _id: this._id }, {$set: {cart: updatedcart}});
//     }
    
//     static deleteById(userid){
//       const db = getdb();
//       return db.collection('users')
//       .deleteOne(
//         {_id: new mongodb.ObjectId(userid) }
//       )
//       .then(result =>{
//         return result;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }
// }

// module.exports = User;