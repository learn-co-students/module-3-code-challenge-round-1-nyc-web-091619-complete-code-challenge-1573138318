document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  let imageId = 3905
  const imageURL = `https://randopic.herokuapp.com/images/3905`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageContent = document.getElementById("image_content")
  const imageCard = document.getElementById("image_card")



    let fetchCall1 = function(){
      fetch(imageURL)
      .then(function(resp){return resp.json()})
      .then(function(data){data.forEach(appendImage)})
    }
    fetchCall1()


    let fetchCall2 = function(){
      fetch(likeURL)
      .then(function(resp){return resp.json()})
      .then(function(data){data.forEach(appendLikes)})
    }
    fetchCall2()


    let fetchCall3 = function(){
      fetch(commentsURL)
      .then(function(resp){return resp.json()})
      .then(function(data){data.forEach(appendComments)})
    }
    fetchCall3()

    function appendImage(object) {
      console.log(object)
      let image = document.getElementById("image")
      let name = document.getElementById("name")

      imageCard.className = "card col-md-4"
      image.src = object.url
      name.innerText = object.name

      imageCard.appendChild(image)
      imageCard.appendChild(name)

      imageContent.appendChild(imageCard)

    }//end of appendimage

    function appendLikes(object){
      let likes = document.getElementsByTagName("span")
      let likeButton = document.getElementById("like_button")

      likes.innerText = object.like_count
      likeButton.innerText = "Like"

      imageCard.appendChild(likes)
      imageCard.appendChild(likeButton)

      imageContent.appendChild(imageCard)


      likeButton.addEventListener("click", function(event){
          let spanElement = event.target.parentNode.querySelector("span")
          let totalLikes = parseInt(spanElement.innerText) + 1
          spanElement.innerText = totalLikes
          
          
          fetch(`https://randopic.herokuapp.com/likes/${id}`, 
          {
            method: 'PATCH', 
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }, 
            body: JSON.stringify({likes: like_count})
          })
      })
    } //end of appendlikes

    function appendComments(object){

    let commentForm = document.getElementById("comment_form")
    let commentInput = document.getElementById("comment_input")
    let submitButton = document.getElementsByTagName("submit")

    let commentUl = document.createElement("ul")
    let commentLi = document.createElement("li")

    commentInput.value = object.comments

    commentForm.appendChild(commentInput)
    commentForm.appendChild(submitButton)

    imageCard.appendChild(commentForm)

    commentUl.appendChild(commentLi)
  
      submitButton.addEventListener("click", function(){

        fetch(`https://randopic.herokuapp.com/comments/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ comments: comment.value })
      
        })
      })//end of comments
    }

})//end of dom