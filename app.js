// setup.. this is similar to when we use our default tags in html
const express = require("express")
// we have to use cors to host a front end and a backend on the same device
var cors = require('cors')
// activate or tell app varibale to be an express server
const app = express()
app.use(cors())
const router = express.Router()


// start the web server... app.listen(portnumber, function)

// making an api using routes
// routes are used to handle browser request. They look like URL's. difference is when a browser requests a route it is dynamicaly handles using a function

// GET or a regular request when someone goes to https://localhost:3000/hello. when using a function in a route, we almost always have a parameter or handle a response or request

router.get("/song", function(req,res){
    const songs = [
        {
            title: "We found love",
            artist: "Rihanna",
            popularity: 10,
            releaseDate: new Date(2011, 9, 22),
            genre: ["electro house"]
        },
        {
            title: "Happy",
            artist: "Pharrell Williams",
            popularity: 10,
            releaseDate: new Date(2013, 11, 21),
            genre: ["soul", "new soul"]
        }   
    ];


    res.json(songs)
})

// all request that use an api start with a api.. url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)