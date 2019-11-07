document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3915

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL)
    .then(resp=>resp.json())
    .then(data=>renderData(data))

  function renderData(object){
    console.log(object)

    let likes = object.like_count
    let likeSection = document.getElementById('likes')
    likeSection.innerText = likes
    
    let comment = object.comments
    let commentSection = document.getElementById('comments')
    // commentSection.innerText = comment
    comment.forEach((e)=>{
      commentSection += e
    })
    
    let image = object.url
    let img = document.getElementById('image')
    img.setAttribute('src', image)
    
    let name = object.name
    let imageName = document.getElementById('name')
    imageName.innerText = name 
  }

  
  let likeButton = document.getElementById('like_button')

  likeButton.addEventListener('click', function(e){
    let likes = document.getElementById('likes')
    likes.innerText++
  })

  let form = document.getElementById('comment_form')
  let commentInput = document.getElementById('comment_input')
  
  form.addEventListener('submit', function(e){
    e.preventDefault()
    let commentSection = document.getElementById('comments')
    commentSection.innerHTML += `<li> ${commentInput.value} </li>`
  })

  function likePersistence(likes)
    return fetch(imageURL{
      headers: {
        'content-type': 'application/json'
        'accept': 'application/json'
      },
      method: "POST"
      body: JSON.stringify()
    })
      .then(resp=>resp.json())
      .then(object=>{return object})


})


// get image data, fetch the image from the api
// like feature // persist like feature
// comment feature // persist comment feature
// delete comment feature // persist comment feature

// image id 3915

// <ul id='comments'>
// <h4 id="name"> </h4>
// <span id='likes'> </span>
// <img src="" id="image" data-id="">