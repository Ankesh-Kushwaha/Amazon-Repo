import { cart } from "../../data/cart.js";

export function totalCartItem(){
  let totalQuantity=0;
    cart.forEach((cartItem)=>{
        totalQuantity+=cartItem.quantity;
    })
    return totalQuantity;
}