function showEditModal(id)
{


  setTimeout(function() {
    $('#exampleModal2').modal();
}, 10000);
  console.log("CAlled",id);
  axios.get(`/post/${id}/getdet`).then((res)=>{

    console.log("response",res.data)
    clicked_edit(res.data.tags.length,res.data.tags)
    let post=res.data;
    document.querySelector('#edit-form').action=`/user/post/${id}?_method=PUT`;
    document.querySelector("#e-title").value = post.title;
    // document.querySelector("#e-image").src = post.image.url;
    document.querySelector("#e-text").value = post.text;
    document.querySelector("#preview_edit").src=post.image.url;
    let pic=document.getElementsByClassName('remove-prev-pic')[0];
    console.log("pic",pic)
    pic.style.display="block";
    // console.log("Post",post.text)
 

  });


}





let checks;
function clicked_edit(n,alltags) {
 
 
    console.log("N",n)
   let tags=document.getElementById("tags-edit");
   check=tags;
    const c = tags.childElementCount;
  
    for(let j=0;j<c;j++)
  {
    tags.removeChild(tags.lastChild);
  }
    
    for(let i=0;i<n;i++) {
      let input = document.createElement("input");
      input.classList.add('tagp')
      let tg = "tag" + i;
      input.setAttribute("name", tg);
      input.value=alltags[i];
      
      tags.appendChild(input);
    }
  }


  
function add_tags_edit(n) {
 
 
  console.log("N",n)
 let tags=document.getElementById("tags-edit");
  
 
  const c = tags.childElementCount;

  

  let tg = "tag" + c;
  if(c<3)
  {
  for(let i=0;i<n;i++) {
    let input = document.createElement("input");
    input.classList.add('tagp')
    input.setAttribute("name", tg);
    
    tags.appendChild(input);
  }
}
}


  function deletetag_edit() {
    let tags=document.getElementById("tags-edit");
    const c = tags.childElementCount;
  
    let tg = "tag" + c;
    if (tags.childElementCount > 0) {
      tags.removeChild(tags.lastChild);
    }
  }



  function removeprev() {
    // if (input.files && input.files[0]) {
      //  var reader = new FileReader();
      //  reader.onload = function(event) {
          $('#preview_edit').attr('src', "");
          let pic=document.getElementsByClassName('remove-pic')[0];
          console.log("pic delte",pic)
          pic.style.display="none";
  
       
      //  reader.readAsDataURL=" ";
      //  input.files[0]=""
      //  $(".filelabel .title").text(" ");
      document.getElementById("FileInput_edit").value=null;
      // document.getElementsByClassName("title")[0].innerHTML="<i class='bx bx bx-image-alt'></i>";
      // document.getElementsByClassName("title")[0].style.color="black";
      // document.getElementsByClassName("filelabel1")[0].style.border="none";
  
    // }
  }