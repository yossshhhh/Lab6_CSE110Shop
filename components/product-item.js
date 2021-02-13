// product-item.js


class ProductItem extends HTMLElement {
  // TODO
  constructor(id, image, description, title, price) {
    super(); //always call super() first
    
    //shadowDom
    let shadow = this.attachShadow({mode: 'open' });
    var local = window.localStorage;
    
    //set class to product in list
    let listElem = document.createElement('list');
    listElem.setAttribute('class', 'product');
    
    //set image restrictions
    let imgElem = document.createElement('img');
    imgElem.setAttribute('alt', description); //
    imgElem.setAttribute('src', image); //
    imgElem.setAttribute('max-height', '300');
    
    //product title
    let titleElem = document.createElement('t');
    titleElem.innerHTML = title;
    titleElem.setAttribute('class', 'title');
    
    //product price
    let priceElem = document.createElement('p');
    priceElem.innerHTML = '$' + price;
    priceElem.setAttribute('class', 'price');
    
    //add to cart
    let buttonElem = document.createElement('button');
    buttonElem.setAttribute('onclick', "alert('Added to Cart')");       
    let cartContent = JSON.parse(local.getItem('cartContent'));
    
    //adjust text based on if in cart
    if(cartContent.includes(id)) {
      buttonElem.innerHTML = 'Remove from Cart';
    }
    else {
      buttonElem.innerHTML = 'Add to Cart';
      buttonElem.setAttribute('onclick', "alert('Aded to Cart')");
    }
    
    //on click send an alert notifying added to cart
    let numItemsInCart2 = document.getElementById('cart-count');
    buttonElem.addEventListener('click', function() {
      //get data as string from raw text
      cartContent = JSON.parse(local.getItem('cartContent'));
      if(buttonElem.innerHTML == 'Add to Cart') {
        buttonElem.innerHTML = 'Remove from Cart';
        //get num from string
        numItemsInCart2.innerHTML = parseInt(numItemsInCart2.innerHTML) + 1;
        cartContent.push(id);
      }
      else {
        buttonElem.innerHTML = 'Add to Cart';
        //num from string
        numItemsInCart2.innerHTML = parseInt(numItemsInCart2.innerHTML) - 1;
        cartContent.splice(cartContent.indexOf(id), 1);
      }
      //add to local storage as string data
      local.setItem('cartContent', JSON.stringify(cartContent));
    });
    
    //add all elemente to list
    listElem.appendChild(imgElem);
    listElem.appendChild(titleElem);
    listElem.appendChild(priceElem);
    listElem.appendChild(buttonElem);
    
    //copy style from css file
    let styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.type = 'text/css';
    styleLink.href = './styles/styles.css';
    document.querySelector('head').appendChild(styleLink);
    
    //add to shadowDOM
    shadow.appendChild(styleLink);
    shadow.appendChild(listElem);
  }  
}

customElements.define('product-item', ProductItem);
