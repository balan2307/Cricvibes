const btn = document.getElementsByClassName("add")[0];
const tags = document.getElementById("tags");
let i = 0;
let pageitems = document.getElementsByClassName("page-item");

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

function clicked() {
  const c = tags.childElementCount;

  let tg = "tag" + c;
  if (tags.childElementCount < 3) {
    let input = document.createElement("input");
    input.setAttribute("name", tg);
    tags.appendChild(input);
  }
}

function deletetag() {
  const c = tags.childElementCount;

  let tg = "tag" + c;
  if (tags.childElementCount > 0) {
    tags.removeChild(tags.lastChild);
  }
}

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

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

const posts = document.getElementsByClassName("post");
let items;
let targetElem;

const btn1 = document.getElementsByClassName("tag");

for (let i = 0; i < posts.length; i++) {
  posts[i].addEventListener("click", (e) => {
    items = e.target.classList;
    targetElem = e.target;
    let validTarget = items.contains("btn") || items.contains("tag-a");
    if (!validTarget) {
      const id = targetElem.closest(".post").getAttribute("id");
      console.log("Target", targetElem.closest(".downvot"));
    }
  });
}

function icounter(ele) {
  let count = parseInt(ele.innerText) || 0;

  count += 1;
  ele.innerText = count;
}

function dcounter(ele) {
  let count = parseInt(ele.innerText) || 0;
  count -= 1;

  ele.innerText = count;
}

const Upvotes = document.getElementsByClassName("upvote");
const Downvotes = document.getElementsByClassName("downvote");

let check;
for (let i = 0; i < Upvotes.length; i++) {
  Upvotes[i].addEventListener("click", (e) => {
    let targetELem = e.target;
    let items = targetELem.classList;
    let downv = targetELem.parentNode.parentNode.querySelector(".downvote");
    let res = targetELem.parentNode.parentNode.querySelector("#vote-count");

    if (items.contains("bx-upvote") && !(items.contains("bxs-upvote"))) {
      console.log("inc if")
      Upvotes[i].classList.toggle("bxs-upvote");
      icounter(res);
      if (downv.classList.contains("bxs-downvote")) {
        downv.classList.remove("bxs-downvote");
      }
    } 
    else if (items.contains("bxs-upvote") && items.contains("bx-upvote")  ) {
      console.log("inc else")
      dcounter(res);
    
      Upvotes[i].classList.remove("bxs-upvote");

    }
  });
}

for (let i = 0; i < Downvotes.length; i++) {
  Downvotes[i].addEventListener("click", (e) => {
    let targetELem = e.target;
    let res = targetELem.parentNode.parentNode.querySelector("#vote-count");

    let items = targetELem.classList;

    let upv = targetELem.parentNode.parentNode.querySelector(".upvote");

    if (items.contains("bx-downvote") && !(items.contains("bxs-downvote"))) {
      dcounter(res);
      Downvotes[i].classList.toggle("bxs-downvote");
      console.log("if 2")

      if (upv.classList.contains("bxs-upvote")) {
        upv.classList.remove("bxs-upvote");
      }
    } else if (items.contains("bxs-downvote") && items.contains("bx-downvote") ) {
      console.log("else 2")
      icounter(res);
      Downvotes[i].classList.remove("bxs-downvote");
    }
  });
}
