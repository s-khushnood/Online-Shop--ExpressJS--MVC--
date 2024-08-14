const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
 Cart.fetchAll((cb)=>{
   res.render('shop/cart', {
     prods: cb.cartItemsList,
     pageTitle: 'Your Cart',
     path: '/cart',
     totalPrice:cb.totalPrice
   });
 });
};

exports.addToCart = (req, res, next) => {
  Cart.addProductToCart(req.body.id);
  res.redirect('/');
};

exports.removeFromCart = (req, res, next) => {
  Cart.removeProductFromCart(req.body.id);
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
