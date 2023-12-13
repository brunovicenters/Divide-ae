const activeLang = (lang) => {
  const switches = document.querySelectorAll(".switches");
  switches.forEach((checkbox) => {
    if (checkbox.id == lang) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
};
