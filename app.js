//Import connection from seperate JS file to keep connection info private
//Import frameworks
import connection from "./mysqlconnect.js"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
//Initiate express framework
const app = express()
//CORS exception
app.use(cors(
    {
    origin: "https://nategoodman.dev"
    }))
//Initiate bodyparser framework so results can return in JSON
app.use(bodyParser.json())
//Main page
app.get("/", (req, res) => 
{
    res.send("Commands: 1. To get the view count of nategoodman.dev go to https://nategoodmandevapi.herokuapp.com/views")
})
//Call the current amount of views for the site
app.get("/views", (req, res) =>
{
    //Query to retrieve views and save in variable for later
    let sqlCode = "Select * FROM viewCount"
    let query = connection.query(sqlCode,(err, results) =>
    {
        if (err) throw err
        res.send(JSON.stringify(
            {
                "status":200,
                "response": results
            }))
    })
})
//Call mysql and update view count
app.post("/views", (req,res) =>
{
    let sqlCode = "UPDATE viewCount SET views = views + 1"
    let query = connection.query(sqlCode,(err,results) =>
    {
        if (err) throw err
        res.status(200).send()
    }
    )
})
//Set port
let port = process.env.PORT || 3000
app.listen(port)
