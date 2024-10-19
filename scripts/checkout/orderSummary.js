import { cart, removeFromCart,updateDeliveryOption } from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/fixedPrice.js";
import  dayjs     from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import  {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPayementSummary } from "./payementSummary.js";



export function renderOrderSummary(){

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
      const productId = cartItem.productId;

      const matchingProduct=getProduct(productId);

      // Check if matchingProduct exists before proceeding
      // if (!matchingProduct) {
      //   console.warn(`Product with ID ${productId} not found in products array.`);
      //   return; // Skip this iteration if no product is found
      // }

      const deliveryOptionId=cartItem.deliveryOptionId;

      const deliveryOption=getDeliveryOption(deliveryOptionId);

      const date=dayjs();
      const deliveryDate=date.add(deliveryOption.deliveryDays,'days');

      const dateString=deliveryDate.format('dddd, MMMM D');


      // Create HTML for the cart item
      cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                $ ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryOptionHTML(matchingProduct,cartItem)}            
              </div>
            </div>
        </div>
      `;
    });



    function deliveryOptionHTML(matchingProduct,cartItem){
      let html='';
      deliveryOptions.forEach((deliveryOption)=>{
        const date=dayjs();
        const deliveryDate=date.add(deliveryOption.deliveryDays,'days');

        const dateString=deliveryDate.format('dddd, MMMM D');
        const priceString= deliveryOption.priceCents
        ===0?
        'FREE' : 
        `$ ${formatCurrency(deliveryOption.priceCents)}-`;

        const isChecked=deliveryOption.id===cartItem.deliveryOptionId;

        html+= `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
      })
      return html;
    }

    // Inject the generated HTML into the DOM
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    // Add event listeners to the delete buttons
    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderPayementSummary();

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) {
          container.remove(); // Remove the product's container from the DOM
        }
      });
    });


    document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
        element.addEventListener('click',()=>{
            //  const productId=dataset.productId;
            //  const deliveryOptionId=dataset.deliveryOptionId;
            const {productId,deliveryOptionId}=element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPayementSummary();
        });
    });
  }
  