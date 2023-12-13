const activeLang = (lang) => {
  const switches = document.querySelectorAll(".switches");
  switches.forEach((checkbox) => {
    if (checkbox.name == lang) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
};
