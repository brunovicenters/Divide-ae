const usdCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const brlCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const eurCurrency = new Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

const gbpCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

const activeLang = (lang) => {
  const switches = document.querySelectorAll(".switches");
  const select = document.getElementById("languages");
  const options = select.options;
  let event = new Event("change");

  for (let i = 0; i < options.length; i++) {
    if (options[i].value == lang) {
      options[i].selected = true;
      select.dispatchEvent(event);
    } else {
      options[i].selected = false;
    }
  }

  switches.forEach((checkbox) => {
    if (checkbox.id == lang) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });

  const translator = new MultiLanguage();

  translator.registerSelect(document.getElementById("languages"));

  const json = JSON.parse(
    document.getElementById("translation-sheet").innerHTML
  );

  translator.addSheet(json);
};
