document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3916 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function fetchImg() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(data => appendImg(data))
    // .then(data => console.log(data))
  }

  function updateLikes() {
    fetch(likeURL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify({
        image_id: 3916
      })
    })
  }

  function updateComments(newComments) {
    fetch('commentsURL', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify({
        image_id: 3916,
        content: newComments
      })
    })
  }

  function removeComment() {
    fetch('https://randopic.herokuapp.com/images/3916', {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => data)
  }

  let likeTag = document.getElementById("likes")
  likeTag.innerHTML = ''

  function appendImg(image) {
    let imageTag = document.getElementById("image")
    let nameTag = document.getElementById("name")
    let likes = document.getElementById("likes")
    let commentTag = document.getElementById("comments")
    
    imageTag.src = image.url
    nameTag.innerText = image.name
    likes.innerText = image.like_count
    image.comments.forEach(function(comment) {
      let commentsLi = document.createElement("li")
      let removeBtn = document.createElement("button")
    
      removeBtn.innerText = "X"

      commentsLi.innerText = comment.content
      // console.log(comment)
      commentsLi.appendChild(removeBtn)
      commentTag.appendChild(commentsLi)
    })
  }

  let likeBtn = document.getElementById("like_button")
  likeBtn.addEventListener("click", function(){
    let likeCounts = document.getElementById("likes")
    likeCounts.innerText = `${parseInt(likeCounts.innerText) + 1}`
    updateLikes(likeCounts.innerText)
  })

  let commentContainer = document.getElementById("comment_form")
  commentContainer.addEventListener("submit", function(e) {
    e.preventDefault()
    let allComments = document.getElementById("comments")
    let newCommentLi = document.createElement("li")
    let content = e.target[0].value
    
    newCommentLi.innerText = content
    
    allComments.appendChild(newCommentLi)
    updateComments(content)
  })

  let commentsArea = document.getElementById("comments")
  commentsArea.addEventListener("click", function(e) {
    let parent = e.target.parentNode
    if (e.target.innerText === "X") {
      parent.remove()
      removeComment()
    }
  })

  fetchImg()
})
