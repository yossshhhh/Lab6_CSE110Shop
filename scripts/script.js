// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  
  var local = window.localStorage;
  let productList = document.getElementById('product-list');
  let numItemsInCart = document.getElementById('cart-count');
  
  if (local.getItem('products') != null) {
      let productData = JSON.parse(local.getItem('products'));
      for(let i = 0; i < productData.length; i ++) {
        var data = new ProductItem(productData[i]['id'], productData[i]['image'], productData[i]['description'], productData[i]['title'], productData[i]['price']);
        productList.appendChild(item);
      }
  }
  else {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        local.setItem('products', JSON.stringify(data));
        var product = JSON.parse(local.getItem('products'));
        for(let i = 0; i < product.length; i++) {
          var data = new ProductItem(productData[i]['id'], productData[i]['image'], productData[i]['description'], productData[i]['title'], productData[i]['price']);
          productList.appendChild(item);
        }
      })
  }
  
  if(!local.getItem('cartContent'))
    local.setItem('cartContent', JSON.stringify([]));
  
  let cartContent = JSON.parse(local.getItem('cartContent'));
  numItemsInCart.textContent - cartContent.length;
});
  
