const bodyParser = require("body-parser");
const { render } = require("ejs");
const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//this is a middleware, we create middleware using the app.use
//middleware is something which can read the resquest and response both and can  do some preprocessing
app.use(express.urlencoded());
app.use(express.static("assets"));

//middleware 1
app.use(function (req, res, next) {
  req.myName = "sahil";
  // console.log("middleware 1");
  next();
});

//middleware 2
app.use(function (req, res, next) {
  console.log("my name from mw2", req.myName);
  // console.log("middleware 2 called");
  next();
});

let contactList = [
  {
    name: "sahil",
    phone: "1234567890",
  },
  {
    name: "hemang",
    phone: "111111111",
  },
  {
    name: "Tony stark",
    phone: "000000000000",
  },
];

app.get("/", function (req, res) {
  console.log("my name from get", req.myName);
  // console.log(__dirname);
  // res.send("<h1>Cool it is running or is it!!</h1>");
  return res.render("home", {
    title: "Contacts List",
    contact_list: contactList,
  });
});

app.post("/create-contact", function (req, res) {
  // return res.redirect("/practice");

  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  // });

  contactList.push(req.body);
  // console.log(req.body);
  // console.log(req.body.name);
  // console.log(req.body.phone);

  return res.redirect("/");
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "lets play with ejs",
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Opps! and Error occured", err);
  }
  console.log("Yup!My Express server is up and running on port", port);
});
