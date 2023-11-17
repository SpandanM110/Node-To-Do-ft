//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//placeholders for removed task
var complete = ["finish jquery"];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    task.push(newTask);
    res.redirect("/");
});


app.post("/removetask", function(req, res) {
    var completedTasks = req.body.check; // Use a plural name for clearer representation
    if (typeof completedTasks === "string") {
        // Remove the completed task from 'task' and add it to 'complete'
        task.splice(task.indexOf(completedTasks), 1);
        complete.push(completedTasks);
    } else if (typeof completedTasks === "object") {
        for (var i = 0; i < completedTasks.length; i++) {
            // Remove each completed task from 'task' and add it to 'complete'
            task.splice(task.indexOf(completedTasks[i]), 1);
            complete.push(completedTasks[i]);
        }
    }
    res.redirect("/");
});


//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});