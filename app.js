const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const store = require("store");
const methodOverride = require("method-override");

const app = express();

const Check = require("./controller/check");
const Person = require("./controller/person");
const Order = require("./controller/order");

app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

store.set("checks", []);
store.set("theme", "light");
store.set("language", "en");

const brlCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

app.get("/", (req, res) => {
  res.render("check/home", {
    checks: store.get("checks"),
    brlCurrency: brlCurrency,
    theme: store.get("theme"),
    language: store.get("language"),
  });
});

app.get("/check/:arrPos", (req, res) => {
  const check = store.get("checks")[req.params.arrPos];
  res.render("check/check", {
    check: check,
    theme: store.get("theme"),
    language: store.get("language"),
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
        new Person(check.person, new Order(check.dish, check.qty, check.price)),
        check.tip / 100
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
