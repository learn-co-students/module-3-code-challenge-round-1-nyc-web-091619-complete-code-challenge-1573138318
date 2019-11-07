

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3907

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  document.addEventListener('click', function(e) {
    if(e.target.id=="like_button") {
      let image = document.getElementById("image")
      let image_id = image.dataset.id
      let likes = document.getElementById("likes")
      likes.innerText++
      fetch(likeURL, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify(
          {
            image_id: image_id,
            likes: likes
        })
      })
    }
  })//end  like 

 


  const fetchImage = function(){
    fetch(imageURL)
    .then(function(res){
      return res.json()
    }).then(function(img){
      console.log(img)
      return getImage(img)
    })
  }

  fetchImage()

  function getImage(img) {
    let imageCardContainer = document.getElementsByClassName("card col-md-4")
    let divContainer = document.getElementById("image_card")
    divContainer.innerHTML = `<div id="image_card" class="card col-md-4">
    <img src="${img.url}" id="image" data-id="${img.id}"/>
    <h4 id="name">${img.name}</h4>
    <span>Likes:
      <span id="likes">${img.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">`
  } //end get iMage



  


  // function iterate(cards) {
  //   cards.forEach(function(card){
  //     console.log(card)
  //   })
  // }




}) //end DOMC

let form = document.getElementById("comment-form")
form.addEventListener("submit", function(e){
  comment = e.target[0].value 
  form.reset()
})
console.log(form)