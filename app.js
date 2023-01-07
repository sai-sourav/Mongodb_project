const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById("63b6db1a2e940087a3541c65")
//     .then(user => {
//       req.user = new User(user._id, user.name, user.phone, user.street, user.city, user.cart, user.orders);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PSWD}@cluster1.h2hsonw.mongodb.net/shop?retryWrites=true&w=majority`)
  .then(result => {
    console.log("connected to MongoDB!");
    app.listen(4000);
  }).catch(err => {
    console.log(err);
  })