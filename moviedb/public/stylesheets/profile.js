function display_prof(input) {
    if (input.files && input.files[0]) {
       var reader = new FileReader();
       const delete_prof=document.getElementsByClassName('profile-delete-icon')[0];
       if(delete_prof)
       {
       delete_prof.style.display="inline";
       }
       reader.onload = function(event) {
          $('#prof-preview').attr('src', event.target.result);
       }
       reader.readAsDataURL(input.files[0]);
    }
  }
  
  
  
  $("#ProfileInput").change(function() {
    console.log("Jquery");
    display_prof(this);
  });



  function display_cover(input) {
   if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      
    
      reader.onload = function(event) {
      
         $('#coverImage').css('background-image', 'url(' + event.target.result + ')');
         
      }
      reader.readAsDataURL(input.files[0]);
      const delete_cover=document.getElementsByClassName('cover-delete-icon')[0];
      if(delete_cover) 
      {
         delete_cover.style.display="inline";
      }
   }
 }
 
 
 
 $("#CoverInput").change(function() {
   // console.log("Jquery");
   display_cover(this);
 });



// const delete_cover=document.getElementsByClassName('cover-delete-icon')[0];

function deleteCoverImage(e){
   // console.log("Delete cllicked",e)
   const previewcover=document.getElementsByClassName('profile-modal-upload')[0];
   previewcover.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXh6vH////5+vrl7fPv8/f0+fzt9Pbf6vD+/f/j6/Lf6vL///3f6fLr8fbv8/by9vm0HxD7AAACbUlEQVR4nO3c65abIBRAYVHTDALx/d+2VBuDII6zLHro2t/fmEn2HETn2jQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADkG29irNHa4I9G9+qu83B2BTauu01JIIYUUUkghhbcX/ipFTGH3LKOTUmi6Qq/QGQrLovA8Ckuj8LzqC/98A2ZX5YXd2Lajf6beOaTmwm5+tnnsBNZc+NTt/OaNanWT/U5hzYWjWjzyh1VSqK1ONpTPW/fyz66kcHCqixJtHwSqPvvUKgq1D/Rjik61MZzhWPd5aJ3fTfwR6yn+P4XzBFU8RevCwvzPJCoo9IFmepdmPUUdFuqaZzgt0fcUw8T+88Ar/wrSC/UywemgcKE+7Tg/ZNRY8V2bDScYT9G6r+mdu+fOK8guXE8wmaK/Vet6980PPmUXDvEEVXLRCL942lwGkguny0RSmF76//ILuh/SE1JyYXIObk/xzfn17NJH5BZ+LvSHpmjno10yRbmFySYTDHFjivONnZ9iHC+3MLNE31NcJy7zNsn9m9DC9DIRTXG9UD977jTF1UIVWpjbZDJTDM/YeLsRWfjdBKMprj8d8RRFFm5d6Dca31OM99z1diOwMHehT01TTBe0WV00BBYem+AyRbdxcDhFgYX6YN80RZu5LTCSZ9gcLzSqz+xIZvloAgt/MsN8u+QZUkghhRRSSCGFFFJIIYWXFKqv85Towr3fcDpKSy78xygsjcLzKCyNwvPEFCpthxKsVlIKXVeGE1NYHoUUUkghhRRSeFfh2D6u0o53BOpmuOz/RA17f8MHAAAAAAAAAAAAAAAAAAAAAAAAAAAAALjcb3yLQG5tF3tgAAAAAElFTkSuQmCC')";
   const ele=e;
   let filename=ele.getAttribute('filename');
   let id=ele.getAttribute('id');
   console.log("Got",filename,id);
   ele.style.display="none";

   axios.post(`/user/${id}/profile/coverimage`).then((res)=>console.log("response",res));
}
 

