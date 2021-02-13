// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(id, image, description, title, price) {
    super(); //always call super() first
    
    var local = window.localStorage;
    let shadow = this.attachShadow({mode: 'open' });
    
    let listElem = document.createElement('list');
    listElem.setAttribute('class', 'product');
    
    let imgElem = document.createElement('img');
    imgElem.setAttribute('alt', description); //
    imgElem.setAttribute('src', image); //
    
    let pElem = document.createElement('p');
    pElem.innerHTML = title;
    pElem.setAttribute('class', 'title');
    
    let p2Elem = document.createElement('p');
    p2Elem.innerHTML = '$' + price;
    p2Elem.setAttribute('class', 'price');
    
    let buttonElem = document.createElement('button');
    //
    let cartContent = JSON.parse(local.getItem('in_cart'));
    if(cartContent.includes(id))
      buttonElem.innerHTML = 'Remove from Cart';
    else
      buttonElem.innerHTML = 'Add to Cart';
    
    let numItemsInCart2 = document.getElementById('cart-count');
    buttonElem.addEventListener('click', function() {
      cartContent = JSON.prase(local.getItem('cartContent'));
      if(buttonElem.innerHTML == 'Add to Cart') {
        buttonElem.innerHTML = 'Remove from Cart';
        numItemsInCart2.innerHTML = parseInt(numItemsInCart2.innerHTML) + 1;
        cartContent.push(id);
      }
      else {
        buttonElem.innerHTML = 'Add to Cart';
        numItemsInCart2.innerHTML = parseInt(numItemsInCart2.innerHTML) - 1;
        cartContent.push(cartContent.indexOf(id), 1);
      }
      local.setItem('cartContent', JSON.stringif(cartContent));
    });
    
    listElem.appendChild(imgElem);
    listElem.appendChild(pElem);
    listElem.appendChild(p2Elem);
    listElem.appendChild(buttonElem);
    
    let styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.type = 'text/css';
    styleLink.href = './styles/styles.css';
    document.querySelector('head').appendChild(styleLink);
    
    shadow.appendChild(styleLink);
    shadow.appendChild(listElem);
  }
}

customElements.define('product-item', ProductItem);
