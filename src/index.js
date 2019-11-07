// const my_image = "https://randopic.herokuapp.com/images/3902"
// const my_image_id = "3902"

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let commentsArray = []

  let imageId = 3902
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageCard = document.getElementById("image_card")
  let imageC = document.getElementById("image")
  let name = document.getElementById("name")
  let likes = document.getElementById("likes")
  let likeBtn = document.getElementById("like_button")
  let form = document.getElementById("comment_form")
  let comments = document.getElementById("comments")


  function fetchImage(){
    fetch(imageURL)
    .then(resp => resp.json())
    .then(json => addImage(json))
  }

  function addImage(image){
    imageCard.dataset.id = `${image.id}`
    imageC.src = `${image.url}`
    name.innerText = `${image.name}`
    likes.innerText = `${image.like_count} likes`
    image.comments.forEach(renderComment)
  }

  // function renderComment(comment, flag = true){
  //   let comment_li = document.createElement("li")
  //   if (flag === false) {
  //     comment_li.innerText = `${comment}`
  //   } else {
  //     comment_li.innerText = `${comment.content}`
  //   }
  //   comments.appendChild(comment_li)
  // }//optimistic

  function renderComment(comment){
    commentsArray.push(comment)

    let comment_li = document.createElement("li")
    comment_li.innerText = `${comment.content}`

    let xBtn = document.createElement("button")
    xBtn.innerText = "x"
    xBtn.dataset.comment_id = comment.id

    comment_li.appendChild(xBtn)
    comments.appendChild(comment_li)
  }//pessimistic

  likeBtn.addEventListener("click", likeHandle)

  function likeHandle(e){
    let id = e.target.parentNode.dataset.id
    let newLikes = parseInt(likes.innerText) + 1
    postLikes(id)
    likes.innerText = `${newLikes} likes`
  }
  function postLikes(id){
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: id
      })
    }) //optimistic
  }

  form.addEventListener("submit", formHandler)

  // function formHandler(e){
  //   e.preventDefault()
  //   let id = e.target.parentNode.dataset.id
  //   let comment = e.target[0].value
  //   postComment(id, comment)
  //   renderComment(comment, false)
  //   e.target.reset()
  // }

  // function postComment(id, comment){
  //   fetch(commentsURL, {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       image_id: id,
  //       content : comment
  //     })
  //   })// optimistic again
  // }

  function formHandler(e){
    e.preventDefault()
    let id = e.target.parentNode.dataset.id
    let comment = e.target[0].value
    postComment(id, comment)
    e.target.reset()
  }

  function postComment(id, comment){
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: id,
        content : comment
      })
    })//pessimistic
    .then(resp => resp.json())
    .then(json => renderComment(json))
  }

  comments.addEventListener("click", deleteHandler)

  function deleteHandler(e){
    if(e.target.innerText === "x"){
      let com_id = e.target.dataset.comment_id
      deleteComment(com_id)
      let commentToDelete = document.querySelector(`[data-comment_id="${com_id}"]`).parentNode
      comments.removeChild(commentToDelete)
    }
  }

  function deleteComment(id){
    fetch(`${commentsURL}/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => window.alert(`${json.message}`))
  }

  fetchImage()
})
 
