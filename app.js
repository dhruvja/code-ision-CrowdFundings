const express = require("express");
// const key = require("./secrets");
const axios = require("axios");
var fileupload = require("express-fileupload");
var pool = require("./db");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(fileupload());
app.use("/api/uploads", express.static("uploads"));

app.get('/api/getproject/:id',(req,res) => {
    var id = req.params.id
    pool.query("SELECT *, projects.id AS project_id FROM projects INNER JOIN accounts ON projects.user_id = accounts.id WHERE projects.id = ? ",[id], (err,rows)=>{
        if(err){
            console.log(err)
            res.json({success: false, error: err})
        }
        else{
            console.log(rows)
            res.json({success: true, rows:rows[0]})
        }
    })
})

app.get('/api/getallprojects',(req,res) => {
    pool.query("SELECT *, projects.id AS project_id FROM projects INNER JOIN accounts ON projects.user_id = accounts.id  ",(err,rows)=>{
        if(err){
            console.log(err)
            res.json({success: false, error: err})
        }
        else{
            console.log(rows)
            res.json({success: true, rows:rows})
        }
    })
})


app.post('/api/register',(req,res) => {

})

app.post("/api/hostproject", (req, res) => {
    const details = req.body
    const image = req.files.image
    console.log(image)
    var now = new Date()
    user_id = 1;

    image.mv("./uploads/" + image.name, function(err,result){
        if(err){
            console.log(err)
            res.json({success: false, msg: "Image could not be uploaded"})
        }
        else{
            console.log("Image uploaded")
            pool.query("INSERT INTO projects(user_id, project_name, descriptions, image, created_date) VALUES(?,?,?,?,?);",[user_id,details.project_name, details.description, image.name, now], (err,rows)=>{
                if(err){
                    console.log("error connecting to database")
                    console.log(err)
                    res.json({success: false, msg: "Data could not be uploaded"})
                }
                else{
                    console.log(rows)
                    res.json({success: true, id: rows.insertId})
                }
            })
        }
    })
});

// const audio = req.files.audio;
//     console.log("audio recieved");
//     audio.mv("./uploads/" + audio.name, function (err, result) {
//         if (err) {
//             console.log(err);
//             res.json({ success: false, msg: "Audio couldnt be uploaded" });
//         } else {
//             console.log("Audio uploaded successfully");
//             res.json({ success: true, msg: "Audio uploaded successfully" });
//         }
//     });

app.get("/api/projects",(req,res)=> {

})


app.listen(5000, () => {
    console.log("The server is running on port 5000");
});