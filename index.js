const { render } = require("ejs");
const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

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
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.phone);

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
