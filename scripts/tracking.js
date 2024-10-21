import { orders } from "../data/orders.js";
import {products as Products,loadProductsFetch} from '../data/products.js'
import  dayjs     from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { totalCartItem } from "./utils/totalcartItem.js";


async function getProducts() {
  try {
    await loadProductsFetch();  // Wait for products to be loaded
  } catch (error) {
    console.log('Error loading products:', error);
  }
  renderTrackingDetail();
}
getProducts();


function renderTrackingDetail(){
  let url=new URL(window.location.href);
  let OrderId=url.searchParams.get('orderId');
  let ProductId= url.searchParams.get('productId');
  let trackingHTML='';

  orders.forEach((order)=>{
      let orderId=order.id;
      let products=order.products;
      let productId;
      let expectedTime;
      let expectedDEliveryDate;
      let quantity;
      let productImage;
      let productName;

      products.forEach((product)=>{
            productId=product.productId;
            expectedTime=dayjs(product.estimatedDeliveryTime);
            expectedDEliveryDate=expectedTime.format('dddd, MMM D');
            quantity=product.quantity;
          
           
           Products.forEach((product)=>{
            if(product.id===productId){
                productImage=product.image;
                productName=product.name;
            }
           });
           
           if(OrderId===orderId && ProductId===productId){
             trackingHTML+=`
                  <a class="back-to-orders-link link-primary" href="orders.html">
                    View all orders
                  </a>

                  <div class="delivery-date">
                    Arriving on ${expectedDEliveryDate}
                  </div>

                  <div class="product-info">
                    ${productName}
                  </div>

                  <div class="product-info">
                    Quantity: ${quantity}
                  </div>

                  <img class="product-image" src=${productImage}>

                  <div class="progress-labels-container">
                    <div class="progress-label">
                      Preparing
                    </div>
                    <div class="progress-label current-status">
                      Shipped
                    </div>
                    <div class="progress-label">
                      Delivered
                    </div>
                  </div>

                  <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                  </div>             
              `
           }
      })
  })

  document.querySelector('.js-order-tracking')
  .innerHTML=trackingHTML;
}

let totalItem=totalCartItem();
document.querySelector('.js-cart-quantity').innerHTML=totalItem;






