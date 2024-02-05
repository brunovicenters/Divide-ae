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

router.post("/addOrder/:arrPos/:personPos", (req, res) => {
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

router.get("/deleteOrder/:arrPos/:personPos/:orderPos", (req, res) => {
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

module.exports = router;
