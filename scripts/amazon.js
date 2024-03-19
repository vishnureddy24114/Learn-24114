/*const products = [
    {
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: ' Black and Gray Athletic Cotton Socks - 6 Pairs',
        rating: {
            stars: 4.5,
            count: 87
        },
        priceincents: 1050
    },
    {
        image: 'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        rating: {
            stars: 4,
            count: 127
        },
        priceincents: 2055
    },
    {
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        rating: {
            stars: 4.5,
            count: 86
        },
        priceincents: 799
    },
    {
        image: 'images/products/men-golf-polo-t-shirt-blue.jpg',
        name: 'men-golf-polo-t-shirt-blue',
        rating: {
            stars: 4.0,
            count: 186
        },
        priceincents: 1299  
    }
]; */

import {cart , saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

let productsHTML = '';

products.forEach((product) => {
    
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
            $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
            <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-addtocart" data-product-id="${product.id}">
            Add to Cart
            </button>
        </div>
        `;
});

//console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function addToCart(productId)
{
    let matchingItem;
    cart.forEach((item) =>{
       if(productId === item.productId)
       {
        matchingItem =item;
       }
    });

    if(matchingItem)
    {
        matchingItem.quantity += 1;
    }
    else
    {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
   }

   

   saveToStorage();
}

function updateCartQuntity()
{
    let cartQuantity = 0;
    cart.forEach((item) => {
     cartQuantity += item.quantity;
    });

     document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-addtocart').forEach((button) => {
    button.addEventListener('click', () => {
        //console.log(button.dataset.productName);
        const productId = button.dataset.productId;

        addToCart(productId);

        updateCartQuntity();
       // console.log(cartQuantity);
       // console.log(cart);
    });
});