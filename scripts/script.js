// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  
  let local = window.localStorage;
    //var bc need global scope
  var productList = document.getElementById('product-list');
  var numItemsInCart = document.getElementById('cart-count');
  
  //check if need to fetch data from website
  if (local.getItem('products') != null) {
      //parse existing data bc non null
      let productData = JSON.parse(local.getItem('products'));
      //loop through every product in list and create custom element for each
      for(let i = 0; i < productData.length; i ++) {
        //use constructor from product-item.js
        var data = new ProductItem(productData[i]['id'], productData[i]['image'], productData[i]['description'], productData[i]['title'], productData[i]['price']);
        productList.appendChild(data);
      }
  }
  else {
    //retrieve raw data from webstite
    fetch('https://fakestoreapi.com/products')
      //same as above, except with fetched data variables
      .then(response => response.json())
      .then(data => {
        local.setItem('products', JSON.stringify(data));
        var product = JSON.parse(local.getItem('products'));
        for(let i = 0; i < product.length; i++) {
          var data = new ProductItem(productData[i]['id'], productData[i]['image'], productData[i]['description'], productData[i]['title'], productData[i]['price']);
          productList.appendChild(data);
        }
      })
  }
  
  //add to array
  if(!local.getItem('cartContent'))
    local.setItem('cartContent', JSON.stringify([]));
  
  //update counter
  var cartContent = JSON.parse(local.getItem('cartContent'));
  numItemsInCart.textContent = cartContent.length;
});
  
