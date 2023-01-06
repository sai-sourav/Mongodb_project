const User = require('../models/user');
const mongodb = require('mongodb');

exports.createuser = (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const street = req.body.street;
    const city = req.body.city;
    const cart = {
      items: []
    }
    const orders = []
    const user = new User(null, name, phone, street, city, cart, orders);
    user.save()
    .then(result => {
        console.log('User Created');
        res.redirect('/admin/products');
      })
      .catch(err => {
        console.log(err);
      });
}

exports.finduser = (req, res, next) => {
    const userid = req.params.id;
    User.findById(userid)
    .then(user => {
        res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
      })
      .catch(err => console.log(err));
}