const getdb = require('../util/database').getdb;
const mongodb = require('mongodb');

class User {
    constructor(id, name, phone, street, city, cart){
        this.name = name;
        this.phone = phone;
        this.street = street;
        this.city = city;
        this.cart = cart;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save(){
      const db = getdb();
      let dbOp;
      if(this._id){
        dbOp = db.collection('users').updateOne({_id: this._id}, {$set: this});
      }else{
        dbOp = db.collection('users').insertOne(this)
      }
      return dbOp
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      });
    }

    static fetchall(){
      const db = getdb();
      return db.collection('users')
      .find()
      .toArray()
      .then(users =>{
        return users;
      })
      .catch(err => {
        console.log(err);
      });
    }

    static findById(userid){
      const db = getdb();
      return db.collection('users')
      .findOne({ _id: new mongodb.ObjectId(userid) })
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
    }

    updateCart(product){
      const cartproductindex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
      })
      const cartitems = this.cart.items;
      if(cartproductindex === -1){
        const obj = {
          productId: product._id,
          quantity: "1"
        }
        cartitems.push(obj);
      }else{
        const oldquantity = parseInt(cartitems[cartproductindex].quantity);
        const newquantity = oldquantity + 1;
        cartitems[cartproductindex].quantity = newquantity.toString();
      }
      const updatedcart = { items: cartitems }
      const db = getdb();
      return db.collection('users')
      .updateOne({ _id: this._id }, {$set: {cart: updatedcart}});
    }
    
    static deleteById(userid){
      const db = getdb();
      return db.collection('users')
      .deleteOne(
        {_id: new mongodb.ObjectId(userid) }
      )
      .then(result =>{
        return result;
      })
      .catch(err => {
        console.log(err);
      });
    }
}

module.exports = User;