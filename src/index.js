document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3910 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let commentsUl = document.getElementById("comments")
  let likeSpan = document.querySelector("span span")
  let commentForm = document.getElementById("comment_form")
  
  //step 1: get image and info
  
  fetch(imageURL)
  .then(resp => resp.json())
  .then(fetchGetFunction)
  
  function fetchGetFunction(data){
    let imgSrc = data.url
    let imgTag = document.getElementById("image")
    imgTag.src = imgSrc
    
    let imgTitle = data.name
    let titleH4 = document.getElementById("name")
    titleH4.innerText = imgTitle
    
    let currentLikes = data.like_count
    likeSpan.innerText = currentLikes

    let currentComments = data.comments
    commentsUl.innerHTML = "" //clears our comment UL before appending
    currentComments.forEach(appendComments)
  }//end of fetch GET

  function appendComments(comment){
    let commentLi = document.createElement("li")
    commentLi.innerText = comment.content
    commentLi.id = comment.id
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "🤮 bad comment ya gone 🥶"
    commentLi.appendChild(deleteButton)
    commentsUl.appendChild(commentLi)
  }


  //step 2 AND 3: like front/back end
  let likeButton = document.getElementById("like_button")
  likeButton.addEventListener("click", likeHandler)

  function likeHandler(event){
    let likeNum = parseInt(likeSpan.innerText)
    likeNum++
    likeSpan.innerText = likeNum
    
    //step 3: like back end
    
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: (imageId)
        // like_count: likeSpan
      })
    })// end of step 3
  }

  //step 4 AND 5: comments front/back end
  commentForm.addEventListener("submit", submitHandler)
  
  function submitHandler(event){
    event.preventDefault()
    let newCommentContent = event.target[0].value
    let newCommentLi = document.createElement("li")
    newCommentLi.innerText = newCommentContent
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "🤮 bad comment ya gone 🥶"
    newCommentLi.appendChild(deleteButton)
    commentsUl.appendChild(newCommentLi)

    //step 5: posting to DB
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: (imageId),
        content: (newCommentContent)
      })
    })
    .then(resp => resp.json())
    .then(commentRespHandler)

    function commentRespHandler(data){
      newCommentLi.id = data.id
    } //end of step 5

    commentForm.reset()//resets the form input
  }


  //BONUS: deleting comments
  //added delete buttons on line 39-41, and 78-80. Could've been more DRY but no time to abstract
  commentsUl.addEventListener("click", deleteHandler)

  function deleteHandler(event){
    if (event.target.innerText === "🤮 bad comment ya gone 🥶"){
      let commentID = event.target.parentNode.id //assigned ID's on line 38 and 99
      fetch(`https://randopic.herokuapp.com/comments/${commentID}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })//sends a DELETE fetch request to the corresponding comment ID, removing from DB
      event.target.parentNode.remove() //removes from DOM
    }
  }//end of deleteHandler
  

})//end of DOM loading
