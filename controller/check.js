class Check {
  constructor(restaurant, price, discount, date, people, tip) {
    this.restaurant = restaurant;
    this.price = price;
    this.discount = discount;
    this.date = date;
    this.people = [people];
    this.tip = tip;
  }
}

module.exports = Check;
