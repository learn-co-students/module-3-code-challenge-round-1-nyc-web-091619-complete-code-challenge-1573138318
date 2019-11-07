document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // DEFINITIONS ===================================================================>
  
  let imageId = 3901 //Enter the id from the fetched image here
  // https://randopic.herokuapp.com/images/3901

  //URLS
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  
  let myImage // stores fetched image data. Not super necessary but clean

  // Useful Tags
  let name = document.getElementById("name")
  let img = document.getElementById("image")
  let likes = document.getElementById("likes")
  let comments = document.getElementById("comments")
  let form = document.getElementById("comment_form")
  let likeButton = document.getElementById("like_button")

  // FUNCTIONS =======================================================================>
  

  // ------------------------ Event Handlers  -----------------------------------------
  
  // When like button is clicked, optimistically add a like to the DOM
  // then make POST request to create a new like for this image
  function likeClickHandler(e){

    //update my stored Image 
    //(I just think this is easier than grabbing the number from the html)
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

  // Optimistically add the new comment to the DOM, then make POST request
  // Then retroactively add the commend ID to the tag on the DOM
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

        //IF WE HAVE TO OPTIMISTICALLY UPDATE THE DOM (grr) 
        //then have get the last comment on the dom (the new one we added) and add this returned
        //object's ID to it
        let newComment = comments.lastChild
        newComment.dataset.comment_id = data.id

      })
  }

  // When comment delete button is clicked, send DELETE request and pessimistically update DOM
  function deleteClickHandler(e){

    //find this comment and its ID
    let thisComment = e.target.parentNode
    let id = thisComment.dataset.comment_id

    fetch(`${commentsURL}${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
      .then(data => {
          //only update DOM if we get a success message
          if(data.message === 'Comment Successfully Destroyed'){
            comments.removeChild(thisComment)
          }else{
            alert("ERROR DELETING")
          }
      })

  }

  // ------------------------ DOM Functions  -----------------------------------------
  
  //appends a comment with text and given ID to the comments UL
  function appendComment(comment, id){

    let li = document.createElement("li")
    li.dataset.comment_id = id
    li.innerText = comment

    // adds the delete button 
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "delete"
    deleteButton.addEventListener("click", deleteClickHandler)
    
    li.appendChild(document.createElement("div")) // just to make some space
    li.appendChild(deleteButton)
    
    comments.appendChild(li)
  }
  
  // Appends the image stored in myImage to the DOM
  function appendImage(){

      //uses previously found tags
     name.innerText = myImage.name
     img.src = myImage.url 
     likes.innerText = myImage.like_count

     // iteratively add comments
     myImage.comments.forEach(el => appendComment(el.content, el.id))

  }

  //initial image fetch
  function loadImage(){

    fetch(imageURL)
      .then (resp => resp.json())
      .then (data => {

          //save the data and append to DOM
          myImage = data
          appendImage()
      })

  }

  // ===================================================================> END FUNCTIONS


  // EXECUTION =======================================================================>

  // initial load
  loadImage()

  // add event listeners to form and like button
  likeButton.addEventListener("click", likeClickHandler)
  form.addEventListener("submit", formSubmitHandler)

 
})
