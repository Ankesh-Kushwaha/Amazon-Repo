import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayementSummary } from "./checkout/payementSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{
         resolve('value1');
    });
}),

new Promise((resolve)=>{
  loadCart(()=>{
      resolve();
  });
}),

]).then((values)=>{
  console.log(values);
  renderOrderSummary();
  renderPayementSummary();
})

/*
new Promise((resolve)=>{
    loadProducts(()=>{
         resolve('value1');
    });

}).then((value)=>{
  console.log(value);
     return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
     });

}).then(()=>{
  renderOrderSummary();
  renderPayementSummary();
})
*/


/*in both case there is two steps
1. first we load the products and wait for them to finish using resolve.
2. the we call the renderOrderSummary() and
   renderPayementSummary();
*/


/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPayementSummary();
  })
 
});
*/
