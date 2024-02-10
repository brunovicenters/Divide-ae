class Check {
  constructor(restaurant, price, date, people, tip) {
    this.restaurant = restaurant;
    this.price = price;
    this.date = date;
    this.people = [people];
    this.tip = tip;
    this.sideDishes = [];
  }
}

module.exports = Check;
