document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // DEFINITIONS ------------------------------------------
  
  let imageId = 3901 //Enter the id from the fetched image here
  // https://randopic.herokuapp.com/images/3901

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  let myImage 
  let name = document.getElementById("name")
  let img = document.getElementById("image")
  let likes = document.getElementById("likes")
  let comments = document.getElementById("comments")
  let form = document.getElementById("comment_form")
  let likeButton = document.getElementById("like_button")

  // FUNCTIONS --------------------------------------------
  
  // HANDLERS ---------------------------------------------
  function likeClickHandler(e){

    //update my stored Image (might not need this?)
    myImage.like_count++

    //optimistically update the DOM
    likes.innerText = myImage.like_count
    
    //POST a new like for this given image to API
    fetch(likeURL, {
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_id: imageId })
    })
      
  }

  function formSubmitHandler(e){
    e.preventDefault()

    //optimistically update the DOM
    let text = e.target[0].value
    appendComment(text, 0)

    //reset the form
    form.reset()

    //make POST to comments to add comment to API
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: text
      })
    }).then (resp => resp.json())
      .then (data => {
    
        //get the last comment on the dom and add this ID to it
        let newComment = comments.lastChild
        newComment.dataset.comment_id = data.id
      })
  }

  function deleteClickHandler(e){

  }

  // DOM FUNCTONS -----------------------------------------
  function appendComment(comment, id){
    let li = document.createElement("li")
    li.dataset.comment_id = id
    li.innerText = comment

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "DELETE"
    deleteButton.addEventListener("click", deleteClickHandler)
    li.appendChild(deleteButton)
    
    comments.appendChild(li)
  }
  
  function appendImage(){

     name.innerText = myImage.name
     img.src = myImage.url 
     likes.innerText = myImage.like_count

     myImage.comments.forEach(el => appendComment(el.content, el.id))

  }

  function loadImage(){

    fetch(imageURL)
      .then (resp => resp.json())
      .then (data => {
          myImage = data
          appendImage()
      })

  }


  // EXECUTION ----------------------------------------------

  loadImage()

  likeButton.addEventListener("click", likeClickHandler)
  form.addEventListener("submit", formSubmitHandler)

})
