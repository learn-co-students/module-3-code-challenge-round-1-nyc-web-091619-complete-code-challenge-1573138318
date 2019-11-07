

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3911 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL)
  .then(resp=>resp.json())
  .then(resp=>imageDiv(resp))

  function imageDiv(obj){
    let image = document.querySelector("#image")
    image.src = obj.url
    let likes = document.querySelector('span')
    likes.dataset.id = obj.id
    likes.innerText = obj.like_count
    let button = document.querySelector('#like-button')
    button.dataset.id = obj.id
    let likeText = document.querySelector('#comment_input')
    likeText.dataset.id = obj.id
    let submit = document.querySelector('#submit')

    submit.addEventListener('click',function(e) {
      e.preventDefault()
      let ul = document.querySelector('#comments')
      let li = document.createElement('li')
      li.innerText = document.querySelector('#comment_input').value
      ul.appendChild(li)

      let input = document.querySelector('#comment_input').value
      let comment = {image_id:imageId, content:input}
      fetchComments(comment)
    })

    button.addEventListener('click', function(e){
      e.preventDefault()
      let changeLikes = document.querySelector('span')
      let parsed = parseInt(document.querySelector("span").innerText)
      parsed++
      changeLikes.innerText = parsed
      increseLikes({image_id:imageId})
    })
  }

  function increseLikes(obj){
    fetch(likeURL, {
      method:'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then(response => console.log(respose))
  }

  function fetchComments(comments) {
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(comments)
    })
    .then(response = response.json())
    .then(response = console.log(response))
  
  }
})