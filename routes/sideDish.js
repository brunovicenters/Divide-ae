const express = require("express");
const router = express.Router();
const store = require("store");

const Check = require("../models/check");
const Person = require("../models/person");
const Order = require("../models/order");
const sideDish = require("../models/sideDish");

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

router.put("/editSideDish/:arrPos", (req, res) => {
  const checks = store.get("checks");
  const check = checks[req.params.arrPos];
  const sd = req.body;

  let peopleData = [];

  if (sd.people.length > 1) {
    for (let i = 0; i < sd.people.length; i++) {
      const sdPeople = sd.people[i].map((person) => {
        return parseInt(person);
      });
      peopleData.push(sdPeople);
    }
  } else {
    peopleData = sd.people[0].map((person) => {
      return parseInt(person);
    });
  }

  try {
    checks.splice(req.params.arrPos, 1);
    check.date = getDate();
    if (Array.isArray(sd.name)) {
      for (let i = 0; i < sd.name.length; i++) {
        check.sideDishes[i].dish = sd.name[i];
        check.sideDishes[i].price = sd.price[i];
        check.sideDishes[i].people = peopleData[i];
      }
    } else {
      check.sideDishes[0].dish = sd.name;
      check.sideDishes[0].price = sd.price;
      check.sideDishes[0].people = peopleData;
    }
    checks.push(check);
    store.set("checks", checks);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/check/" + (checks.length - 1));
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
