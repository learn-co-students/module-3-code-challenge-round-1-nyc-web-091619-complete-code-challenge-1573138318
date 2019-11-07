document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const container = document.querySelector('div.container');
  const img = document.querySelector('img#image');
  const title = document.querySelector('h4#name');
  const likes = document.querySelector('span#likes');
  const comments = document.querySelector('ul#comments');

  let imageId = 3904 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage()

  async function getImage(){
    const response = await fetch(imageURL);
    const imageData = await response.json();
    appendImageData(imageData);
  };

  function appendComment(comment, commentID){
    let li = document.createElement('li');
    li.innerText = comment;
    li.dataset.id = commentID;

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-btn';

    li.appendChild(deleteButton);
    comments.appendChild(li);
  };

  function appendImageData(imageData){
    img.src = imageData['url']; 
    img.dataset.id = imageData['id'];
    title.innerText = imageData['name']; 
    likes.innerText = imageData['like_count']; 

    imageData['comments'].forEach(comment => appendComment(comment['content'], comment['id']));   // add comment(s)
  };

  // Render new likes and save to backend
  function addLike(e){
    likes.innerText = parseInt(likes.innerText) + 1;

    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({ 'image_id': `${imageId}` })
    })
  }

  // Persist new comments to backend, takes response and calls appendComment
  function saveComment(comment){
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({
        'image_id': `${imageId}`,
        'content': `${comment}`
      })
    })
    .then(resp => resp.json())
    .then(comment => appendComment(comment['content'], comment['id']))
  }

  function deleteComment(e){
    let commentId = e.target.parentNode.dataset.id
    let commentLi = e.target.parentNode;
    commentLi.remove();

    fetch(`${commentsURL}/${commentId}`, {
      method: 'DELETE'
    })
  }

  // Event Delegation for Likes and Comments
  container.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    if (e.target.id === 'like_button') {
      addLike(e);
    } else if (e.target.id === 'comment_submit') {
        let comment = document.getElementById('comment_input').value;

        if (comment !== '') {
          document.querySelector('form#comment_form').reset(); 
          saveComment(comment);
        }
    } else if (e.target.className === 'delete-btn') {
      deleteComment(e);
    }
  });

})
