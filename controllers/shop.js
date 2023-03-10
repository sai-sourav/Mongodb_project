const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      console.log(product);
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId', function (err, user) {
      if (err) console.log(err);
      else{
        const products = user.cart.items
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      }
    });
    // .populate('cart.items.productId')
    // .execPopulate()
    // .then(user => {
    //   console.log(user);
    //   const products = [];
      // res.render('shop/cart', {
      //   path: '/cart',
      //   pageTitle: 'Your Cart',
      //   products: products
      // });
    // })
    // .catch(err => console.log(err));

};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = req.user;
  try{
    const product = await Product.findById(prodId);
    const result = await  user.addToCart(product);
    res.redirect('/cart');
  }catch(err){
    console.log(err);
  }  
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteCartitem(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId', function (err, user) {
      if (err) console.log(err);
      else{
        const products = user.cart.items;
        const orderitems = products.map((product) => {
          return {
            productId : product.productId._id,
            title: product.productId.title,
            price: product.productId.price,
            description: product.productId.description,
            imageUrl : product.productId.imageUrl,
            userId : product.productId.userId,
            // ...product.productId._doc,
            quantity: product.quantity
          }
        })
        const order = new Order({
          items: orderitems
        })
        order.save()
        .then(result => {
          ordersarray = req.user.orders;
          ordersarray.push({orderId : result._id})
          req.user.orders = ordersarray;
          req.user.cart.items = [];
          return req.user.save();
        })
        .then(result => {
          res.redirect('/orders');
        })
        .catch(err => console.log(err));
      }
    });
};

exports.getOrders = (req, res, next) => {
  req.user
  .populate('orders.orderId', function (err, user) {
    if (err) console.log(err);
    else{
      const orders = user.orders
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      })
    }
});
};
