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
  const idiomAddCheck = document.querySelector("#idiomAddCheck");
  let event = new Event("change");

  // SET SELECT
  for (let i = 0; i < options.length; i++) {
    if (options[i].value == lang) {
      options[i].selected = true;
      select.dispatchEvent(event);
      idiom.innerHTML = lang;
      idiomAddCheck.value = lang;
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
  const totalPriceText = document.querySelectorAll(".totalPriceText");
  const tipHome = document.querySelectorAll(".tipHome");
  const dateHome = document.querySelectorAll(".dateHome");
  const languageTheme = document.querySelector("#languageTheme");

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
      for (let i = 0; i < totalPriceText.length; i++) {
        totalPriceText[i].textContent = "Total price";
        tipHome[i].textContent = "Tip";
        dateHome[i].textContent = "Date";
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
      for (let i = 0; i < totalPriceText.length; i++) {
        totalPriceText[i].textContent = "Total price";
        tipHome[i].textContent = "Tip";
        dateHome[i].textContent = "Date";
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
      for (let i = 0; i < totalPriceText.length; i++) {
        totalPriceText[i].textContent = "Preço total";
        tipHome[i].textContent = "Gorjeta";
        dateHome[i].textContent = "Data";
      }
      break;
  }

  const cardsChecks = document.querySelectorAll(".cardsChecks");
  for (let i = 0; i < cardsChecks.length; i++) {
    let url = cardsChecks[i].href;
    cardsChecks[i].href = url.split("/?")[0];
    cardsChecks[i].href = cardsChecks[i].href + "/?idiom=" + lang;
  }

  languageTheme.value = lang;
};

const createMultiLanguage = (language) => {
  const translator = new MultiLanguage(language);

  translator.registerSelect(document.getElementById("languages"));

  const json = JSON.parse(
    document.getElementById("translation-sheet").innerHTML
  );

  translator.addSheet(json);

  activeLang(language);
};

createMultiLanguage(idiom.innerHTML);
