const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const store = require("store");
const methodOverride = require("method-override");

const app = express();

const Check = require("./classes/check");
const Person = require("./classes/person");
const Order = require("./classes/order");

app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));

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
  const check = req.body.check;
  try {
    let date =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ", " +
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
    checks.push(
      new Check(
        check.restaurant,
        check.totalPrice,
        date,
        new Person(check.person, new Order(check.dish, check.qty, check.price))
      )
    );
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
});

app.post("/deleteAll", (req, res) => {
  store.set("checks", []);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
