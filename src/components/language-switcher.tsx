import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <label htmlFor="language-select">{t("selectLanguage")}: </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="uk">Українська</option>
        <option value="cs">Čeština</option>
      </select>
    </div>
  );
};
