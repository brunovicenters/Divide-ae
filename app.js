const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const store = require("store");
const methodOverride = require("method-override");

const app = express();

const Check = require("./classes/check");
const People = require("./classes/people");
const Order = require("./classes/order");

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

store.set("checks", []);

app.get("/", (req, res) => {
  res.render("check/home", {
    checks: store.get("checks"),
  });
});

app.get("/check/:arrPos", (req, res) => {
  const check = store.get("checks")[req.params.arrPos];
  res.render("check/check", {
    check: check,
  });
});

app.post("/addCheck", (req, res) => {
  const checks = store.get("checks");
  try {
    let date =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ", " +
      new Date().getDay() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear();
    checks.push(
      new Check(
        "it's another check",
        Math.floor(Math.random() * 300),
        date,
        new People("Bruno", new Order("pizza", 1, 10))
      )
    );
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.post("/deleteAll", (req, res) => {
  store.set("checks", []);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
