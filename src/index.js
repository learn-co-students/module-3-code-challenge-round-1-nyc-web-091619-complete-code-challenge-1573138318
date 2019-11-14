document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3915

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

fetch(imageURL)
  .then(resp=>resp.json())
  .then(data=>{renderData(data)})

let title = document.getElementById('name')
let image = document.getElementById('image')
let likes = document.getElementById('likes')
let commentForm = document.getElementById('comment_form')
let commentInput = document.getElementById('comment_input')
let button = document.getElementById('like_button')
let commentSection = document.getElementById('comments')


function renderData(data){
  image.src = `${data.url}`
  image.dataset.id = `${imageId}`
  title.innerText = `${data.name}`
  likes.innerText = `${data.like_count}`
  data.comments.forEach(element => {
    commentSection.innerHTML += `
    <li data-id='${element.id}' > ${element.content} </li> <button type="button" id="delete_button">x</button>
    `
  })
}

function postComments(comment) {
  fetch(commentsURL, {
    method: 'POST',
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    }),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
    .then( resp => resp.json())
    .then( json => { console.log(json.id) }
)}

// function appendToLi(argument){

// }

// function postToDom(argument){
//   let li = document.createElement('li')
//   let button = document.createElement('button')
//   button.innerText = 'x'
//   li.innerText = commentInput.value
//   li.appendChild(button)
//   li.dataset.id = argument
//   commentSection.appendChild(li)
// }

commentForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  console.log(e.target.value)
  postComments(commentInput.value)

  let li = document.createElement('li')
  let button = document.createElement('button')
  button.innerText = 'x'
  li.innerText = commentInput.value
  li.appendChild(button)
  // li.dataset.id = data.id
  commentSection.appendChild(li)

  // commentSection.innerHTML += `<li> ${commentInput.value}  <button type="button" id="delete_button">x</button> </li>`
  commentForm.reset()

})

// function getLast(){
//   fetch(imageURL)
//     .then(resp=>resp.json())
//     .then(data=>console.log(data.comments))
// }

// getLast()

document.addEventListener('click', (e)=>{
  console.log('deleting comment')
})


button.addEventListener('click', (e)=>{
  console.log('clicking')
  likes.innerText++
  postLikes(likes)
})

function postLikes(likes){
  fetch(likeURL, {
    method: 'POST',
    body: JSON.stringify({
      like_count: likes,
      image_id: imageId
    }),
    headers: {
      "content_type": "application/json",
      "accept": "application/json"
    }
  }).then(resp => resp.json())
    .then(data => console.log(data))
}


// function deleteComment(comment){
//   fetch(

})


// created_at: "2019-11-07T15:12:14.173Z"
// ​
// id: 68413
// ​
// image_id: 3915
// ​
// updated_at: "2019-11-07T15:12:14.173Z"

// get image data, fetch the image from the api
// like feature // persist like feature
// comment feature // persist comment feature
// delete comment feature // persist comment feature

// image id 3915

// <ul id='comments'>
// <h4 id="name"> </h4>
// <span id='likes'> </span>
// <img src="" id="image" data-id="">