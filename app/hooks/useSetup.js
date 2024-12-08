import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

const useSetup = () => {
  const { t } = useTranslation();

  const [lng, setlnges] = useState(cookies.get("i18next") || i18n.language); // Track current language
  const [isChanging, setIsChanging] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Handle language direction
  useEffect(() => {
    window.document.dir = i18n.dir(lng);
  }, [lng]);

  // Handle language changes
  const handleLanguageChange = (language) => {
    setIsChanging(true);
    setlnges(language);

    setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };

  useEffect(() => {
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  // Handle theme changes
  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");

    const handleStorageChange = () => {
      const updatedTheme = sessionStorage.getItem("theme");
      setIsDarkMode(updatedTheme === "dark");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { lng, isChanging, isDarkMode, t, setIsDarkMode };
};

export default useSetup;
