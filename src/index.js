document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3914

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  function getImage () {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(data => appendImage(data))
  }
  getImage()

  function appendImage(obj){
    const imageCard = document.getElementById("image_card")
    
    const image = document.getElementById("image")
    image.src = obj.url
    
    const title = document.getElementById("name")
    title.innerText = obj.name
    
    const likesSpan = document.getElementById("likes")
    likesSpan.innerText = obj.like_count
    
    const likeButton = document.getElementById("like_button")
    likeButton.addEventListener('click', likesHandler)
    
    const form = document.getElementById("comment_form")
    form.addEventListener('submit', submitHandler)
    
    const commentsList = document.getElementById("comments")
    imageCard.append(commentsList)
    
  }

  function submitHandler(e) {
    e.preventDefault()
    const newComment = document.createElement('li')
    const allComments = document.getElementById("comments")
    

    newComment.innerText = e.target[0].value
    allComments.append(newComment)
    
    postComments()

  }

  function likesHandler(e) {
    let likesNum = document.getElementById("likes")
    let newLikes = parseInt(likesNum.innerText)+1
    likesNum.innerText = newLikes
    // need to clear form
    postLikes()
  }

  function postLikes() {
    fetch(likeURL, {
      method: "POST", 
      headers: {
        "content-type": "application/json",
        "accept"      : "application/json"
      }, 
      body: JSON.stringify({ image_id: 3914})
    })
  }

  function postComments() {
    fetch(commentsURL, {
      method: "POST",
        headers: {
        "content-type": "application/json",
          "accept"      : "application/json"
      },
      body: JSON.stringify(
        { image_id: 3914 }, 
        {content_id: newComment}
        )
    })
  }
  



})
