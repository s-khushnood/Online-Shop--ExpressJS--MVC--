const fs = require('fs');
const path = require('path');

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
  static addProductToCart(title,item,price) {
    getProductsFromFile(products => {
      let totalPrice=0;
      products.push({
        title:title,
        item:item,
        price:price,
      });
      products.forEach(element => {
        totalPrice=parseFloat(totalPrice)+parseFloat(element.price);
      });
      products.forEach(element => {
        element['totalPrice']=totalPrice;
      });
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
