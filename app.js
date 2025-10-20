const express = require('express');
const mongoose = require("mongoose");
const Student = require("./models/MyDataSchema");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/success.html", (req, res) => {
    res.render("success");
});

//Connect with Database
mongoose
    .connect("mongodb://localhost:27017/StudentDB")
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`);
        });
        console.log("Connected to MongoDB locally");
    })
    .catch((err) => {console.error("Connection error:", err)})


//Post Data to Database
app.post("/", async (req, res) => {
    try {
        const coursesArray = req.body.courses
            .split(",")
            .map((course) => course.trim())
            .filter((c) => c); 

        const newStudent = new Student({
            name: req.body.name,
            department: req.body.department,
            courses: coursesArray, 
            degree: req.body.degree,
            age: req.body.age,
        });

        await newStudent.save();
        res.redirect("/success.html");
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: "Error creating student", error });
    }
});

//Get Data from Database
// app.get("/students", async (req, res) => {
//     const students = await Student.find();
//     res.render("students", { students });
// });

app.get("/students", async (req, res) => {
    Student.find()
    .then((students) => {
        res.render("students", {myTitle: "Students", students });
    })
    .catch((err) => {res.status(400).send({message: "Error View student", err })});
});