function deleteProfileImage(e){
   // console.log("Delete cllicked",e)
   const previewprof=document.getElementById('prof-preview');
   previewprof.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXh6vH////5+vrl7fPv8/f0+fzt9Pbf6vD+/f/j6/Lf6vL///3f6fLr8fbv8/by9vm0HxD7AAACbUlEQVR4nO3c65abIBRAYVHTDALx/d+2VBuDII6zLHro2t/fmEn2HETn2jQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADkG29irNHa4I9G9+qu83B2BTauu01JIIYUUUkghhbcX/ipFTGH3LKOTUmi6Qq/QGQrLovA8Ckuj8LzqC/98A2ZX5YXd2Lajf6beOaTmwm5+tnnsBNZc+NTt/OaNanWT/U5hzYWjWjzyh1VSqK1ONpTPW/fyz66kcHCqixJtHwSqPvvUKgq1D/Rjik61MZzhWPd5aJ3fTfwR6yn+P4XzBFU8RevCwvzPJCoo9IFmepdmPUUdFuqaZzgt0fcUw8T+88Ar/wrSC/UywemgcKE+7Tg/ZNRY8V2bDScYT9G6r+mdu+fOK8guXE8wmaK/Vet6980PPmUXDvEEVXLRCL942lwGkguny0RSmF76//ILuh/SE1JyYXIObk/xzfn17NJH5BZ+LvSHpmjno10yRbmFySYTDHFjivONnZ9iHC+3MLNE31NcJy7zNsn9m9DC9DIRTXG9UD977jTF1UIVWpjbZDJTDM/YeLsRWfjdBKMprj8d8RRFFm5d6Dca31OM99z1diOwMHehT01TTBe0WV00BBYem+AyRbdxcDhFgYX6YN80RZu5LTCSZ9gcLzSqz+xIZvloAgt/MsN8u+QZUkghhRRSSCGFFFJIIYWXFKqv85Towr3fcDpKSy78xygsjcLzKCyNwvPEFCpthxKsVlIKXVeGE1NYHoUUUkghhRRSeFfh2D6u0o53BOpmuOz/RA17f8MHAAAAAAAAAAAAAAAAAAAAAAAAAAAAALjcb3yLQG5tF3tgAAAAAElFTkSuQmCC'
   const ele=e;
   let filename=ele.getAttribute('filename');
   let id=ele.getAttribute('id');
   console.log("Got",filename,id);
   ele.style.display="none";

   axios.post(`/user/${id}/profile/profileimage`).then((res)=>console.log("response",res));
}
 
let res;
function followToggle(e)
{

 
   res=e;
   let user_id=document.getElementById("user_id").getAttribute("profile");
   const follow=document.getElementById('followers')
   let count=parseInt(follow.innerText);
   console.log("Count",count)
   

   
   if(res.innerText=="Follow") 
   {

      console.log("Fol")
      count+=1;
      follow.innerText=count;
      res.innerText="Unfollow"
      console.log("Follow",user_id);
      axios.post(`/user/follow/${user_id}`).then((res)=>console.log("response",res));
}
   else if(res.innerText=="Unfollow") 
   {
      count-=1;
      follow.innerText=count;
      console.log("unFol")
      res.innerText="Follow";
      axios.post(`/user/unfollow/${user_id}`).then((res)=>console.log("response",res));

   }
}

let it;

function followToggleSearch(e)
{


   let user_id=e.getAttribute("profile");
   let res=e;
  
 
   
   

   
   if(res.innerText=="Follow") 
   {

      console.log("Fol")
    
      
      res.innerText="Unfollow"
      console.log("Follow",user_id);
      axios.post(`/user/follow/${user_id}`).then((res)=>console.log("response",res));
}
   else if(res.innerText=="Unfollow") 
   {
    
    
      console.log("unFol")
      res.innerText="Follow";
      axios.post(`/user/unfollow/${user_id}`).then((res)=>console.log("response",res));

   }
}
const followBtn=document.getElementById('follow-btn');

