const express = require("express");
const router = express.Router();
const store = require("store");

const Check = require("../controller/check");
const Person = require("../controller/person");
const Order = require("../controller/order");
const sideDish = require("../controller/sideDish");

const getDate = require("../utils/getDate");

router.post("/addSideDish/:arrPos", (req, res) => {
  const checks = store.get("checks");
  const data = req.body;

  const peopleData = data.people.map((person) => {
    return parseInt(person);
  });
  try {
    const c = { ...store.get("checks")[req.params.arrPos] };
    c.date = getDate();
    c.sideDishes.push(
      new sideDish(data.name, parseFloat(data.price), peopleData)
    );
    checks.splice(req.params.arrPos, 1);
    checks.push(c);

    store.set("checks", checks);

    res.redirect("/check/" + (checks.length - 1));
  } catch (error) {
    console.log(error);
    res.redirect("/check/" + checks.length);
  }
});

router.get("/deleteSideDish/:arrPos/:sdPos", (req, res) => {
  const checks = store.get("checks");
  const check = checks[req.params.arrPos];
  try {
    checks.splice(req.params.arrPos, 1);
    check.date = getDate();
    check.sideDishes.splice(req.params.sdPos, 1);
    checks.push(check);
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
});

module.exports = router;
