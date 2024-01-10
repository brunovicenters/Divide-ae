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

// DELETE LATER
const usdCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const brlCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const eurCurrency = new Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

const gbpCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

const getDate = () => {
  const d = new Date();
  let h =
    d.getHours().toString().length == 1 ? "0" + d.getHours() : d.getHours();
  let min =
    d.getMinutes().toString().length == 1
      ? "0" + d.getMinutes()
      : d.getMinutes();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  let date = h + ":" + min + ", " + day + "/" + month + "/" + year;
  return date;
};

app.get("/", (req, res) => {
  res.render("check/home", {
    checks: store.get("checks"),
    currency:
      store.get("language") == "en"
        ? usdCurrency
        : store.get("language") == "pt"
        ? brlCurrency
        : store.get("language") == "uk"
        ? gbpCurrency
        : eurCurrency,
    theme: store.get("theme"),
    language: store.get("language"),
  });
});

// SEED DATA
let devTest = new Check(
  "Testing",
  125.99,
  getDate(),
  new Person("Bruno", new Order("pão de queijo", "4", "25.99")),
  0
);
store.set("checks", [devTest]);

app.get("/check/:arrPos", (req, res) => {
  req.query.idiom ? store.set("language", req.query.idiom) : null;
  const check = store.get("checks")[req.params.arrPos];
  res.render("check/check", {
    check: check,
    currency:
      store.get("language") == "en"
        ? usdCurrency
        : store.get("language") == "pt"
        ? brlCurrency
        : store.get("language") == "uk"
        ? gbpCurrency
        : eurCurrency,
    position: req.params.arrPos,
    theme: store.get("theme"),
    language: store.get("language"),
  });
});

app.post("/addCheck", (req, res) => {
  req.body.language ? store.set("language", req.body.language) : null;
  const checks = store.get("checks");
  const check = req.body.check;
  try {
    checks.push(
      new Check(
        check.restaurant,
        check.totalPrice,
        getDate(),
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

app.put("/editCheck/:arrPos", (req, res) => {
  const checks = store.get("checks");
  const check = checks[req.params.arrPos];
  const c = req.body.check;
  try {
    checks.splice(req.params.arrPos, 1);
    check.date = getDate();
    check.restaurant = c.restaurant;
    check.tip = c.tip / 100;
    check.price = c.totalPrice;
    checks.push(check);
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
});

app.delete("/deleteCheck/:arrPos", (req, res) => {
  const checks = store.get("checks");
  checks.splice(req.params.arrPos, 1);
  store.set("checks", checks);
  res.redirect("/");
});

app.post("/addPerson/:arrPos", (req, res) => {
  const checks = store.get("checks");
  const check = checks[req.params.arrPos];
  const person = req.body.person;
  try {
    checks.splice(req.params.arrPos, 1);
    check.date = getDate();
    check.people.push(
      new Person(person.name, new Order(person.dish, person.qty, person.price))
    );
    checks.push(check);
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
});

app.put("/editPerson/:arrPos/:personPos", (req, res) => {
  const checks = store.get("checks");
  const check = checks[req.params.arrPos];
  const person = check.people[req.params.personPos];
  const p = req.body.person;
  const d = req.body.dish;
  try {
    checks.splice(req.params.arrPos, 1);
    check.date = getDate();
    person.name = p.name;
    let dishPos = 0;
    person.orders.forEach((order) => {
      if (Array.isArray(d.food)) {
        order.food = d.food[dishPos];
        order.quantity = d.qty[dishPos];
        order.price = d.price[dishPos];
        dishPos++;
      } else {
        order.food = d.food;
        order.quantity = d.qty;
        order.price = d.price;
      }
    });
    checks.push(check);
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
});

app.delete("/deletePerson/:arrPos/:personPos", (req, res) => {
  const checks = store.get("checks");
  const check = checks[req.params.arrPos];
  try {
    checks.splice(req.params.arrPos, 1);
    check.date = getDate();
    check.people.splice(req.params.personPos, 1);
    checks.push(check);
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
});

app.post("/addOrder/:arrPos/:personPos", (req, res) => {
  const checks = store.get("checks");
  const check = checks[req.params.arrPos];
  const person = check.people[req.params.personPos];
  const order = req.body.order;
  try {
    checks.splice(req.params.arrPos, 1);
    check.date = getDate();
    person.orders.push(new Order(order.food, order.qty, order.price));
    checks.push(check);
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
});

app.get("/deleteOrder/:arrPos/:personPos/:orderPos", (req, res) => {
  const checks = store.get("checks");
  const check = checks[req.params.arrPos];
  const person = check.people[req.params.personPos];
  try {
    checks.splice(req.params.arrPos, 1);
    check.people.splice(req.params.personPos, 1);
    check.date = getDate();
    person.orders.splice(req.params.orderPos, 1);
    check.people.splice(req.params.personPos, 0, person);
    checks.push(check);
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
});

// app.post("/changeLanguage", (req, res) => {
//   store.set("language", req.body.language);
//   res.redirect("/");
// });

app.delete("/deleteAll", (req, res) => {
  store.set("checks", []);
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.render("layouts/404", {
    theme: store.get("theme"),
    language: store.get("language"),
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
