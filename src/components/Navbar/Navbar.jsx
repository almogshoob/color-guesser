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

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (
      window.location.pathname !== "/color-guesser/" ||
      window.location.search
    )
      window.location.href = "/color-guesser/";
    else window.location.reload();
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
        <a href="/color-guesser" onClick={handleLogoClick}>
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
