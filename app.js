const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

const users = [];

app.post("/api/signup", (req, res) => {
  const { name, email } = req.body;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  // Check if the email is already registered
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email is already registered." });
  }

  // Create a new user
  const newUser = {
    id: uuid.v4(),
    name,
    email,
  };
  users.push(newUser);

  res.status(200).json({ message: "User signed up successfully." });
});



const posts = [];

app.post("/api/posts", (req, res) => {
  const { userId, content } = req.body;

  // Validate input
  if (!userId || !content) {
    return res.status(400).json({ message: "userId and content are required." });
  }

  // Create a new post
  const newPost = {
    id: uuid.v4(),
    userId,
    content,
  };
  posts.push(newPost);

  res.status(200).json({ message: "Post created successfully." });
});


app.delete("/api/deletepost/:postId", (req, res) => {
    const { postId } = req.params;
  
    // Find the post by ID
    const index = posts.findIndex((post) => post.id === postId);
  
    if (index === -1) {
      return res.status(404).json({ message: "Post not found." });
    }
  
    // Remove the post
    posts.splice(index, 1);
  
    res.status(200).json({ message: "Post deleted successfully." });
  });

  
  app.get("/api/posts/:userId", (req, res) => {
    const { userId } = req.params;
  
    // Filter posts by userId
    const userPosts = posts.filter((post) => post.userId === userId);
  
    res.status(200).json(userPosts);
  });
  app.get("/api/user/:email", (req, res) => {
    const { email } = req.params;
  
    // Filter posts by userId
    const userPosts = users.filter((user) => user.email === email);
  
    res.status(200).json(userPosts);
  });


  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  