document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3909
  let imageCard = document.getElementById("image_card")
  let button = document.getElementById("like_button")
  let form = document.getElementById("comment_form")
  let comments = document.getElementById("comments")
  let likesCount = document.getElementById("likes")



  
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  
//// event listners 

form.addEventListener("submit", function(e) {
  e.preventDefault()
  input = e.target[0].value 

  let newComment = document.createElement("li")
  let deleteButton = document.createElement("button")
  

  newComment.innerText = e.target[0].value 
  comments.appendChild(newComment)
  




  fetch('https://randopic.herokuapp.com/comments', {
    method: "POST", 
    headers: {
      "content-type" : `application/json`, 
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      image_id: 3909,
      content: input
    })
  })






})




  ///helpers 

 



  function appendImage (response) {

    let img = document.getElementById("3909")
    img.src = response.url 
    let imageTitle = document.getElementById("name")
    imageTitle.innerText = response.name 
    
    let likes = response.like_count 
    likesCount.innerText = `${likes} likes`

    let oldComments = response.comments 

    



    oldComments.forEach(function(comment) {
      let commentItem = document.createElement("li")
    
      
      let deleteButton = document.createElement("button")
      
    
      deleteButton.dataset.id = comment.id 
      commentItem.innerText = comment.content
      comments.appendChild(commentItem)
      comments.appendChild(deleteButton)
    
      deleteButton.addEventListener("click",function(e) {
        let id = e.target.dataset.id 
        
        fetch(`https://randopic.herokuapp.com/comments/${id}`,{method: "DELETE"})
          .then(function(response) {
            return response.json()
          })
          .then(function(response) {
            alert(response.message)
            comments.remove()

          })

      })
   
     
    })
    
      

      button.addEventListener("click", function(e) {
        likes += 1
        likesCount.innerText = `${likes} likes`


        fetch('https://randopic.herokuapp.com/likes', {
          method: "POST", 
          headers: {
            "accept": "application/json", 
            "content-type": "application/json"
          }, 
          body: JSON.stringify({
            image_id: 3909,
            like_count : likes 
          })
        })

        
      })
  


    






  }


  
  
  //// fetch image 
  
  function getImage () {
    
    fetch('https://randopic.herokuapp.com/images/3909')
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      appendImage(response)
    })

  }



getImage()



})
