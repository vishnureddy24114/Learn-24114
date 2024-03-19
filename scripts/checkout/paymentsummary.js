import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary()
{ 
    let productPriceCents = 0;
    let shippingCharges = 0;
   cart.forEach((item) => 
   {
    const product = getProduct(item.productId);
    productPriceCents += product.priceCents * item.quantity;

    const deliveryCharges = getDeliveryOption(item.deliveryOptionId);
    shippingCharges += deliveryCharges.priceCents;
   }); 

//    console.log(productPriceCents);
//    console.log(shippingCharges);

        const totalBeforeTax = productPriceCents + shippingCharges;
        const afterTax = totalBeforeTax * 0.1;
        const totalprice = totalBeforeTax + afterTax;

        const paymentSummaryHTML = 
        `
                <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (3):</div>
                    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${formatCurrency(shippingCharges)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${formatCurrency(afterTax)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalprice)}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
        `;

        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}