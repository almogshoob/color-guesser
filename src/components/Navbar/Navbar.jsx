import { useEffect, useState } from "react";
import { DarkModeIcon, HelpIcon, LightModeIcon } from "../../assets/icons";
import { HelpModal } from "../../components";

const Navbar = () => {
  const isDevicePreferDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const userThemePreference = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(
    userThemePreference ? userThemePreference === "dark" : isDevicePreferDark
  );
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      document.documentElement.style.colorScheme = prev ? "light" : "dark";
      localStorage.setItem("theme", prev ? "light" : "dark");
      return !prev;
    });
  };

  // init theme
  useEffect(() => {
    if (
      userThemePreference &&
      (userThemePreference === "dark") !== isDevicePreferDark
    )
      document.documentElement.style.colorScheme = userThemePreference;

    return () => {
      if (
        userThemePreference &&
        (userThemePreference === "dark") === isDevicePreferDark
      )
        localStorage.removeItem("theme");
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="/color-guesser">
          <h1>Color Guesser</h1>
        </a>
        <button className="icon-button" onClick={toggleTheme}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
        <button
          className="icon-button"
          onClick={() => setIsHelpModalOpen(true)}
        >
          <HelpIcon />
        </button>
      </nav>
      <HelpModal
        open={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </>
  );
};

export { Navbar };
