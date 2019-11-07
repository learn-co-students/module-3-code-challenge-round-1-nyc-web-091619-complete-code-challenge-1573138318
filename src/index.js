let myImg = {};

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId =  3906; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  // Didn't use these because my persisting
  // functions don't exist in this scope
  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL).then(resp => resp.json()).then(json => {
    console.log(json);
    myImg = {...json};
    appendToImageCard(myImg);  
  });
  
  // Update the:
  // the image url
  // the image name
  // the number of likes
  // any comments in an unordered list

  const likeButton = document.getElementById('like_button');
  likeButton.addEventListener('click', likePicture);

  const commentForm = document.getElementById('comment_form');
  commentForm.addEventListener('submit', addComment);

})

const imageCard = document.getElementById('image_card');
const imageLikes = document.getElementById('likes');
const imageTag = document.getElementById('image');
const imageComments = document.getElementById('comments');


const appendToImageCard = (imageObject) => {
  
  imageTag.src = imageObject.url;
  imageTag.dataset.id = imageObject.id;
  
  const imageTitle = document.getElementById('name');
  imageTitle.innerText = imageObject.name;

  imageLikes.innerText = imageObject.like_count;

  imageObject.comments.forEach(comment => {
    let li = document.createElement('li');
    li.innerText = comment.content;

    // Deleting comments isn't working yet:
    // let deleteButton = document.createElement('button');
    // deleteButton.dataset.id = `${comment.id}`;
    // deleteButton.innerText = 'Delete';
    // deleteButton.dataset.action = 'delete';
    // li.appendChild(deleteButton);

    imageComments.appendChild(li);
  })

}

const likePicture = (event) => {
  imageLikes.innerText = parseInt(imageLikes.innerText) + 1;
  persistLikes(parseInt(imageLikes.innerText));
}

const persistLikes = (likeCount) => {
  fetch(`https://randopic.herokuapp.com/likes/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({ 
      image_id: parseInt(imageTag.dataset.id),
      like_count: likeCount
    })
  }).then(resp => resp.json()).then(json => console.log(json));
  // console.log(`https://randopic.herokuapp.com/images/${imageTag.dataset.id}`);
}

const addComment = (event) => {
  event.preventDefault();

  let li = document.createElement('li');
  li.innerText = event.target[0].value;

  imageComments.appendChild(li);

  event.target.reset();

  persistComment(li.innerText);

}

const persistComment = (newComment) => {
  fetch(`https://randopic.herokuapp.com/comments/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      image_id: parseInt(imageTag.dataset.id),
      content: newComment
    })
  }).then(resp => resp.json()).then(json => console.log(json))
}