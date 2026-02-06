import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <label
        htmlFor="language-select"
        className="text-sm font-medium text-gray-500"
      >
        {t("selectLanguage")}:
      </label>
      <select
        id="language-select"
        className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 outline-none"
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
