const express = require("express");
const router = express.Router();
const store = require("store");

const Check = require("../controller/check");
const Person = require("../controller/person");
const Order = require("../controller/order");

const {
  usdCurrency,
  brlCurrency,
  gbpCurrency,
  eurCurrency,
} = require("../utils/currency");

const getDate = require("../utils/getDate");

router.post("/addPerson/:arrPos", (req, res) => {
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

router.put("/editPerson/:arrPos/:personPos", (req, res) => {
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

router.delete("/deletePerson/:arrPos/:personPos", (req, res) => {
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

module.exports = router;
