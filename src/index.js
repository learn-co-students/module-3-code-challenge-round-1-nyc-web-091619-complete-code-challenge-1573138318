let imageId = 3908 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  function fetchImage(){
    fetch(imageURL)
    .then (resp => resp.json())
    .then (json => appendItem(json))
  }
  
  fetchImage()

})

function appendItem(obj) {
  // console.log(obj)

  const img = document.getElementById('image')
  const name = document.getElementById('name')
  const likes = document.getElementById('likes')

  img.src = obj.url
  name.innerHTML = obj.name
  likes.innerHTML = obj.like_count

  const likeButton = document.getElementById("like_button")

  obj.comments.forEach(function (ele){
    var commentLi = document.getElementById("comments")
    newCommentLi = document.createElement("li")
    newCommentLi.innerHTML = ele.content
    commentLi.appendChild(newCommentLi)
  })

  likeButton.addEventListener("click", function(e) {
    const newLikes = likes.innerHTML = parseInt(likes.innerHTML) + 1
    postLikes(obj,newLikes)
  })

  const commentForm = document.getElementById("comment_form")
  // console.log(commentForm)

  commentForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // console.log("click")
    // console.log(e.target[0].value)
    
    var commentLi = document.getElementById("comments")
    newCommentLi = document.createElement("li")
    const newComment = newCommentLi.innerHTML = e.target[0].value
    // console.log(newComment)

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete Comment"
    deleteButton.addEventListener("click", function(e) {
      // e.target.parentNode.remove()
      console.log(e.target.parentNode)
      // deleteComment(e)
    })
    
    newCommentLi.appendChild(deleteButton)
    commentLi.appendChild(newCommentLi)

    // const newCommentObj = {
    //   "image_id": imageId,
    //   "content" : newComment
    // }

    postComment(obj,newComment)

  })


  function postComment(obj, newComment) {
    fetch(`${commentsURL}`, {
      // key: { image_id: 3908 }, 
      // key: JSON.stringify({ 
      //   image_id: 3908 
      // }), 
      // keys: JSON.stringify({ 
      //   image_id: 3908 
      // }), 

      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        image_id: 3908,       
        content : newComment
      })
    }) 
    .then (resp => resp.json())
    .then (json => console.log(json))
  }


  // incorrect format getting 422 error
  function postLikes(obj, newLikes) {
    // fetch(`${likeURL}${imageId}`, {
    console.log(newLikes)

    fetch(`${likeURL}`, {
      // key: { image_id: 3908 }, 
      // key: JSON.stringify({ 
      //   image_id: 3908 
      // }), 
      // keys: JSON.stringify({ 
      //   image_id: 3908 
      // }), 
      // image_id: "3908", 
      // image_id: { 3908 },
      // image_id: 3908, 
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        image_id: 3908,
        like_count : newLikes
      })
    })
  }

}
