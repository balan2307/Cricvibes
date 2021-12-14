const btn=document.getElementsByClassName('add')[0];
const tags=document.getElementById('tags');
let i=0;
let pageitems=document.getElementsByClassName('page-item');

// btn.addEventListener('click',()=>
// {
//     console.log("Clicked");
   
// const c=tags.childElementCount;

// let tg="tag"+c;
//    if(tags.childElementCount<3)
//   {

//     let input=document.createElement('input');
//     input.setAttribute('name',tg)
//     tags.appendChild(input);
//   }
   

// })


function clicked()
{
  
   
    const c=tags.childElementCount;
    
    let tg="tag"+c;
       if(tags.childElementCount<3)
      {
    
        let input=document.createElement('input');
        input.setAttribute('name',tg)
        tags.appendChild(input);
      }

}

function deletetag()
{
 
   
    const c=tags.childElementCount;
    
    let tg="tag"+c;
       if(tags.childElementCount>0)
      {
    
      
        tags.removeChild(tags.lastChild);
      }

}


// const currentLocation=location.href;
// var current = document.getElementsByClassName("active");

// for (var j = 0;j < pageitems.length; j++) {
// pageitems[j].addEventListener("click", function() {
// for(let i=0;i<pageitems.length;i++)
// {
//   if(pageitems[i].href==current)
//   {
//     pageitems[i].className+="active";
//   }
// }
// }
// }
// for (var j = 0;j < pageitems.length; j++) {
//   pageitems[j].addEventListener("click", function() {
   
    
//     var current = document.getElementsByClassName("active");
//     console.log("Page clicked",current.length)
    
    
//     {
//       current[0].className = current[0].className.replace(" active", "");

//     }
//     this.className += " active";
 
    
//   })
// }