class Check {
  constructor(title, price, date) {
    this.title = title;
    this.price = price;
    this.date = date;
  }
}

const container = document.getElementById("container");
const add = document.getElementById("add");

// let array = [];
let array = JSON.parse(localStorage.getItem("array"));

if (!array) {
  console.log("Array is empty");
} else {
  array.map((check) => {
    let p = document.createElement("p");
    p.innerText = check.title + " - " + check.price + " at " + check.date;
    container.appendChild(p);
  });
}

add.addEventListener("click", () => {
  const check = new Check("Coco Bambu", 250.4, new Date());
  array.push(check);
  localStorage.setItem("array", JSON.stringify(array));
  let p = document.createElement("p");
  p.innerText = check.title + " - " + check.price + " at " + check.date;
  container.appendChild(p);
});

// Compare two dates
// const compareDates = (d1, d2) => {
//   let date1 = new Date(d1).getTime();
//   let date2 = new Date(d2).getTime();

//   if (date1 < date2) {
//     console.log(`${d1} is less than ${d2}`);
//   } else if (date1 > date2) {
//     console.log(`${d1} is greater than ${d2}`);
//   } else {
//     console.log(`Both dates are equal`);
//   }
// };

// compareDates(array[0].date, array[5].date);
