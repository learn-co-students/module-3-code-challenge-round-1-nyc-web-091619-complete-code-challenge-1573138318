
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 3912 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImageData()
  addLikeListener()
  addCommentBtnListener()

  function getImageData() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(data => {
      return addImage(data)
    })
  }

  function addImage(image) {
    let img = document.getElementById('image')
    let imgTitle = document.getElementById('name')
    let likeCount = document.getElementById('likes')
    let commentSection = document.getElementById('comments')
    img.src = `${image.url}`
    imgTitle.innerText = `${image.name}`
    likeCount.innerText = `${image.like_count}`
    let imageComments = image.comments
    commentSection.innerText = `${imageComments.content}`
  }

  function addLikeListener() {
    let likeButton = document.getElementById('like_button')
    likeButton.addEventListener("click", (ev) => {
      increaseLikes(ev)
    })
  }

  function increaseLikes(ev) {
    let likes = document.getElementById('likes')
    let likesCounter = likes.innerText
    likes.innerText = parseInt(likesCounter) + 1
    updateLikeCount()
  }

  function updateLikeCount() {
    fetch(likeURL, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'image_id': 3912}) 
    })
    .then(resp => console.log(resp.json()))
 
  }

  function addCommentBtnListener() {
    let form = document.getElementById('comment_form')
    form.addEventListener("submit", renderComments)
    
  }

  function renderComments(ev) {
    ev.preventDefault()
    let comments = document.getElementById('comments')
    let li = document.createElement('li')
    console.log(ev)
    li.innerText = ev.target[0].value
    comments.appendChild(li)
    updateComments(ev)
  }

  function updateComments(ev) {
    fetch(commentsURL, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'image_id': 3912,
        'content': `${ev.target[0].value}`})
      })
      .then(resp => console.log(resp.json()))
  }

})
/*
As a user, when the page loads, I should see:
an image
any comments that image has
the number of likes that image has
*/

/*
You will need to add/update:

the image url
the image name
the number of likes
any comments in an unordered list
*/