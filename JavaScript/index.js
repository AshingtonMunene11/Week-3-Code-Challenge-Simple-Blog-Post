const BASE_URL = "http://localhost:3000/posts";
const postList = document.getElementById("post-list");
const postDetail = document.getElementById("post-detail");
const postForm = document.getElementById("new-post-form");

let currentPost = null;

document.addEventListener("DOMContentLoaded", main);

function main() {
  displayPosts();
  addNewPostListener();
}

function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      renderPostList(data);
      if (data.length > 0) {
        renderPostDetail(data[0]);
        currentPost = data[0];
      }
    })
    .catch(err => console.error("Fetch error:", err));
}

function renderPostList(posts) {
  postList.innerHTML = "";
  posts.forEach(post => {
    const li = document.createElement("li");
    li.textContent = post.title;
    li.dataset.id = post.id;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      renderPostDetail(post);
      currentPost = post;
    });
    postList.appendChild(li);
  });
}

function renderPostDetail(post) {
  postDetail.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <p><em>Posted by: ${post.author}</em></p>

    <button id="edit-button">Edit</button>
    <button id="delete-button">Delete</button>

    <form id="edit-post-form" class="hidden">
      <h4>Edit Post</h4>
      <label for="edit-title">Title:</label>
      <input type="text" id="edit-title" value="${post.title}" required>

      <label for="edit-content">Content:</label>
      <textarea id="edit-content" rows="4" required>${post.content}</textarea>

      <button type="submit">Update</button>
      <button type="button" id="cancel-edit">Cancel</button>
    </form>
  `;

  document.getElementById("edit-button").addEventListener("click", () => {
    document.getElementById("edit-post-form").classList.remove("hidden");
  });

  document.getElementById("cancel-edit").addEventListener("click", () => {
    document.getElementById("edit-post-form").classList.add("hidden");
  });

  document.getElementById("edit-post-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedTitle = document.getElementById("edit-title").value.trim();
    const updatedContent = document.getElementById("edit-content").value.trim();

    const updatedPost = {
      ...post,
      title: updatedTitle,
      content: updatedContent
    };

    fetch(`${BASE_URL}/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost)
    })
      .then(res => res.json())
      .then(updated => {
        currentPost = updated;
        displayPosts();
        renderPostDetail(updated);
      });
  });

  document.getElementById("delete-button").addEventListener("click", () => {
    fetch(`${BASE_URL}/${post.id}`, {
      method: "DELETE"
    })
      .then(() => {
        postDetail.innerHTML = "<p>Select a post to view its full content.</p>";
        displayPosts();
      });
  });
}

function addNewPostListener() {
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const content = document.getElementById("content").value.trim();

    const newPost = { title, author, content };

    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(addedPost => {
        displayPosts();
        postForm.reset();
        renderPostDetail(addedPost);
        currentPost = addedPost;
      });
  });
}
