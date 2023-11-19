const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const store = require("store");

const app = express();

const Check = require("./classes/check");
const People = require("./classes/people");
const Order = require("./classes/order");

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

store.set("checks", [
  new Check(
    "it's a check",
    Math.floor(Math.random() * 300),
    new Date(),
    new People("Bruno", new Order("pizza", 1, 10))
  ),
]);

app.get("/", (req, res) => {
  res.render("check/home", {
    checks: store.get("checks"),
  });
});

app.get("/addCheck", (req, res) => {
  const checks = store.get("checks");
  try {
    checks.push(
      new Check(
        "it's a check",
        Math.floor(Math.random() * 300),
        new Date(),
        new People("Bruno", new Order("pizza", 1, 10))
      )
    );
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});