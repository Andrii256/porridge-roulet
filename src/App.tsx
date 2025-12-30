import { useTranslation } from "react-i18next";
import useLocalStorageState from "use-local-storage-state";
import "./app.css";
import { LanguageSwitcher } from "./components/language-switcher";
import { LS_KEYS, OPTIONS as OPTIONS_KEYS } from "./constants";
import { pickRandomItem } from "./utils/pick-random-item";

type OptionKey = (typeof OPTIONS_KEYS)[number];

function App() {
  const { t } = useTranslation();
  const [godsend, setGodSend] = useLocalStorageState<undefined | OptionKey>(
    LS_KEYS.RESULT_OF_PREV_SPIN
  );
  const [options, setOptionsToInclude] = useLocalStorageState(
    LS_KEYS.FOOD_OPTIONS,
    {
      defaultValue: OPTIONS_KEYS.map((key) => ({ key, checked: true })),
    }
  );

  const updateOptionSelection = (key: OptionKey, enforcedValue?: boolean) => {
    setOptionsToInclude((prevValue) => {
      const possibleNewValue = prevValue.map((option) =>
        option.key !== key
          ? option
          : {
              ...option,
              checked:
                typeof enforcedValue === "boolean"
                  ? enforcedValue
                  : !option.checked,
            }
      );

      if (possibleNewValue.filter((option) => option.checked).length >= 2) {
        return possibleNewValue;
      } else {
        if (typeof enforcedValue !== "boolean") {
          alert(t("minOptionsAlert"));
        }
        return prevValue;
      }
    });
  };

  const handleSpin = () => {
    const preparedOptions = options
      .filter((option) => option.checked)
      .map((option) => option.key);

    const newGodsend = pickRandomItem(preparedOptions, godsend);
    setGodSend(newGodsend);
    updateOptionSelection(newGodsend, false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans text-gray-900">
      <main className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <LanguageSwitcher />

        <ul className="space-y-2 mb-8">
          {options.map((option) => (
            <li key={option.key}>
              <label
                className={`flex items-center p-3 rounded-xl border transition-colors cursor-pointer group ${
                  option.checked
                    ? "border-blue-100 bg-blue-50"
                    : "border-gray-100 bg-white hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={option.checked}
                  onChange={() => updateOptionSelection(option.key)}
                />
                <span
                  className={`ml-3 text-gray-700 ${
                    option.checked ? "font-medium" : "group-hover:text-gray-900"
                  }`}
                >
                  {t(`foodOptions.${option.key}`)}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="space-y-6 text-center">
          <button
            onClick={handleSpin}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            {godsend ? t("spinAgain") : t("spin")}
          </button>

          {godsend && (
            <div className="text-3xl font-bold text-blue-600 bg-blue-50 py-4 rounded-xl border-2 border-dashed border-blue-200">
              {t(`foodOptions.${godsend}`)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
