const checkSum = document.getElementById("checkSum");
const btnModalSum = document.getElementById("btnModalSum");

if (checkSum && checkSum.innerText.includes("*")) {
  checkSum.addEventListener("click", (event) => {
    btnModalSum.click();
  });
}
