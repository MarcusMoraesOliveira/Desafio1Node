const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");
var age;
var idade;
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});
const checkMiddleware = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect("/");
  } else {
    next();
  }
};
app.get("/", (req, res) => {
  return res.render("age");
});
app.post("/check", (req, res) => {
  age = parseInt(req.body.age);
  if (age < 18) {
    return res.redirect(`/minor/?age=${age}`);
  } else {
    return res.redirect(`/major/?age=${age}`);
  }
});
app.get("/minor", checkMiddleware, (req, res) => {
  idade = req.query.age;
  return res.render("minor", { idade });
});
app.get("/major", checkMiddleware, (req, res) => {
  idade = req.query.age;
  return res.render("major", { idade });
});
app.listen(3001);
