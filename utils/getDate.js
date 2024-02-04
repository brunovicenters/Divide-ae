const getDate = () => {
  const d = new Date();
  let h =
    d.getHours().toString().length == 1 ? "0" + d.getHours() : d.getHours();
  let min =
    d.getMinutes().toString().length == 1
      ? "0" + d.getMinutes()
      : d.getMinutes();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  let date = h + ":" + min + ", " + day + "/" + month + "/" + year;
  return date;
};

module.exports = getDate;
