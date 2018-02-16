var bodyParser    = require("body-parser"),
    mongoose       = require("mongoose"),
    express        = require("express"),
    app            = express();
 
 
//app config    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "Test",
    image: "https://images.unsplash.com/photo-1470328358326-dee4879da669?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=407e114dc47bc1df4ce0e4292f158576&auto=format&fit=crop&w=750&q=80",
    body: "Hello"
});

//Show RESTfulnode Routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

//index route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});
//New Route

app.get("/blogs/new", function(req, res) {
    res.render("new");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is listening");
});

    
    