/** My obj
{
  "id": 3903,
  "url": "http://blog.flatironschool.com/wp-content/uploads/2016/01/20141110-Flatiron-School-29-352x200.jpg",
  "name": "Not Flatiron",
  "like_count": 0,
  "comments": [
    {
      "id": 68401,
      "content": "first comment!",
      "image_id": 3903,
      "created_at": "2019-11-07T15:04:43.958Z",
      "updated_at": "2019-11-07T15:04:43.958Z"
    }
  ]
}
 */

const imageId = 3903;

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

const likeURL = `https://randopic.herokuapp.com/likes`;

const commentsURL = `https://randopic.herokuapp.com/comments`;

// relevant containers
const imageCard = document.querySelector('#image_card');
const imgView = imageCard.querySelector('img');
const imgTitle = imageCard.querySelector('h4');
const likes = imageCard.querySelector('span span');
const commentsUl = imageCard.querySelector('ul');

// interactables
const likeButton = imageCard.querySelector('button');
const commentForm = imageCard.querySelector('form');

// append comment
const appendComment = comment => {
  let li = document.createElement('li');
  let deleteButton = document.createElement('button');

  li.innerText = comment.content;
  li.dataset.imageId = comment.image_id;
  li.dataset.id = comment.id;
  deleteButton.innerText = 'X';
  deleteButton.dataset.action = 'delete';

  li.appendChild(deleteButton);

  commentsUl.insertAdjacentElement('beforeend', li);
};

// show image function
const showImage = imgObj => {
  imageCard.dataset.id = imgObj.id;
  imgView.src = imgObj.url;
  imgTitle.innerText = imgObj.name;
  likes.innerText = imgObj.like_count;

  imgObj.comments.forEach(appendComment);
};

// initial fetch
const init = () => {
  return fetch(imageURL)
    .then(resp => resp.json())
    .then(showImage);
};

// event handlers
const likeHandler = event => {
  const newLikeCount = parseInt(likes.innerText, 10) + 1;
  likes.innerText = newLikeCount;

  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      image_id: 3903,
    }),
  });
};

const commentHandler = event => {
  event.preventDefault();

  const comment = event.target[0].value;
  const commentObj = {
    image_id: 3903,
    content: comment,
  };

  commentForm.reset();

  fetch(commentsURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentObj),
  })
    .then(resp => resp.json())
    .then(appendComment);
};

const deleteHandler = event => {
  const commentLi = event.target.parentNode;
  const commentId = commentLi.dataset.id;

  fetch(`${commentsURL}/${commentId}`, {
    method: 'DELETE',
  })
    .then(resp => resp.json())
    .then(res2 => {
      if (res2.message === 'Comment Successfully Destroyed') commentLi.remove();
    });
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  init();

  likeButton.addEventListener('click', likeHandler);
  commentForm.addEventListener('submit', commentHandler);
  commentsUl.addEventListener('click', event => {
    if (event.target.dataset.action === 'delete') deleteHandler(event);
  });
});
