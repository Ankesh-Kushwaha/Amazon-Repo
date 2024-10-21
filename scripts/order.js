import { orders } from "../data/orders.js";
import  dayjs     from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./utils/fixedPrice.js";
import {products as Products ,loadProductsFetch} from "../data/products.js";
import { totalCartItem } from "./utils/totalcartItem.js";

async function getProducts() {
  try {
    await loadProductsFetch();  // Wait for products to be loaded
  } catch (error) {
    console.log('Error loading products:', error);
  }
  renderTotalOrder();
}

getProducts();


function renderTotalOrder(){
  let orderHeaderSummary='';
  let orderSummaryProductHTML='';
  let totalOrderSummary='';

  orders.forEach((order)=>{
        const orderPlaced=order.orderTime;
        const orderPlacedNew=dayjs(orderPlaced);
        const orderPlacedFormat=orderPlacedNew.format('dddd,MMMM D');
        const orderId= order.id;
        const totalCostCents=order.totalCostCents;
        const products=order.products;
      
        products.forEach((product)=>{
            let  quantity=product.quantity;
            let  productId=product.productId;
            let productImage;
            let productName;
            Products.forEach((product)=>{
                if(product.id===productId){
                    productImage=product.image;
                    productName=product.name;
                }
            });
            let  estimatedTime=product.estimatedDeliveryTime;
            let  estimatedTimeNew=dayjs(estimatedTime);
            let  estimatedTimeFormat=estimatedTimeNew.format('dddd, MMMM D');
            
            orderSummaryProductHTML+=`
              <div class="product-image-container">
                <img src=${productImage}>
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${productName};
                </div>
                <div class="product-delivery-date">
                  Arriving on: ${estimatedTimeFormat}
                </div>
                <div class="product-quantity">
                  Quantity: ${quantity}
                </div>
                <button class="buy-again-button 
        
                   button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <a href="amazon.html">
                       <span class="buy-again-message">Buy it again</span>
                  </a>
                 
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?orderId=${orderId}&productId=${productId}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            `
        })

        orderHeaderSummary=`
            <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div class=>${orderPlacedFormat}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$ ${formatCurrency(totalCostCents)}</div>
                </div>
              </div>

              <div class="order-header-right-section ">
                <div class="order-header-label">Order ID:</div>
                <div>${orderId}</div>
              </div>
        `
     
  })
 document.querySelector('.js-order-header').innerHTML=orderHeaderSummary;
 document.querySelector('.js-order-details').innerHTML=orderSummaryProductHTML;
}

let totalItem=totalCartItem();
document.querySelector('.js-cart-quantity')
.innerHTML=totalItem;

