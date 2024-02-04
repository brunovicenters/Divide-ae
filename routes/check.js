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

router.get("/:arrPos", (req, res) => {
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

router.post("/addCheck", (req, res) => {
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

router.put("/editCheck/:arrPos", (req, res) => {
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

router.delete("/deleteCheck/:arrPos", (req, res) => {
  const checks = store.get("checks");
  checks.splice(req.params.arrPos, 1);
  store.set("checks", checks);
  res.redirect("/");
});

router.delete("/deleteAll", (req, res) => {
  store.set("checks", []);
  res.redirect("/");
});

module.exports = router;
