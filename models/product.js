const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    }
})

module.exports = mongoose.model('Product', productSchema);






// const getdb = require('../util/database').getdb;
// const mongodb = require('mongodb');

// class Product {
//     constructor(title, imageUrl, price, description, id, userid){
//         this.title = title;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userid = userid
//     }

//     save(){
//       const db = getdb();
//       let dbOp;
//       if(this._id){
//         dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
//       }else{
//         dbOp = db.collection('products').insertOne(this)
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
//       return db.collection('products')
//       .find()
//       .toArray()
//       .then(products =>{
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }

//     static findById(prodid){
//       const db = getdb();
//       return db.collection('products')
//       .findOne({ _id: new mongodb.ObjectId(prodid) })
//       .then(product =>{
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }
    
//     static deleteById(prodid){
//       const db = getdb();
//       return db.collection('products')
//       .deleteOne(
//         {_id: new mongodb.ObjectId(prodid) }
//       )
//       .then(result =>{
//         return result;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }
// }

// module.exports = Product;