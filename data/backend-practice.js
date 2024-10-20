const xhr=new XMLHttpRequest(); //create a new HTTP message to send to the backened
xhr.addEventListener('load',()=>{
   console.log(xhr.response);
});
xhr.open('GET','https://supersimplebackend.dev');                //first para=purpose, second para=where to send this message;
xhr.send();