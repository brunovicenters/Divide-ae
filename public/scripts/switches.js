// CURRENCIES
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

const idiom = document.querySelector("#idiom");

// ACTIVE LANG
const activeLang = (lang) => {
  // SWITCHES & SELECT
  const switches = document.querySelectorAll(".switches");
  const select = document.getElementById("languages");
  const options = select.options;
  const idiom = document.querySelector("#idiom");
  let event = new Event("change");

  // SET SELECT
  for (let i = 0; i < options.length; i++) {
    if (options[i].value == lang) {
      options[i].selected = true;
      select.dispatchEvent(event);
      idiom.innerHTML = lang;
    } else {
      options[i].selected = false;
    }
  }

  // SET SWITCHES
  switches.forEach((checkbox) => {
    if (checkbox.id == lang) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });

  const totalPriceHome = document.querySelectorAll(".totalPriceHome");

  // SET CURRENCIES
  switch (lang) {
    case "en":
      if (totalPriceHome.length > 0) {
        for (let i = 0; i < totalPriceHome.length; i++) {
          totalPriceHome[i].innerHTML = usdCurrency.format(
            totalPriceHome[i].innerHTML.replace(/\D/g, "") / 100
          );
        }
      }
      break;
    case "uk":
      if (totalPriceHome.length > 0) {
        for (let i = 0; i < totalPriceHome.length; i++) {
          totalPriceHome[i].innerHTML = gbpCurrency.format(
            totalPriceHome[i].innerHTML.replace(/\D/g, "") / 100
          );
        }
      }
      break;
    case "pt":
      if (totalPriceHome.length > 0) {
        for (let i = 0; i < totalPriceHome.length; i++) {
          totalPriceHome[i].innerHTML = brlCurrency.format(
            totalPriceHome[i].innerHTML.replace(/\D/g, "") / 100
          );
        }
      }
      break;
    case "it":
      if (totalPriceHome.length > 0) {
        for (let i = 0; i < totalPriceHome.length; i++) {
          totalPriceHome[i].innerHTML = eurCurrency.format(
            totalPriceHome[i].innerHTML.replace(/\D/g, "") / 100
          );
        }
      }
      break;
  }

  const cardsChecks = document.querySelectorAll(".cardsChecks");
  for (let i = 0; i < cardsChecks.length; i++) {
    cardsChecks[i].href = cardsChecks[i].href + "/?idiom=" + lang;
  }
};

const createMultiLanguage = (language) => {
  const translator = new MultiLanguage(language);

  translator.registerSelect(document.getElementById("languages"));

  const json = JSON.parse(
    document.getElementById("translation-sheet").innerHTML
  );

  translator.addSheet(json);
};

createMultiLanguage(idiom.innerHTML);
