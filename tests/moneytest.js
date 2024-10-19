import { formatCurrency } from "../scripts/utils/fixedPrice.js";

console.log('test suit: format Currency');

console.log('converts cents into dollars')
if (formatCurrency(2095)==='20.95'){
  console.log('passed');
}
else{
  console.log('failed');
}

console.log('works with 0')
if(formatCurrency(0)==='0.00'){
    console.log('passed');
}
else{
  console.log('failed');
}

console.log('rounds up to the nearst cent 1:');
if(formatCurrency(2000.5)==='20.01'){
   console.log('passed');
}
else{
  console.log('failed');
}

console.log('round up to the nearest cent 2:');
if(formatCurrency(2000.4)==='20.00'){
  console.log('passed');
}
else{
  console.log('failed');
}