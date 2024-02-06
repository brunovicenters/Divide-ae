function validateCheckbox(type) {
  let checkBoxesGroup;
  let atLeastOneChecked = false;
  if (type === 0) {
    checkBoxesGroup = document.querySelectorAll(".sideDishPeopleAdd");

    checkBoxesGroup.forEach((checkbox) => {
      if (checkbox.checked) {
        atLeastOneChecked = true;
      }
    });
  } else {
    let validationNum = document.querySelector("#checkboxValidationNum");

    validationNum = parseInt(validationNum.innerText);

    console.log(validationNum);

    for (let i = 0; i < validationNum; i++) {
      let j = 0;
      let search = `.sideDishPeopleEdit${i}`;
      checkBoxesGroup = document.querySelectorAll(search);
      console.log(checkBoxesGroup);
      checkBoxesGroup.forEach((checkbox) => {
        if (checkbox.checked) {
          j++;
          console.log(j);
        }
      });
      if (j == 0) {
        if (type === 0) {
          alert("Please select at least one checkbox from the side dish!");
        } else {
          alert("Please select at least one checkbox from each side dish!");
        }
        return false;
      } else {
        atLeastOneChecked = true;
      }
    }
  }

  console.log("hello world");

  if (!atLeastOneChecked) {
    if (type === 0) {
      alert("Please select at least one checkbox from the side dish!");
    } else {
      alert("Please select at least one checkbox from each side dish!");
    }
    return false;
  }

  return true;
}
