import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="p-3 w-full h-dvh lg:h-screen light:bg-amber-200 dark:bg-slate-800">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl lg:text-3xl font-bold dark:text-white">
          Divide Aê!
        </h1>
        <div className="flex gap-5 items-center dark:text-white">
          <button onClick={changeTheme}>theme</button>
          <button>idiom</button>
          <button>help</button>
        </div>
      </header>
    </div>
  );
}

export default App;
