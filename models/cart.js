const fs = require('fs');
const path = require('path');
const Product = require('./product');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {
  static addProductToCart(id) {
    getProductsFromFile(products => {
      let totalPrice=0;
      products.push({
        id:Date.now(),
        productId:id
      });
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
  static removeProductFromCart(id){
    let newProducts=[];
    getProductsFromFile(products => {
      products.forEach((x)=>{
        if(String(x.id)!=String(id)){
          newProducts.push(x);
        }
      })
      fs.writeFile(p, JSON.stringify(newProducts), err => {
        console.log(err);
      });
      });
  }

  static fetchAll(cb) {
    let products=[];
    let cartItems=[];
    let totalPrice=0;
    let cartItemsList=[];
    Product.fetchAll(_products=>{
      products=_products;
      getProductsFromFile((_cartItems)=>{
        cartItems=_cartItems;
        cartItems.forEach((item)=>{
          products.forEach((product)=>{
            if(String(item.productId)==String(product.id)){
              totalPrice=totalPrice+Number(product.price);
              cartItemsList.push({id:item.id,product});
            }
          })
        })
        cb({cartItemsList:cartItemsList,totalPrice:totalPrice.toFixed(2)});
      });
    })
  }
};
