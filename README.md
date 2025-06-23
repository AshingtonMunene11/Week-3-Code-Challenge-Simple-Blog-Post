🇰🇪 TweetHub
TweetHub is a vibrant, Gen Z–inspired single-page application that lets users view, post, edit, and delete micro-blogs in a format that feels like a cross between Twitter threads and digital activism. Built with HTML, CSS, and vanilla JavaScript, it interfaces with a local JSON API to manage blog posts.

🖥️ Live Preview
![image](https://github.com/user-attachments/assets/afee1ef8-89ec-4e82-bff3-0c761442b333)

(For development only)
Live via: http://127.0.0.1:5500
API via: http://localhost:3000/posts

📦 Features
✅ View all tweet-style posts
✅ Display full content and author when selected
✅ Add a new post via form
✅ Edit post content in place
✅ Delete a post from the list

🚀 Getting Started
 1. Clone the repo
    git clone https://github.com/your-username/tweethub.git
    cd tweethub
 2. Install and run json-server
    npm install -g json-server@0.17.4
    json-server --watch db.json
 3. Launch frontend
    Use Live Server extension in VS Code or any local server.


📁 Project Structure
├── index.html
├── db.json
├── CSS/
│   └── style.css
├── JavaScript/
│   └── index.js

🧪 API Endpoints
Method	Endpoint	Description
GET	/posts	Fetch all posts
GET	/posts/:id	Fetch a single post
POST	/posts	Create a new post
PATCH	/posts/:id	Update a post
DELETE	/posts/:id	Remove a post


🧠 Learning Goals
Use fetch API to interact with JSON data
Update the DOM dynamically based on user actions
POST, PATCH, and DELETE data from a mock backend
Structure HTML/CSS for a responsive, centered SPA
