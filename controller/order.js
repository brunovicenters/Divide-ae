class Order {
  constructor(food, quantity, price) {
    this.food = food;
    this.quantity = quantity;
    this.price = price;
  }

  totalPrice() {
    return this.quantity * this.price;
  }
}

module.exports = Order;
