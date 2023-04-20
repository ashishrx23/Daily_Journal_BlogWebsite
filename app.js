
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to our blog website! We are thrilled to have you here.";
const aboutContent = "Hello, Myself Ashish Tiwari creator of this wonderful blog website";
const contactContent = "You can contact us through";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.set('view engine', 'ejs');    //EJS looks inside the "views" folder to find and use the files inside views.

app.get("/", function(req,res){
  res.render("home", {
    startingContent : homeStartingContent, 
    posts : posts
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent : aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent : contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title : req.body.postTitle,
    content : req.body.postBody
  }
  posts.push(post);
  res.redirect("/");

});

app.get("/post/:postName", function(req, res){  //Here used Express Routing Parameters
  const requestedTitle = ((req.params.postName).toLowerCase()).replaceAll("-"," ");

  posts.forEach(function(post){
    const storedTitle = (post.title).toLowerCase();
    if(requestedTitle === storedTitle){
      // console.log("Match Found!");
      res.render("post", {title : post.title, content : post.content });
    } 
  });
  
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
