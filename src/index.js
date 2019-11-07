document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 'https://randopic.herokuapp.com/images/3913'

  let imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  let likeURL = `https://randopic.herokuapp.com/likes/`

  let commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(resp=>resp.json())
  .then(data)
  
      
    function data(info){
      let imageinfo = document.getElementById("image");
      imageinfo.src = info.url
    
      let nameinfo = document.getElementById("name");
      nameinfo.innerText = info.name
    
      let likes = document.getElementById("likes");
      likes.innerText = info.like_count
    }

      let firstComment = function (comment){
      let commentsinfo = document.getElementById("comments");
    
      let li = document.createElement("li")
      li.id = comment.id
    
      li.innerHTML = `${comment.content}<button class="edit">edit</button><button class="delete">Delete</button>`
      commentsinfo.append(li);
    
    
      let editBtn = li.querySelector(".edit")
      let deleteBtn = li.querySelector(".delete")
    
      deleteBtn.addEventListener("click", function(event){
        event.target.parentElement.remove()
        
      })
    
      editBtn.addEventListener("click", function(event){
        event.preventDefault();
        populateCommentField(event);
    
      })
    
    }
    function likeFeature(){
      let likeBtn = document.getElementById("like_button");
      let likes = document.getElementById("likes");
      likeBtn.addEventListener("click", function(event){
        numLikes = parseInt(likes.innerText)
        numLikes ++;
        likes.innerText = numLikes;
    
        fetch(`https://randopic.herokuapp.com/likes/${imageId}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
    
            body: JSON.stringify({
               image_id: `${imageId}`
               
            })
        })
      })
    }

  })