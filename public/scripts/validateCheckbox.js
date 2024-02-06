function validateCheckbox(type) {
  let checkBoxesGroup = document.querySelectorAll(".sideDishPeople");

  let atLeastOneChecked = false;
  checkBoxesGroup.forEach((checkbox) => {
    if (checkbox.checked) {
      atLeastOneChecked = true;
    }
  });

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
